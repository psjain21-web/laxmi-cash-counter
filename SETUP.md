# Step-by-Step Setup Guide (No Coding Required)

## Part 1: Set Up the Google Sheet & Cloud Sync (5 Minutes)
1. Open [Google Drive](https://drive.google.com) and create a new **Google Sheet** (name it `Laxmi Mega Mart Cash Counter`).
2. In the top menu, click **Extensions > Apps Script**.
3. Delete any existing code in `Code.gs`, open the `Code.gs` file from this folder, copy everything, and paste it into the Apps Script editor.
4. Change line 2 (`const SECRET = 'CHANGE-ME-TO-A-LONG-RANDOM-KEY';`) to any secret password you like (for example: `LaxmiMart2026`). Click the **Save** icon (`Ctrl + S`).
5. In the toolbar at the top, select **`setup`** from the function dropdown and click **Run**.
   - Click **Review Permissions** -> choose your Google account -> click **Advanced** -> **Go to Untitled project (unsafe)** -> **Allow**.
6. Now add the mobile web app view:
   - Click the **`+`** icon next to **Files** (top left) -> select **HTML**.
   - Name it **`Index`** (with a capital `I`).
   - Open `Index.html` from this folder, copy everything, paste it into `Index` in Apps Script, and click **Save**.
7. Deploy as Web App:
   - Click **Deploy > New deployment** (top right).
   - Click the gear icon next to "Select type" and choose **Web app**.
   - Set **Execute as:** `Me`
   - Set **Who has access:** `Anyone`
   - Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).

---

## Part 2: Set Up the Counter PC
1. Copy `cash-counter.html` and `Open-Cash-Counter.bat` into a folder on your Desktop (e.g., `C:\Users\DELL\Desktop\Laxmi-Cash-Counter`).
2. Double-click **`Open-Cash-Counter.bat`** to launch the counter terminal in a clean app window.
3. Go to the **More** tab (bottom right):
   - Under **Google Sheet Cloud Sync**, paste your Web app URL (`/exec`) and your `SECRET` password.
   - Click **Save Config**, then click **Sync Now**.
4. Set your **Monthly Bill Series** prefix/start number and today's **Morning Opening Cash**, then click Save.

---

## Part 3: Open on Owner's Mobile Phone
1. Send the **Web app URL** (ending in `/exec`) to your mobile phone via WhatsApp.
2. Tap the link on your phone to open it in Chrome (Android) or Safari (iPhone).
3. Tap the browser menu (**`⋮`** on Android or **Share** icon on iPhone) and select **Add to Home Screen** to create an app icon on your phone.
4. The mobile app automatically syncs live with your Google Sheet!

> **Important Note:** Whenever you update `Code.gs` or `Index` in Apps Script in the future, always click **Deploy > Manage deployments > Edit (pencil icon) > Version: New version > Deploy**.
