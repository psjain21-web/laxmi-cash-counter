// Laxmi Mega Mart - Cash Counter Cloud Sync & Web App Backend
const SECRET = 'CHANGE-ME-TO-A-LONG-RANDOM-KEY'; // Must match secret in More tab when using external HTML

const TABS = {
  inv:      ['Invoices',       ['id', 'no', 'date', 'cust', 'amt']],
  pay:      ['Payments',       ['id', 'date', 'no', 'mode', 'amt']],
  disc:     ['Discounts',      ['id', 'date', 'no', 'amt', 'by']],
  rec:      ['NoBillReceipts', ['id', 'date', 'cust', 'purpose', 'mode', 'amt']],
  cash:     ['CashMovements',  ['id', 'date', 'type', 'vno', 'party', 'reason', 'amt']],
  close:    ['DayClosing',     ['id', 'opening', 'expected', 'counted', 'diff', 'handed', 'next', 'remark']],
  open:     ['Openings',       ['id', 'opening']],
  handover: ['ShiftHandover',  ['id', 'date', 'time', 'expected', 'counted', 'diff', 'handed', 'remainingForOwner', 'remark']],
  log:      ['AuditLog',       ['id', 'ts', 'by', 'a', 'd']]
};

/**
 * Serves the POS web app when opened via the /exec link on mobile or PC.
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Laxmi Mega Mart – Cash Counter')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Run once from the Apps Script editor to create all tabs and headers.
 */
function setup() {
  const ss = SpreadsheetApp.getActive();
  Object.keys(TABS).forEach(k => getOrCreateSheet_(ss, k));
  let b = ss.getSheetByName('BankReceipts');
  if (!b) {
    b = ss.insertSheet('BankReceipts');
    b.appendRow(['date', 'customer', 'amount', 'invoice no', 'remark']);
    b.setFrozenRows(1);
  }
}

function doOptions(e) {
  return ContentService.createTextOutput('').setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Called natively via google.script.run when opened from the /exec Web App URL.
 */
function syncFromClient(q) {
  return processSync_(q || {}, true);
}

/**
 * Called via HTTP POST when opened from a local desktop HTML file or external host.
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return out_({ ok: false, err: 'Empty payload' });
    }
    const q = JSON.parse(e.postData.contents);
    return out_(processSync_(q, false));
  } catch (err) {
    return out_({ ok: false, err: String(err) });
  }
}

function processSync_(q, isInternal) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(25000)) {
    return { ok: false, err: 'Server busy: lock timeout' };
  }

  try {
    if (!isInternal && q.key !== SECRET) {
      return { ok: false, err: 'bad key' };
    }

    const ss = SpreadsheetApp.getActive();
    const now = Date.now();
    const incoming = q.recs || [];

    const grouped = {};
    incoming.forEach(x => {
      if (TABS[x.t] && x.r && x.r.id !== undefined) {
        if (!grouped[x.t]) grouped[x.t] = [];
        grouped[x.t].push(x.r);
      }
    });

    Object.keys(grouped).forEach(t => {
      const s = getOrCreateSheet_(ss, t);
      const cols = TABS[t][1];
      const lastRow = s.getLastRow();

      let idMap = {};
      if (lastRow > 1) {
        const existingIds = s.getRange(2, 1, lastRow - 1, 1).getValues();
        existingIds.forEach((v, idx) => {
          idMap[String(v[0])] = idx + 2;
        });
      }

      const rowsToAppend = [];
      grouped[t].forEach(r => {
        const idStr = String(r.id);
        const rowData = cols.map(h => (r[h] === undefined ? '' : r[h])).concat([now, JSON.stringify(r)]);

        if (idMap[idStr]) {
          s.getRange(idMap[idStr], 1, 1, rowData.length).setValues([rowData]);
        } else {
          rowsToAppend.push(rowData);
          idMap[idStr] = lastRow + rowsToAppend.length;
        }
      });

      if (rowsToAppend.length > 0) {
        s.getRange(lastRow + 1, 1, rowsToAppend.length, rowsToAppend[0].length).setValues(rowsToAppend);
      }
    });

    const back = [];
    const since = Number(q.since) || 0;

    Object.keys(TABS).forEach(k => {
      const s = ss.getSheetByName(TABS[k][0]);
      if (!s) return;
      const lastRow = s.getLastRow();
      if (lastRow < 2) return;

      const w = TABS[k][1].length;
      const auditMeta = s.getRange(2, w + 1, lastRow - 1, 2).getValues();

      auditMeta.forEach(z => {
        const recTimestamp = Number(z[0]);
        if (recTimestamp > since && recTimestamp !== now && z[1]) {
          try {
            back.push({ t: k, r: JSON.parse(z[1]) });
          } catch (parseErr) {}
        }
      });
    });

    return { ok: true, recs: back, now: now };
  } catch (err) {
    return { ok: false, err: String(err) };
  } finally {
    lock.releaseLock();
  }
}

function getOrCreateSheet_(ss, k) {
  const name = TABS[k][0];
  const cols = TABS[k][1];
  let s = ss.getSheetByName(name);
  if (!s) {
    s = ss.insertSheet(name);
    s.appendRow(cols.concat(['_u', 'json']));
    s.setFrozenRows(1);
    ['id', 'date', 'ts'].forEach(h => {
      const i = cols.indexOf(h);
      if (i >= 0) {
        s.getRange(1, i + 1, s.getMaxRows(), 1).setNumberFormat('@');
      }
    });
  }
  return s;
}

function out_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
