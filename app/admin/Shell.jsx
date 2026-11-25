import "./admin.css";
export default function Shell({ children, authed }) {
  return (
    <div className="adm">
      <header className="adm-top">
        <div className="adm-top-in">
          <a href="/admin"><img src="/logo.png" alt="Pronnovo" /></a>
          <span className="t">שאלוני לקוח</span>
          <span className="sp" />
          {authed && (
            <form action="/api/admin/logout" method="post">
              <button className="adm-btn ghost" type="submit">יציאה</button>
            </form>
          )}
        </div>
      </header>
      {children}
    </div>
  );
}
