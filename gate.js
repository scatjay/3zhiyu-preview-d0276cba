import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBwPR0oE5VK0eBlqq8JY1B56UXy3R9cyng",
  authDomain: "gen-lang-client-0929530380.firebaseapp.com",
  databaseURL: "https://gen-lang-client-0929530380-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gen-lang-client-0929530380",
};
const ALLOWED = ["scatjay@gmail.com"];
const auth = getAuth(initializeApp(firebaseConfig));
const login = new URL("login.html", import.meta.url);
onAuthStateChanged(auth, (user) => {
  if (user && ALLOWED.includes(user.email)) {
    document.documentElement.style.visibility = "visible";
    if (!document.getElementById("zy-auth-chip")) {
      const chip = document.createElement("div");
      chip.id = "zy-auth-chip";
      chip.style.cssText = "position:fixed;right:10px;bottom:10px;z-index:99999;display:flex;gap:8px;align-items:center;background:rgba(20,32,43,.92);color:#fff;border-radius:999px;padding:6px 6px 6px 12px;font:12px/1.4 system-ui,sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.3)";
      const who = document.createElement("span");
      who.textContent = "已登入：" + user.email;
      const btn = document.createElement("button");
      btn.textContent = "登出";
      btn.style.cssText = "border:0;border-radius:999px;padding:5px 12px;background:#FAC02C;color:#1B0C0A;font:700 12px system-ui;cursor:pointer";
      btn.onclick = async () => { btn.disabled = true; await signOut(auth); };
      chip.append(who, btn);
      document.body.appendChild(chip);
    }
  } else {
    login.searchParams.set("next", location.pathname + location.search);
    location.replace(login.href);
  }
});
