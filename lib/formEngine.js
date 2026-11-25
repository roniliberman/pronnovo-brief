import { upload as blobUpload } from "@vercel/blob/client";

export function startForm(BOOT){
"use strict";
if (window.__pqStarted) return; window.__pqStarted = true;

/* ---------------- strings ---------------- */
var T = {
  he: {
    dir:"rtl",
    title:"שאלון היכרות לפרויקט",
    eyebrow:"Pronnovo · שאלון היכרות",
    h1:"בואו נכיר את המוצר שלכם",
    intro:"לפני שמתחילים לעצב, חשוב לנו להבין למי המוצר מיועד, איך משתמשים בו ומה הטעם העיצובי שלכם. אין תשובות נכונות או לא נכונות. כתבו בחופשיות, גם בנקודות, ודלגו על מה שלא רלוונטי.",
    chip1:"כ-10 דקות", chip2:"נשמר אוטומטית", chip3:"אפשר לחזור ולעדכן מאותו קישור",
    demo:"זוהי תצוגה מקדימה. התשובות נשמרות רק בדפדפן הזה.",
    s0:"פרטים כלליים",
    company:"שם החברה", contact:"איש/אשת קשר", productName:"שם המוצר / הפרויקט", productUrl:"קישור למוצר או לאתר קיים",
    productUrlPh:"https://", opt:"(לא חובה)",
    s1:"המוצר והמשתמשים", s1sub:"כדי שנעצב חוויה שמתאימה לאנשים שישתמשו בה בפועל.",
    q1:"ספרו לנו על המוצר", q1h:"מה הוא עושה, איזו בעיה הוא פותר, ומה מבדיל אותו מאלטרנטיבות.",
    q1p:"לדוגמה: אפליקציה לניהול צי רכבים שמאפשרת למנהל לראות בזמן אמת איפה כל רכב…",
    q2:"מי המשתמשים?", q2h:"סוג הלקוח (עסקי / פרטי), תפקיד, טווח גילאים ורמת היכרות עם טכנולוגיה. אם יש כמה סוגי משתמשים, פרטו כל אחד.",
    q2p:"לדוגמה: מנהלי תפעול בחברות של 50–500 עובדים, גילאי 35–55, רגילים לאקסל ולמערכות ERP…",
    q3:"איך ומתי משתמשים במוצר?", q3h:"על איזה מכשיר, באיזו תדירות ובאיזה הקשר: במשרד, בתנועה, בלחץ זמן?",
    q3dev:"מכשיר עיקרי", dMobile:"נייד", dDesktop:"מחשב", dTablet:"טאבלט",
    q3freq:"תדירות שימוש", fDaily:"כמה פעמים ביום", fWeekly:"כמה פעמים בשבוע", fRare:"מדי פעם",
    q3p:"לדוגמה: נהגים פותחים את האפליקציה בתחילת משמרת, ביד אחת, לרוב בחוץ ובשמש…",
    q4:"מהן 2–3 הפעולות החשובות ביותר במוצר?", q4h:"מה המשתמש חייב להצליח לעשות בקלות? אם המוצר טוב רק בדבר אחד, מה הוא?",
    q4p:"1. לדווח על תקלה ברכב\n2. לראות את ההזמנות של היום\n3. …",
    s2:"מיתוג וסגנון", s2sub:"מה כבר קיים, ומה אתם אוהבים לראות.",
    q5:"מיתוג קיים", q5h:"אם יש לכם ספריית מיתוג (Drive, Dropbox, Figma, Brandfolder), הדביקו קישור. ואם יש לוגו, העלו אותו כאן.",
    brandNone:"אין לנו עדיין מיתוג או לוגו",
    brandLink:"קישור לספריית חומרי המיתוג", brandLinkPh:"https://drive.google.com/…",
    logoUp:"העלאת לוגו", logoSm:"SVG, PNG, PDF או AI · עד 50MB",
    moreUp:"חומרים נוספים", moreSm:"ספר מותג, פונטים, תמונות, מצגות",
    q6:"איך המוצר צריך להרגיש?", q6h:"שלוש מילים שמתארות את האופי שאתם רוצים לשדר.",
    feelPh:["לדוגמה: אמין","לדוגמה: חם","לדוגמה: מתקדם"],
    q7:"מותגים ואתרים שאהבתם", q7h:"אתרים או מותגים (מכל תחום) שהשפה העיצובית שלהם מדברת אליכם: צבעים, טיפוגרפיה, אווירה. אפשר גם להעלות צילומי מסך.",
    q8:"אפליקציות ומוצרים שנוח לכם להשתמש בהם", q8h:"מוצרים שחוויית השימוש בהם עובדת טוב בעיניכם. מה בדיוק אהבתם?",
    urlPh:"קישור או שם", whyPh:"למה? (לא חובה)", addRef:"+ הוספת שורה",
    shotsUp:"צילומי מסך של רפרנסים", shotsSm:"תמונות או PDF",
    s3:"לסיום",
    q9:"משהו נוסף שחשוב שנדע?", q9h:"דברים שאתם לא רוצים לראות, מגבלות טכניות, דדליינים, מתחרים, או כל דבר אחר.",
    q9p:"",
    progress:function(a,n){return "<b>"+a+" מתוך "+n+"</b> שאלות נענו";},
    submit:"סיימתי, שליחה לפרונובו", submitLg:"", resubmit:"עדכון התשובות",
    sIdle:"", sDirty:"שינויים לא נשמרו", sSaving:"שומר…", sSaved:"נשמר", sError:"השמירה נכשלה, ננסה שוב",
    doneT:"תודה! התשובות התקבלו.", doneB:"אפשר לחזור לקישור הזה ולעדכן בכל זמן. השינויים יישמרו אוטומטית.",
    sentToast:"התשובות נשלחו. תודה!", upTooBig:"הקובץ גדול מ-50MB", upFail:"ההעלאה נכשלה", uploading:"מעלה…",
    rmConfirm:"להסיר את הקובץ?",
    foot1:"Pronnovo Ltd. · סטודיו לעיצוב מוצר, מיתוג וחוויית משתמש", foot2:"התשובות גלויות רק לך ולצוות פרונובו",
    notFoundT:"הקישור לא תקין", notFoundB:"נראה שהקישור לשאלון שגוי או שפג תוקפו. כדאי לבקש מפרונובו קישור חדש.",
    offline:"אין חיבור. נשמור כשהחיבור יחזור."
  },
  en: {
    dir:"ltr",
    title:"Project discovery questionnaire",
    eyebrow:"Pronnovo · Discovery",
    h1:"Let's get to know your product",
    intro:"Before we start designing, we want to understand who the product is for, how it's used, and what visual style speaks to you. There are no right or wrong answers. Write freely, bullet points are fine, and skip anything that doesn't apply.",
    chip1:"About 10 minutes", chip2:"Saves automatically", chip3:"Come back and edit anytime via this link",
    demo:"This is a preview. Answers are saved in this browser only.",
    s0:"General details",
    company:"Company name", contact:"Contact person", productName:"Product / project name", productUrl:"Link to an existing product or website",
    productUrlPh:"https://", opt:"(optional)",
    s1:"Product & users", s1sub:"So we design an experience that fits the people who will actually use it.",
    q1:"Tell us about the product", q1h:"What it does, what problem it solves, and what sets it apart from alternatives.",
    q1p:"e.g. A fleet management app that lets managers see where every vehicle is in real time…",
    q2:"Who are the users?", q2h:"Customer type (business / consumer), role, age range and comfort with technology. If there are several user types, describe each one.",
    q2p:"e.g. Operations managers at companies of 50–500 employees, aged 35–55, used to Excel and ERP systems…",
    q3:"How and when is the product used?", q3h:"On which device, how often, and in what context: at a desk, on the go, under time pressure?",
    q3dev:"Main device", dMobile:"Mobile", dDesktop:"Desktop", dTablet:"Tablet",
    q3freq:"Frequency", fDaily:"Several times a day", fWeekly:"Several times a week", fRare:"Occasionally",
    q3p:"e.g. Drivers open the app at the start of a shift, one-handed, usually outdoors in sunlight…",
    q4:"What are the 2–3 most important actions?", q4h:"What must users be able to do easily? If the product were great at just one thing, what would it be?",
    q4p:"1. Report a vehicle issue\n2. See today's bookings\n3. …",
    s2:"Brand & style", s2sub:"What already exists, and what you like to see.",
    q5:"Existing brand", q5h:"If you have a brand library (Drive, Dropbox, Figma, Brandfolder), paste the link. If you have a logo, upload it here.",
    brandNone:"We don't have a brand or logo yet",
    brandLink:"Link to your brand assets library", brandLinkPh:"https://drive.google.com/…",
    logoUp:"Upload logo", logoSm:"SVG, PNG, PDF or AI · up to 50MB",
    moreUp:"Additional materials", moreSm:"Brand book, fonts, images, decks",
    q6:"How should the product feel?", q6h:"Three words that describe the character you want to convey.",
    feelPh:["e.g. Trustworthy","e.g. Warm","e.g. Cutting-edge"],
    q7:"Brands and websites you like", q7h:"Websites or brands (from any field) whose visual language speaks to you: colors, typography, mood. You can also upload screenshots.",
    q8:"Apps and products you enjoy using", q8h:"Products whose user experience works well for you. What exactly do you like?",
    urlPh:"Link or name", whyPh:"Why? (optional)", addRef:"+ Add row",
    shotsUp:"Reference screenshots", shotsSm:"Images or PDF",
    s3:"Finally",
    q9:"Anything else we should know?", q9h:"Things you don't want to see, technical constraints, deadlines, competitors, or anything else.",
    q9p:"",
    progress:function(a,n){return "<b>"+a+" of "+n+"</b> questions answered";},
    submit:"I'm done, send to Pronnovo", submitLg:"", resubmit:"Update answers",
    sIdle:"", sDirty:"Unsaved changes", sSaving:"Saving…", sSaved:"Saved", sError:"Save failed, retrying",
    doneT:"Thank you! Your answers were received.", doneB:"You can come back to this link and edit anytime. Changes save automatically.",
    sentToast:"Answers sent. Thank you!", upTooBig:"File is larger than 50MB", upFail:"Upload failed", uploading:"Uploading…",
    rmConfirm:"Remove this file?",
    foot1:"Pronnovo Ltd. · Product, brand & UX design studio", foot2:"Answers are visible only to you and the Pronnovo team",
    notFoundT:"Invalid link", notFoundB:"This questionnaire link seems wrong or expired. Please ask Pronnovo for a new link.",
    offline:"You're offline. We'll save when you're back."
  }
};

/* ---------------- icons ---------------- */
var I = {
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  save:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
  up:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  ok:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>',
  send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/></svg>',
  mob:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="7" y="2.5" width="10" height="19" rx="2"/></svg>',
  desk:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/></svg>',
  tab:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="2"/></svg>'
};

/* ---------------- backend ---------------- */
var API = "/api/b/" + encodeURIComponent(BOOT.token || "");
function jfetch(url, opts){
  return fetch(url, opts).then(function(r){ if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); });
}
function apiSave(data, submit, keepalive){
  return jfetch(API, {method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify({data:data, submit:!!submit}), keepalive:!!keepalive});
}
function apiUpload(kind, file){
  var safe = file.name.replace(/[^\w.\-\u0590-\u05FF ]+/g, "_").slice(-120) || "file";
  return blobUpload("clients/" + BOOT.token + "/" + kind + "/" + safe, file, {
    access:"public", handleUploadUrl:API + "/upload", clientPayload:JSON.stringify({kind:kind}), multipart:file.size > 20 * 1024 * 1024
  });
}
function apiDelete(url){
  return jfetch(API + "/file", {method:"DELETE", headers:{"Content-Type":"application/json"}, body:JSON.stringify({url:url})});
}

