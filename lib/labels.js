export const STATUS = { new: "נשלח ללקוח", in_progress: "בתהליך מילוי", submitted: "הוגש" };
const L = { mobile: "נייד", desktop: "מחשב", tablet: "טאבלט", daily: "כמה פעמים ביום", weekly: "כמה פעמים בשבוע", rare: "מדי פעם" };
const refs = (a) => (a || []).filter((r) => r.url || r.why).map((r) => (r.url || "") + (r.why ? " — " + r.why : "")).join("\n");

/** Answers as [label, text] pairs, in question order. */
export function answerRows(d = {}) {
  const usage = [];
  if ((d.devices || []).length) usage.push("מכשיר: " + d.devices.map((x) => L[x] || x).join(", "));
  if (d.freq) usage.push("תדירות: " + (L[d.freq] || d.freq));
  if (d.q3) usage.push(d.q3);
  return [
    ["1. על המוצר", d.q1 || ""],
    ["2. מי המשתמשים", d.q2 || ""],
    ["3. איך ומתי משתמשים", usage.join("\n")],
    ["4. פעולות עיקריות", d.q4 || ""],
    ["5. מיתוג קיים", d.brandNone ? "אין מיתוג קיים" : (d.brandLink || "")],
    ["6. איך המוצר צריך להרגיש", (d.feel || []).filter((x) => String(x).trim()).join(" · ")],
    ["7. רפרנסים למיתוג", refs(d.brandRefs)],
    ["8. רפרנסים לאפליקציות", refs(d.appRefs)],
    ["9. הערות נוספות", d.q9 || ""]
  ];
}
export const DETAILS = (d = {}) => [
  ["חברה", d.company], ["איש קשר", d.contact], ["שם המוצר", d.productName], ["קישור למוצר", d.productUrl]
];
export const KIND = { logo: "לוגו", brand: "חומרי מיתוג", refs: "רפרנסים" };
