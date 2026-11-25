# Pronnovo · שאלון היכרות ללקוח

שאלון ממותג ללקוחות של פרונובו, שנשלח לכל לקוח בקישור אישי. הלקוח ממלא בלי התחברות, התשובות נשמרות אוטומטית, ואפשר לחזור לקישור ולעדכן.

- `/admin`: עמוד ניהול עם סיסמה. יוצרים בו לקוח חדש ומקבלים קישור, צופים בתשובות ובקבצים, ומייצאים ל-CSV.
- `/b/<token>`: השאלון של הלקוח (עברית או אנגלית).

**טכנולוגיה:** Next.js על Vercel. התשובות נשמרות ב-Neon Postgres, והקבצים ב-Vercel Blob.

## התקנה ב-Vercel (פעם אחת)
1. **Import:** ב-Vercel: Add New ← Project ← בוחרים את הריפו `pronnovo-brief` ← Deploy. הפריסה הראשונה תיכשל עד שמחברים אחסון, וזה צפוי.
2. **מסד נתונים:** בפרויקט: Storage ← Create Database ← **Neon** ← Connect. המשתנה `DATABASE_URL` יתווסף אוטומטית.
3. **קבצים:** Storage ← Create ← **Blob** ← גישה **Public** ← Connect. המשתנה `BLOB_READ_WRITE_TOKEN` יתווסף אוטומטית.
4. **סיסמה:** Settings ← Environment Variables ← `ADMIN_PASSWORD` = סיסמה חזקה לבחירתך.
5. **פריסה מחדש:** Deployments ← ⋯ ← Redeploy.
6. **דומיין (מומלץ):** Settings ← Domains ← למשל `brief.pronnovo.com`.

הטבלה במסד הנתונים נוצרת לבד בשימוש הראשון.

## שימוש
נכנסים ל-`/admin` ← "לקוח חדש" ← הקישור מועתק אוטומטית ← שולחים ללקוח.
