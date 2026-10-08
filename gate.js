import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
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
  } else {
    login.searchParams.set("next", location.pathname + location.search);
    location.replace(login.href);
  }
});
