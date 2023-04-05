import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getDatabase,
  get,
  set,
  ref,
  push,
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDy72CYrAuJ6EVO8rgVqJ28t1EOQWvLGBc",
  authDomain: "library-e85db.firebaseapp.com",
  databaseURL: "https://library-e85db-default-rtdb.firebaseio.com",
  projectId: "library-e85db",
  storageBucket: "library-e85db.appspot.com",
  messagingSenderId: "744419190301",
  appId: "1:744419190301:web:bf3bdd4814a1e313e408f4",
};

export const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const local = "LOCAL";
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const adminJoin = document.querySelector(".adminJoin");
const check = document.querySelector('#check');







adminJoin.addEventListener("click", (e) => {
  e.preventDefault();
  let x = {
    username: username.value,
    password: password.value,
  };

  localStorage.setItem(local, JSON.stringify(x));

  onValue(ref(db, "/AdminPass"), (sn) => {
    if (
      username.value == sn.val().username &&
      password.value == sn.val().password
    ) {
      console.log("daxil oldunuz");
      window.location.href = "http://127.0.0.1:5500/Library/admin/admin.html";
    } else{
      check.style.display = "block";
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Are you sure you are Admin?",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
});

function pageRedirect() {
  let y = JSON.parse(localStorage.getItem(local) || "[]");
  onValue(ref(db, "/AdminPass"), (sn) => {

    if (
      y.username == sn.val().username &&
      y.password == sn.val().password
    ){
      console.log("daxil oldunuz");
      window.location.href = "http://127.0.0.1:5500/Library/admin/admin.html";
    }else{
      console.log("daxil olun");
    }
  });
  
}
pageRedirect();
