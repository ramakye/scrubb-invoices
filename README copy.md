# Scrubb Club — Invoices

A lightweight invoice generator for Scrubb Club Cleaning Services.
Pick a client, set the month and rate, preview the invoice (matching your
existing template), download the PDF, and open a pre-filled Gmail draft.

Nothing sends automatically — you always review and send the draft yourself.

## Files
- `index.html` — page structure
- `style.css` — styling + invoice template
- `app.js` — client data and logic
- `logo.png` — Scrubb Club logo

## Deploy to GitHub Pages
1. Open your `ramakye.github.io` repo in VS Code.
2. Create a folder called `scrubb-invoices`.
3. Drop these four files inside it.
4. Commit and push:
   ```
   git add scrubb-invoices
   git commit -m "Add Scrubb Club invoice generator"
   git push
   ```
5. Live at: `https://ramakye.github.io/scrubb-invoices/`

## Editing clients
Open `app.js` and edit the `CLIENTS` object at the top — email, Cc, service
description, rate, quantity, invoice-number format, default weekday, and the
email subject/message are all there. Save and push.

The `{Month}` token in the subject/message is replaced automatically with the
selected service month.

## Invoice numbers
The next number per client is remembered in your browser. After sending, tap
**"Mark sent · save next number"** to roll it forward. To reset or set a
starting number, edit `startNext` in `app.js`.

## How sending works
A website can't attach a file and send on its own (browsers block it for
security), so the flow is: **Download PDF → Open Gmail draft → attach the PDF →
review → send.** For true one-click auto-send, a Google Apps Script would be
needed — that's a possible future upgrade.
