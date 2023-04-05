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

var btn = document.querySelector("#contactBtn");
btn.addEventListener("click", function () {
  let sendContact = false;
  let fullNameContact = document.querySelector("#fullNameContact");
  let emailContact = document.querySelector("#emailContact");
  let addressContact = document.querySelector("#addressContact");
  let phoneContact = document.querySelector("#phoneContact");

  if (
    fullNameContact.value.trim() === "" ||
    emailContact.value.trim() === "" ||
    !emailContact.value.trim().includes("@") ||
    addressContact.value.trim() === "" ||
    phoneContact.value.trim() === ""
  ) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Fill the gaps",
      showConfirmButton: false,
      timer: 1500,
    });
    sendContact = true;
    return;
  }

  let formData = {
    full_name: fullNameContact.value,
    email: emailContact.value,
    address: addressContact.value,
    phone: phoneContact.value,
  };

  if (sendContact === false) {
    let x = ref(db, "/contacts");

    let y = push(x).key;
    set(ref(db, "/contacts/" + y), formData);

    
  }
  
});