/* ---------------- state ---------------- */
var EMPTY = {company:"",contact:"",productName:"",productUrl:"",q1:"",q2:"",devices:[],freq:"",q3:"",q4:"",brandNone:false,brandLink:"",files:[],feel:["","",""],brandRefs:[{url:"",why:""}],appRefs:[{url:"",why:""}],q9:""};
var D = JSON.parse(JSON.stringify(EMPTY));
var submitted = !!BOOT.submitted;
if (BOOT.data && typeof BOOT.data === "object"){
  for (var k in EMPTY) if (BOOT.data[k] !== undefined) D[k] = BOOT.data[k];
}
if (!D.company && BOOT.client) D.company = BOOT.client;
if (!D.productName && BOOT.project) D.productName = BOOT.project;
if (!D.brandRefs.length) D.brandRefs = [{url:"",why:""}];
if (!D.appRefs.length) D.appRefs = [{url:"",why:""}];
while (D.feel.length < 3) D.feel.push("");

var lang = (function(){
  try { var q = new URLSearchParams(location.search).get("lang"); if (q === "he" || q === "en") return q; } catch(e){}
  return BOOT.lang === "en" ? "en" : "he";
})();
var t = T[lang];
var pending = {}; // uploads in progress by temp id

/* ---------------- helpers ---------------- */
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
function $(s, r){ return (r || document).querySelector(s); }
function $$(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function fmtSize(b){ if (!b) return ""; if (b < 1024) return b + " B"; if (b < 1048576) return Math.round(b/1024) + " KB"; return (b/1048576).toFixed(1) + " MB"; }
function ext(n){ var m = /\.([a-z0-9]{1,5})$/i.exec(n || ""); return m ? m[1] : "file"; }
var toastT;
function toast(msg){ var el = $("#toast"); el.textContent = msg; el.hidden = false; clearTimeout(toastT); toastT = setTimeout(function(){ el.hidden = true; }, 3200); }
function autoGrow(el){ el.style.height = "auto"; el.style.height = Math.max(el.scrollHeight + 2, 96) + "px"; }

/* ---------------- render ---------------- */
function field(key, label, opts){
  opts = opts || {};
  return '<label class="f"><span>' + esc(label) + (opts.opt ? ' <span style="font-weight:400">' + esc(t.opt) + '</span>' : '') + '</span>' +
    '<input type="' + (opts.type || "text") + '" data-k="' + key + '" value="' + esc(D[key]) + '"' + (opts.ltr ? ' class="ltr" dir="ltr"' : '') + (opts.ph ? ' placeholder="' + esc(opts.ph) + '"' : '') + '></label>';
}
function area(key, ph){
  return '<textarea data-k="' + key + '" rows="3" placeholder="' + esc(ph || "") + '">' + esc(D[key]) + '</textarea>';
}
function qHead(n, title, help, optional){
  return '<div class="q-h"><span class="q-n">' + (n < 10 ? "0" + n : n) + '</span><h3 class="q-t">' + esc(title) + (optional ? '<em>' + esc(t.opt) + '</em>' : '') + '</h3>' + (help ? '<p class="q-help">' + esc(help) + '</p>' : '') + '</div>';
}
function pills(group, items, multi){
  return '<div class="pills" data-group="' + group + '" data-multi="' + (multi ? 1 : 0) + '">' + items.map(function(it){
    var on = multi ? D[group].indexOf(it[0]) >= 0 : D[group] === it[0];
    return '<button type="button" class="pill" data-v="' + it[0] + '" aria-pressed="' + on + '">' + (it[2] || "") + esc(it[1]) + '</button>';
  }).join("") + '</div>';
}
function refs(key){
  return '<div class="refs" data-refs="' + key + '">' + D[key].map(function(r, i){
    return '<div class="ref" data-i="' + i + '"><input type="text" class="ltr" dir="ltr" data-rf="url" value="' + esc(r.url) + '" placeholder="' + esc(t.urlPh) + '">' +
      '<input type="text" class="why" data-rf="why" value="' + esc(r.why) + '" placeholder="' + esc(t.whyPh) + '">' +
      '<button type="button" class="rm" data-rmref aria-label="remove">' + I.x + '</button></div>';
  }).join("") + '</div><button type="button" class="add" data-addref="' + key + '">' + esc(t.addRef) + '</button>';
}
function drop(kind, title, small, accept, compact){
  return '<label class="drop' + (compact ? ' compact' : '') + '" data-drop="' + kind + '"><span class="ic">' + I.up + '</span><span><b>' + esc(title) + '</b><small>' + esc(small) + '</small></span>' +
    '<input type="file" multiple accept="' + accept + '"></label><div class="files" data-files="' + kind + '"></div>';
}

function render(){
  document.documentElement.lang = lang;
  document.documentElement.dir = t.dir;
  document.title = "Pronnovo · " + t.title;
  $$(".seg button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.lang === lang); });

  var forLine = [BOOT.client, BOOT.project].filter(Boolean).map(esc).join(" · ");
  var h = '';
  h += '<div class="paper">';
  h += '<div class="hero"><p class="eyebrow">' + esc(t.eyebrow) + '</p><h1>' + esc(t.h1) + '</h1>' + (forLine ? '<p class="for">' + forLine + '</p>' : '') +
       '<p class="intro">' + esc(t.intro) + '</p><div class="chips"><span class="chip">' + I.clock + esc(t.chip1) + '</span><span class="chip">' + I.save + esc(t.chip2) + '</span><span class="chip">' + I.link + esc(t.chip3) + '</span></div>' +
       '<div class="done-banner" id="doneBanner"' + (submitted ? '' : ' hidden') + '>' + I.ok + '<div><b>' + esc(t.doneT) + '</b><br>' + esc(t.doneB) + '</div></div></div>';

  h += '<section class="sec"><div class="sec-h"><h2>' + esc(t.s0) + '</h2></div><div class="grid2">' +
       field("company", t.company) + field("contact", t.contact) + field("productName", t.productName) + field("productUrl", t.productUrl, {ltr:1, ph:t.productUrlPh, opt:1}) + '</div></section>';

  h += '<section class="sec"><div class="sec-h"><h2>' + esc(t.s1) + '</h2></div><p class="sec-sub">' + esc(t.s1sub) + '</p>';
  h += '<div class="q" data-q="1">' + qHead(1, t.q1, t.q1h) + '<div class="q-body">' + area("q1", t.q1p) + '</div></div>';
  h += '<div class="q" data-q="2">' + qHead(2, t.q2, t.q2h) + '<div class="q-body">' + area("q2", t.q2p) + '</div></div>';
  h += '<div class="q" data-q="3">' + qHead(3, t.q3, t.q3h) + '<div class="q-body"><div class="mini">' + esc(t.q3dev) + '</div>' +
       pills("devices", [["mobile", t.dMobile, I.mob], ["desktop", t.dDesktop, I.desk], ["tablet", t.dTablet, I.tab]], true) +
       '<div class="mini">' + esc(t.q3freq) + '</div>' + pills("freq", [["daily", t.fDaily], ["weekly", t.fWeekly], ["rare", t.fRare]], false) +
       area("q3", t.q3p) + '</div></div>';
  h += '<div class="q" data-q="4">' + qHead(4, t.q4, t.q4h) + '<div class="q-body">' + area("q4", t.q4p) + '</div></div></section>';

  h += '<section class="sec"><div class="sec-h"><h2>' + esc(t.s2) + '</h2></div><p class="sec-sub">' + esc(t.s2sub) + '</p>';
  h += '<div class="q" data-q="5">' + qHead(5, t.q5, t.q5h) + '<div class="q-body">' +
       '<label class="check"><input type="checkbox" data-k="brandNone"' + (D.brandNone ? ' checked' : '') + '>' + esc(t.brandNone) + '</label>' +
       '<div id="brandBox"' + (D.brandNone ? ' hidden' : '') + ' style="display:flex;flex-direction:column;gap:12px">' +
       field("brandLink", t.brandLink, {ltr:1, ph:t.brandLinkPh, type:"url"}) +
       drop("logo", t.logoUp, t.logoSm, ".svg,.png,.jpg,.jpeg,.pdf,.ai,.eps,image/*,application/pdf") +
       drop("brand", t.moreUp, t.moreSm, "*/*", true) + '</div></div></div>';
  h += '<div class="q" data-q="6">' + qHead(6, t.q6, t.q6h) + '<div class="q-body"><div class="feel">' +
       D.feel.slice(0, 3).map(function(v, i){ return '<input type="text" data-feel="' + i + '" value="' + esc(v) + '" placeholder="' + esc(t.feelPh[i]) + '">'; }).join("") + '</div></div></div>';
  h += '<div class="q" data-q="7">' + qHead(7, t.q7, t.q7h) + '<div class="q-body">' + refs("brandRefs") + drop("refs", t.shotsUp, t.shotsSm, "image/*,application/pdf", true) + '</div></div>';
  h += '<div class="q" data-q="8">' + qHead(8, t.q8, t.q8h) + '<div class="q-body">' + refs("appRefs") + '</div></div></section>';

  h += '<section class="sec"><div class="sec-h"><h2>' + esc(t.s3) + '</h2></div>';
  h += '<div class="q" data-q="9">' + qHead(9, t.q9, t.q9h, true) + '<div class="q-body">' + area("q9", t.q9p) + '</div></div></section>';

  h += '<div class="foot"><span><b>Pronnovo</b> · ' + esc(t.foot1.replace(/^Pronnovo Ltd\. · /, "")) + '</span><span>' + esc(t.foot2) + '</span></div>';
  h += '</div>';
  $("#page").innerHTML = h;
  $("#bar").hidden = false;
  $$("textarea").forEach(autoGrow);
  renderFiles();
  renderProgress();
  setStatus(lastStatus);
}

function renderFiles(){
  ["logo", "brand", "refs"].forEach(function(kind){
    var box = $('[data-files="' + kind + '"]'); if (!box) return;
    var list = D.files.filter(function(f){ return f.kind === kind; });
    var pend = Object.keys(pending).map(function(k){ return pending[k]; }).filter(function(p){ return p.kind === kind; });
    box.innerHTML = list.map(function(f){
      var th = f.thumb ? ' style="background-image:url(' + esc(f.thumb) + ')"' : '';
      return '<div class="file"><span class="th"' + th + '>' + (f.thumb ? '' : esc(ext(f.name))) + '</span><span class="nm" dir="auto">' + esc(f.name) + '</span><span class="sz">' + fmtSize(f.size) + '</span>' +
        '<button type="button" class="rm" data-rmfile="' + esc(f.id) + '" aria-label="remove">' + I.x + '</button></div>';
    }).join("") + pend.map(function(p){
      return '<div class="file ' + (p.error ? 'err' : 'up') + '"><span class="th">' + esc(ext(p.name)) + '</span><span class="nm" dir="auto">' + esc(p.name) + '</span><span class="sz">' + esc(p.error || t.uploading) + '</span><span></span></div>';
    }).join("");
  });
}

var QN = 9;
function answered(){
  var filled = function(s){ return !!String(s || "").trim(); };
  var hasUrl = function(a){ return a.some(function(r){ return filled(r.url); }); };
  return [
    filled(D.q1), filled(D.q2), filled(D.q3) || D.devices.length > 0 || !!D.freq, filled(D.q4),
    D.brandNone || filled(D.brandLink) || D.files.some(function(f){ return f.kind === "logo" || f.kind === "brand"; }),
    D.feel.some(filled), hasUrl(D.brandRefs) || D.files.some(function(f){ return f.kind === "refs"; }), hasUrl(D.appRefs), filled(D.q9)
  ];
}
function renderProgress(){
  var a = answered(), n = a.filter(Boolean).length;
  $("#progT").innerHTML = t.progress(n, QN);
  $("#progI").style.width = Math.round(n / QN * 100) + "%";
  $("#submit").innerHTML = I.send + '<span>' + esc(submitted ? t.resubmit : t.submit) + '</span>';
}

/* ---------------- saving ---------------- */
var lastStatus = "idle", saveTimer = null, saving = false, dirty = false, wantSubmit = false;
function setStatus(s){
  lastStatus = s;
  var el = $("#status"); el.dataset.s = s;
  var m = {idle:t.sIdle, dirty:t.sDirty, saving:t.sSaving, saved:t.sSaved, error:t.sError}[s] || "";
  $("span", el).textContent = m;
  el.style.visibility = m ? "visible" : "hidden";
}
function changed(){
  dirty = true; setStatus("dirty"); renderProgress();
  clearTimeout(saveTimer); saveTimer = setTimeout(save, 1200);
}
function clean(){
  var c = JSON.parse(JSON.stringify(D));
  c.brandRefs = c.brandRefs.filter(function(r){ return r.url.trim() || r.why.trim(); });
  c.appRefs = c.appRefs.filter(function(r){ return r.url.trim() || r.why.trim(); });
  return c;
}
var retryT;
function save(){
  clearTimeout(saveTimer);
  if (saving){ dirty = true; return Promise.resolve(); }
  if (!dirty && !wantSubmit) return Promise.resolve();
  saving = true; dirty = false; setStatus("saving");
  var sub = wantSubmit; wantSubmit = false;
  return apiSave(clean(), sub).then(function(r){
    saving = false;
    if (r && r.submitted) submitted = true;
    if (sub){ $("#doneBanner").hidden = false; renderProgress(); toast(t.sentToast); }
    if (dirty) return save();
    setStatus("saved");
  }, function(err){
    saving = false; dirty = true; if (sub) wantSubmit = true;
    setStatus("error");
    clearTimeout(retryT); retryT = setTimeout(save, navigator.onLine === false ? 8000 : 4000);
    if (navigator.onLine === false) toast(t.offline);
    console.warn(err);
  });
}
window.addEventListener("beforeunload", function(e){
  if (dirty && !saving){ apiSave(clean(), false, true).catch(function(){}); dirty = false; }
  if (saving || Object.keys(pending).length){ e.preventDefault(); e.returnValue = ""; }
});
window.addEventListener("online", function(){ if (dirty) save(); });
document.addEventListener("visibilitychange", function(){ if (document.visibilityState === "hidden" && dirty && !saving){ apiSave(clean(), false, true).catch(function(){}); dirty = false; } });

/* ---------------- uploads ---------------- */
var MAX = 50 * 1024 * 1024;
function thumb(file){
  return new Promise(function(res){
    if (!/^image\/(png|jpe?g|gif|webp|svg\+xml)$/.test(file.type)) return res("");
    var url = URL.createObjectURL(file), img = new Image();
    img.onload = function(){
      try {
        var s = 88, sc = Math.min(s / img.width, s / img.height, 1), c = document.createElement("canvas");
        c.width = Math.max(1, Math.round(img.width * sc)); c.height = Math.max(1, Math.round(img.height * sc));
        var x = c.getContext("2d"); x.drawImage(img, 0, 0, c.width, c.height);
        res(c.toDataURL("image/png").length < 14000 ? c.toDataURL("image/png") : c.toDataURL("image/jpeg", .8));
      } catch(e){ res(""); }
      URL.revokeObjectURL(url);
    };
    img.onerror = function(){ res(""); URL.revokeObjectURL(url); };
    img.src = url;
  });
}
function upload(kind, files){
  Array.prototype.forEach.call(files, function(file){
    var id = "p" + Date.now() + Math.random().toString(36).slice(2, 6);
    pending[id] = {name:file.name, kind:kind};
    if (file.size > MAX){ pending[id].error = t.upTooBig; renderFiles(); setTimeout(function(){ delete pending[id]; renderFiles(); }, 4000); return; }
    renderFiles();
    Promise.all([apiUpload(kind, file), thumb(file)]).then(function(r){
      var b = r[0];
      D.files.push({id:b.url, url:b.url, name:file.name, size:file.size, mime:file.type || b.contentType || "", kind:kind, thumb:r[1] || ""});
      delete pending[id]; renderFiles(); changed();
    }).catch(function(e){
      pending[id].error = t.upFail; renderFiles(); console.warn(e);
      setTimeout(function(){ delete pending[id]; renderFiles(); }, 5000);
    });
  });
}

/* ---------------- events ---------------- */
document.addEventListener("input", function(e){
  var el = e.target;
  if (el.dataset.k && el.type !== "checkbox"){ D[el.dataset.k] = el.value; if (el.tagName === "TEXTAREA") autoGrow(el); changed(); }
  else if (el.dataset.feel != null){ D.feel[+el.dataset.feel] = el.value; changed(); }
  else if (el.dataset.rf){
    var row = el.closest(".ref"), key = el.closest("[data-refs]").dataset.refs;
    D[key][+row.dataset.i][el.dataset.rf] = el.value; changed();
  }
});
document.addEventListener("change", function(e){
  var el = e.target;
  if (el.type === "checkbox" && el.dataset.k === "brandNone"){ D.brandNone = el.checked; $("#brandBox").hidden = el.checked; changed(); }
  if (el.type === "file"){ var kind = el.closest("[data-drop]").dataset.drop; upload(kind, el.files); el.value = ""; }
});
document.addEventListener("click", function(e){
  var b;
  if ((b = e.target.closest("[data-lang]"))){ lang = b.dataset.lang; t = T[lang]; render(); return; }
  if ((b = e.target.closest(".pill"))){
    var g = b.parentNode.dataset.group, multi = b.parentNode.dataset.multi === "1", v = b.dataset.v;
    if (multi){ var i = D[g].indexOf(v); if (i >= 0) D[g].splice(i, 1); else D[g].push(v); }
    else D[g] = D[g] === v ? "" : v;
    $$(".pill", b.parentNode).forEach(function(p){ p.setAttribute("aria-pressed", multi ? D[g].indexOf(p.dataset.v) >= 0 : D[g] === p.dataset.v); });
    changed(); return;
  }
  if ((b = e.target.closest("[data-addref]"))){
    var key = b.dataset.addref; D[key].push({url:"", why:""}); render();
    var rows = $$('[data-refs="' + key + '"] .ref'); var inp = rows[rows.length - 1].querySelector("input"); inp.focus();
    return;
  }
  if ((b = e.target.closest("[data-rmref]"))){
    var r = b.closest(".ref"), k2 = b.closest("[data-refs]").dataset.refs;
    D[k2].splice(+r.dataset.i, 1); if (!D[k2].length) D[k2].push({url:"", why:""});
    render(); changed(); return;
  }
  if ((b = e.target.closest("[data-rmfile]"))){
    if (!confirm(t.rmConfirm)) return;
    var fid = b.dataset.rmfile;
    D.files = D.files.filter(function(f){ return f.id !== fid; });
    renderFiles(); changed();
    apiDelete(fid).catch(function(err){ console.warn(err); });
    return;
  }
  if (e.target.closest("#submit")){
    var btn = $("#submit"); btn.disabled = true;
    wantSubmit = true; dirty = true;
    save().then(function(){ btn.disabled = false; });
  }
});
["dragenter", "dragover"].forEach(function(ev){
  document.addEventListener(ev, function(e){ var d = e.target.closest && e.target.closest(".drop"); if (d){ e.preventDefault(); d.classList.add("over"); } });
});
["dragleave", "drop"].forEach(function(ev){
  document.addEventListener(ev, function(e){
    var d = e.target.closest && e.target.closest(".drop"); if (!d) return;
    e.preventDefault(); d.classList.remove("over");
    if (ev === "drop" && e.dataTransfer && e.dataTransfer.files.length) upload(d.dataset.drop, e.dataTransfer.files);
  });
});

/* ---------------- boot ---------------- */
if (BOOT.notFound){
  document.documentElement.lang = lang; document.documentElement.dir = t.dir;
  $("#page").innerHTML = '<div class="err-page"><img src="' + $(".top img").src + '" alt="Pronnovo"><h1 style="font-size:22px;margin:0 0 8px">' + esc(t.notFoundT) + '</h1><p style="color:var(--muted)">' + esc(t.notFoundB) + '</p></div>';
  $(".top .seg").hidden = true;
} else {
  render();
}
}
