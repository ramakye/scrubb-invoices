/* ============================================================
   Scrubb Club Invoice Generator
   Two recurring clients are hard-coded below.
   Edit the CLIENTS object to change emails, rates, etc.,
   then push to GitHub. Next invoice numbers are remembered
   in the browser (localStorage).
   ============================================================ */

   const LOGO_DATA = "data:image/jpeg;base64,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";

   const CLIENTS = {
     vishy: {
       name: "Vishy — Cleanux",
       email: "vishy@cleanux.co.uk",
       cc: "accounts@cleanux.co.uk",
       service: "General Office Cleaning",
       qty: 8,
       rate: 17,
       sep: "/",            // line-item date separator -> 03/03/26
       prefix: "SCS",
       pad: 5,              // SCS00013
       startNext: 13,
       weekday: 2,          // Tuesday
       subject: "Invoice for Cleaning Services- {Month}",
       body: "Hello\n\nPlease find the attached invoice for your reference\n\nMany thanks"
     },
     manjit: {
       name: "Manjit",
       email: "manjitkphull@gmail.com",
       cc: "",
       service: "Standard Clean 2 bathrooms 2 toilets Kitchen Hallway",
       qty: 2,
       rate: 17,
       sep: "-",            // 02-03-26
       prefix: "SCS",
       pad: 4,              // SCS0034
       startNext: 34,
       weekday: 1,          // Monday
       subject: "Invoice for Cleaning Service - {Month}",
       body: "Hello Manjit,\n\nPlease find attached the invoice for the cleaning service - {Month}\n\nMany thanks"
     }
   };
   
   const $ = id => document.getElementById(id);
   const MONTHS = ["January","February","March","April","May","June","July",
                   "August","September","October","November","December"];
   
   /* ---------- next-number persistence ---------- */
   function nextNum(key){
     const saved = localStorage.getItem("scrubb_next_" + key);
     return saved !== null ? parseInt(saved, 10) : CLIENTS[key].startNext;
   }
   function setNextNum(key, n){ localStorage.setItem("scrubb_next_" + key, String(n)); }
   
   /* ---------- helpers ---------- */
   function pad2(n){ return String(n).padStart(2,"0"); }
   function fmtInvDate(iso){
     if(!iso) return "";
     const d = new Date(iso + "T00:00");
     return d.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
   }
   function fmtLine(iso, sep){
     const d = new Date(iso + "T00:00");
     return pad2(d.getDate()) + sep + pad2(d.getMonth()+1) + sep + String(d.getFullYear()).slice(-2);
   }
   function money(n){ return "£" + Number(n).toFixed(2); }
   function monthName(m){ return m ? MONTHS[parseInt(m.split("-")[1],10)-1] : ""; }
   function invNumStr(key){
     const c = CLIENTS[key];
     return c.prefix + String(nextNum(key)).padStart(c.pad,"0");
   }
   
   /* ---------- state ---------- */
   let cur = null;
   let dates = [];
   
   function fillClientSelect(){
     const sel = $("clientSel"); sel.innerHTML = "";
     for(const k in CLIENTS){
       const o = document.createElement("option");
       o.value = k; o.textContent = CLIENTS[k].name; sel.appendChild(o);
     }
   }
   
   function loadClient(key){
     cur = key;
     const c = CLIENTS[key];
     $("toEmail").value = c.email;
     $("ccEmail").value = c.cc || "";
     $("service").value = c.service;
     $("qty").value = c.qty;
     $("rate").value = c.rate;
     $("invNum").value = invNumStr(key);
     $("weekday").value = c.weekday;
     if(!$("svcMonth").value){
       const n = new Date(); n.setMonth(n.getMonth()-1);
       $("svcMonth").value = n.getFullYear() + "-" + pad2(n.getMonth()+1);
     }
     generateDates();
     syncEmail();
     render();
   }
   
   function syncEmail(){
     const c = CLIENTS[cur];
     const mn = monthName($("svcMonth").value);
     $("subject").value = c.subject.replace(/{Month}/g, mn);
     $("body").value = c.body.replace(/{Month}/g, mn);
   }
   
   function generateDates(){
     const m = $("svcMonth").value;
     if(!m){ dates = []; renderDates(); return; }
     const [y, mo] = m.split("-").map(Number);
     const wd = parseInt($("weekday").value, 10);
     dates = [];
     const d = new Date(y, mo-1, 1);
     while(d.getMonth() === mo-1){
       if(d.getDay() === wd){
         dates.push(`${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`);
       }
       d.setDate(d.getDate()+1);
     }
     renderDates();
     render();
   }
   
   function renderDates(){
     const wrap = $("dateList"); wrap.innerHTML = "";
     dates.forEach((iso, i) => {
       const row = document.createElement("div"); row.className = "date-pill";
       const inp = document.createElement("input"); inp.type = "date"; inp.value = iso;
       inp.onchange = e => { dates[i] = e.target.value; render(); };
       const del = document.createElement("button"); del.textContent = "×"; del.title = "Remove";
       del.onclick = () => { dates.splice(i,1); renderDates(); render(); };
       row.appendChild(inp); row.appendChild(del); wrap.appendChild(row);
     });
   }
   
   function render(){
     if(!cur) return;
     const c = CLIENTS[cur];
     const qty = Number($("qty").value) || 0;
     const rate = Number($("rate").value) || 0;
     const service = $("service").value;
     $("pNum").textContent = "# " + $("invNum").value;
     $("pDate").textContent = fmtInvDate($("invDate").value);
     $("pTo").textContent = $("toEmail").value;
     let total = 0;
     const tb = $("pItems"); tb.innerHTML = "";
     dates.forEach(iso => {
       const amt = qty * rate; total += amt;
       const tr = document.createElement("tr");
       tr.innerHTML = `<td class="l">${service} ${fmtLine(iso, c.sep)}</td>` +
                      `<td>${qty}</td><td>${money(rate)}</td><td>${money(amt)}</td>`;
       tb.appendChild(tr);
     });
     $("pBal").textContent = money(total);
     $("pTotal").textContent = money(total);
     fitPreview();
   }
   
   /* ---------- scale the fixed-width invoice to fit the screen ---------- */
   function fitPreview(){
     const shell = document.querySelector(".preview-shell");
     const paper = $("paper");
     if(!shell || !paper) return;
     const avail = shell.clientWidth;
     const scale = Math.min(1, avail / 794);
     paper.style.transform = scale < 1 ? `scale(${scale})` : "none";
     paper.style.marginLeft = scale >= 1 ? Math.max(0, (avail - 794) / 2) + "px" : "0";
     shell.style.height = (paper.offsetHeight * scale) + "px";
   }
   
   /* ---------- PDF export: drawn directly with jsPDF (no screenshotting) ----------
      This builds a real vector PDF so it renders identically on phone and laptop. */
   function downloadPdf(){
     const { jsPDF } = window.jspdf;
     const doc = new jsPDF({ unit: "mm", format: "a4" });
   
     const M = 14, RM = 196;            // left margin and right edge (A4 width 210mm)
     const c = CLIENTS[cur];
     const qty = Number($("qty").value) || 0;
     const rate = Number($("rate").value) || 0;
     const service = $("service").value;
     const num = $("invNum").value;
     const dateStr = fmtInvDate($("invDate").value);
     const total = qty * rate * dates.length;
   
     // logo (embedded, so it never fails to load)
     try { doc.addImage(LOGO_DATA, "JPEG", M, 13, 28, 28); } catch(e) {}
   
     // INVOICE title + number
     doc.setFont("helvetica","normal"); doc.setTextColor(40); doc.setFontSize(30);
     doc.text("INVOICE", RM, 24, { align: "right" });
     doc.setFontSize(10); doc.setTextColor(120);
     doc.text("# " + num, RM, 30, { align: "right" });
   
     // company name (left)
     doc.setFont("helvetica","bold"); doc.setFontSize(11); doc.setTextColor(34);
     doc.text("Scrubb Club Cleaning Services", M, 54);
   
     // date (right)
     doc.setFont("helvetica","normal"); doc.setFontSize(10);
     doc.setTextColor(120); doc.text("Date:", 150, 54, { align: "right" });
     doc.setTextColor(34);  doc.text(dateStr, RM, 54, { align: "right" });
   
     // balance due shaded box (right)
     doc.setFillColor(241,241,241); doc.rect(120, 58, RM - 120, 9, "F");
     doc.setFont("helvetica","bold"); doc.setTextColor(34);
     doc.text("Balance Due:", 150, 64, { align: "right" });
     doc.text(money(total), RM, 64, { align: "right" });
   
     // bill to (left)
     doc.setFont("helvetica","normal"); doc.setFontSize(10); doc.setTextColor(120);
     doc.text("Bill To:", M, 63);
     doc.setFont("helvetica","bold"); doc.setTextColor(34);
     doc.text($("toEmail").value, M, 68);
   
     // line items table
     const rows = dates.map(iso => [
       `${service} ${fmtLine(iso, c.sep)}`,
       String(qty), money(rate), money(qty * rate)
     ]);
     doc.autoTable({
       startY: 80,
       head: [["Item","Quantity","Rate","Amount"]],
       body: rows,
       theme: "plain",
       styles: { fontSize: 10, textColor: 34, cellPadding: { top: 2.6, bottom: 2.6, left: 3, right: 3 } },
       headStyles: { fillColor: [63,63,63], textColor: 255, fontStyle: "normal", halign: "right" },
       bodyStyles: { fontStyle: "bold" },
       columnStyles: {
         0: { halign: "left", cellWidth: "auto" },
         1: { halign: "right", cellWidth: 26 },
         2: { halign: "right", cellWidth: 26 },
         3: { halign: "right", cellWidth: 30 }
       },
       margin: { left: M, right: M },
       didParseCell: d => { if(d.section === "head" && d.column.index === 0) d.cell.styles.halign = "left"; }
     });
   
     // total
     let y = doc.lastAutoTable.finalY;
     doc.setFont("helvetica","normal"); doc.setFontSize(10); doc.setTextColor(120);
     doc.text("Total:", 150, y + 12, { align: "right" });
     doc.setTextColor(34); doc.text(money(total), RM, y + 12, { align: "right" });
   
     // payment details + terms
     let py = y + 30;
     doc.setFontSize(9);
     const grey = () => doc.setTextColor(140);
     const dark = () => doc.setTextColor(51);
     grey(); doc.text("Payment Details:", M, py); py += 6;
     dark();
     doc.text("Account Holder Name", M, py); py += 4;
     doc.text("Scrubb Club Cleaning Services Limited", M, py); py += 8;
     doc.text("Account number", M, py); py += 4;
     doc.text("91897783", M, py); py += 8;
     doc.text("Sort code", M, py); py += 4;
     doc.text("60-83-71", M, py); py += 8;
     grey(); doc.text("Terms:", M, py); py += 5;
     dark(); doc.text("Terms and Conditions: Full payment is required after service.", M, py);
   
     doc.save("Invoice_" + num + ".pdf");
   }
   
   function openGmail(){
     const to = encodeURIComponent($("toEmail").value);
     const su = encodeURIComponent($("subject").value);
     const bo = encodeURIComponent($("body").value);
     let url = "https://mail.google.com/mail/?view=cm&fs=1&to=" + to + "&su=" + su + "&body=" + bo;
     if($("ccEmail").value.trim()) url += "&cc=" + encodeURIComponent($("ccEmail").value);
     window.open(url, "_blank");
   }
   
   function saveNextNumber(){
     if(!cur) return;
     setNextNum(cur, nextNum(cur) + 1);
     $("invNum").value = invNumStr(cur);
     flash("Saved. Next invoice for " + CLIENTS[cur].name + " will be " + $("invNum").value);
   }
   
   function flash(msg){
     const m = $("savedMsg"); m.textContent = msg;
     setTimeout(() => m.textContent = "", 4000);
   }
   
   /* ---------- wire up ---------- */
   function init(){
     fillClientSelect();
     const t = new Date();
     $("invDate").value = t.getFullYear() + "-" + pad2(t.getMonth()+1) + "-" + pad2(t.getDate());
   
     ["invNum","invDate","toEmail","service","qty","rate"].forEach(id =>
       $(id).addEventListener("input", render));
     $("svcMonth").addEventListener("change", () => { generateDates(); syncEmail(); });
     $("weekday").addEventListener("change", generateDates);
     $("clientSel").addEventListener("change", e => loadClient(e.target.value));
     $("genDates").addEventListener("click", generateDates);
     $("addDate").addEventListener("click", () => {
       const m = $("svcMonth").value || "2026-01";
       dates.push(m + "-01"); renderDates(); render();
     });
     $("dlPdf").addEventListener("click", downloadPdf);
     $("openGmail").addEventListener("click", openGmail);
     $("saveNum").addEventListener("click", saveNextNumber);
     window.addEventListener("resize", fitPreview);
   
     loadClient("vishy");
   }
   
   document.addEventListener("DOMContentLoaded", init);