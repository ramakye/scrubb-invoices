/* ============================================================
   Scrubb Club Invoice Generator
   Two recurring clients are hard-coded below.
   Edit the CLIENTS object to change emails, rates, etc.,
   then push to GitHub. Next invoice numbers are remembered
   in the browser (localStorage).
   ============================================================ */

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

/* ---------- PDF export: clone to a clean fixed-width node ---------- */
async function downloadPdf(){
  const clone = $("paper").cloneNode(true);
  clone.style.transform = "none";
  clone.style.marginLeft = "0";
  clone.style.boxShadow = "none";
  clone.style.border = "none";
  clone.style.borderRadius = "0";
  clone.style.width = "794px";

  const holder = document.createElement("div");
  holder.style.position = "fixed";
  holder.style.left = "-10000px";
  holder.style.top = "0";
  holder.style.width = "794px";
  holder.style.background = "#fff";
  holder.appendChild(clone);
  document.body.appendChild(holder);

  // make sure the logo is loaded before capture (with a safety timeout)
  const img = clone.querySelector("img");
  if(img && !img.complete){
    await new Promise(res => {
      const done = () => res();
      img.onload = done; img.onerror = done;
      setTimeout(done, 3000);
    });
  }

  const h = Math.max(1123, clone.offsetHeight); // A4 height, grows if content is taller

  try{
    await html2pdf().set({
      margin: 0,
      filename: "Invoice_" + $("invNum").value + ".pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff", windowWidth: 794 },
      jsPDF: { unit: "px", format: [794, h], orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] }
    }).from(clone).save();
  } finally {
    holder.remove();
  }
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
