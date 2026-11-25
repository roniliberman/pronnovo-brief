"use client";
import { useEffect } from "react";
import { startForm } from "@/lib/formEngine";

export default function FormApp({ boot }) {
  useEffect(() => { startForm(JSON.parse(JSON.stringify(boot))); }, [boot]);
  return (
    <>
      <header className="top">
        <div className="top-in">
          <img src="/logo.png" alt="Pronnovo" />
          <div className="sp" />
          <div className="status" id="status" data-s="idle"><i /><span /></div>
          <div className="seg" role="group" aria-label="Language">
            <button type="button" data-lang="he">עב</button>
            <button type="button" data-lang="en">EN</button>
          </div>
        </div>
      </header>
      <main className="page" id="page" />
      <div className="bar" id="bar" hidden>
        <div className="bar-in">
          <div className="prog">
            <div className="prog-t" id="progT" />
            <div className="track"><i id="progI" /></div>
          </div>
          <button className="btn" id="submit" type="button" />
        </div>
      </div>
      <div className="toast" id="toast" hidden />
    </>
  );
}
