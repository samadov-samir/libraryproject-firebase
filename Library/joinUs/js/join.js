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





//////////////////////////////////////////////////////




var modal = document.getElementById("myModal");
console.log()
var btn = document.getElementById("myBtn");
let jbtn = document.querySelector(".jbtn");
const joinName = document.querySelector("#joinName");
const joinEmail = document.querySelector("#joinEmail");
btn.addEventListener("click", function () {
  modal.style.display = "block";

});
jbtn.addEventListener("click", function () {
  modal.style.display = "none";

});
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
jbtn.addEventListener("click", (e) => {
    e.preventDefault()
  if (joinName.value !== "" && joinEmail.value !== "") {
    let x = ref(db, "/joinUs");
    let formData = {
        joinName:joinName.value,
        joinEmail:joinEmail.value
    };
    let y = push(x).key;
    set(ref(db, "/joinUs/" + y), formData);
    console.log(joinName.value)
    modal.style.display = "none";
  }
  
});

console.log("isdeyirem")
