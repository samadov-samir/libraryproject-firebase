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

////Redirect and Auth page
const local = "LOCAL";
function pgRedirect() {
  onValue(ref(db, "/AdminPass"), (sn) => {
    let y = JSON.parse(localStorage.getItem(local) || "[]");

    if (y.username == sn.val().username && y.password == sn.val().password) {
    } else {
      window.location.href =
        "http://127.0.0.1:5500/Library/adminLogin/adminLogin.html";
    }
  });
}

pgRedirect();
const logOut = document.querySelector(".logOut");
logOut.addEventListener("click", () => {
  window.location.href =
    "http://127.0.0.1:5500/Library/adminLogin/adminLogin.html";
  localStorage.setItem(local, JSON.stringify(""));
});

// DROPMENU
const hamburger = document.querySelector(".right i");
const dropmenu = document.querySelector(".dropmenu");
const shadow = document.querySelector(".shadowDrop");

const deleteHamb = document.querySelector(".space");
hamburger.addEventListener("click", () => {
  dropmenu.classList.add("hambmin");
});
deleteHamb.addEventListener("click", () => {
  dropmenu.classList.remove("hambmin");
});
///navbar responsive delete class when event
const aTag = document.querySelectorAll(".foot a");

aTag.forEach((e) => {
  e.addEventListener("click", () => {
    dropmenu.classList.remove("hambmin");
  });
});

// Contact Us

const contactUsTable = document.querySelector(".contact-us-table tbody");

onValue(ref(db, "/contacts"), async (sn) => {
  let z = await sn.val();
  let arr = Object.entries(z);
  for (const key in arr) {
    let tr = document.createElement("tr");
    let numbTh = document.createElement("th");
    let nameTh = document.createElement("td");
    let mailTh = document.createElement("td");
    let phoneTh = document.createElement("td");
    let addTh = document.createElement("td");

    numbTh.innerHTML = Number(key) + 1;
    nameTh.innerHTML = arr[key][1].full_name;
    mailTh.innerHTML = arr[key][1].email;
    phoneTh.innerHTML = arr[key][1].phone;
    addTh.innerHTML = arr[key][1].address;
    contactUsTable.append(tr);
    tr.append(numbTh, nameTh, addTh, mailTh, phoneTh);
  }
});

//Join Us

const joinUsTable = document.querySelector(".join-us-table tbody");
onValue(ref(db, "/joinUs"), async (sn) => {
  let z = await sn.val();
  let arr2 = Object.entries(z);

  for (const key in arr2) {
    let tr = document.createElement("tr");
    let numbTh = document.createElement("th");
    let nameTh = document.createElement("td");
    let mailTh = document.createElement("td");
    numbTh.innerHTML = Number(key) + 1;
    nameTh.innerHTML = arr2[key][1].joinName;
    mailTh.innerHTML = arr2[key][1].joinEmail;
    tr.append(numbTh, nameTh, mailTh);
    joinUsTable.append(tr);
  }
});

//About page
const aboutTitle = document.querySelector("#title");
const BookimgUrlAbout = document.querySelector("#BookimgUrlAbout");
const descriptionAbout = document.querySelector("#descriptionAbout");
const addBtn = document.querySelector(".about-form .addBtn");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let formData = {
    title: aboutTitle.value,
    img: BookimgUrlAbout.value,
    description: descriptionAbout.value,
  };
  if (BookimgUrlAbout.value && descriptionAbout.value && aboutTitle.value) {
    set(ref(db, "/About"), formData);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill the inputs",
      timer: 1000,
      showConfirmButton: false,
    });
  }
});

function about() {
  onValue(ref(db, "/About"), (sn) => {
    aboutTitle.value = sn.val().title;
    BookimgUrlAbout.value = sn.val().img;
    descriptionAbout.value = sn.val().description;
  });
}
about();

//search book

const addBookSearch = document.querySelector(".searchbook .inputSearch input");
const addBookBtn = document.querySelector(".searchbook .inputSearch .search");
const bookname = document.querySelector("#bookname");
const authorname = document.querySelector("#authorname");
const bookimgUrl = document.querySelector("#BookimgUrl");
const description = document.querySelector("#description");
const booktype = document.querySelector("#booktype");
const searchHistory = document.querySelector(".history");

let arr;
async function fetchFunc(search) {
  let response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${search}`
  );
  let data = await response.json();
  // console.log(data.items[0].volumeInfo.title);
  // console.log(Object.entries(data.items[0].volumeInfo) , "sasasa1");
  arr = Object.entries(data.items);
  let element = "";
  searchHistory.innerHTML = "";

  let ret = arr.forEach((e) => {
    if (e[1].volumeInfo.title.toLowerCase().includes(search.toLowerCase())) {
      element = e[1].volumeInfo.title;
      let p = document.createElement("p");
      let img = document.createElement("img");
      img.src = "img/clock.png";
      let span = document.createElement("span");
      span.innerHTML = element;
      p.append(img, span);
      searchHistory.append(p);
      span.classList.add("spanName");
    }
  });
  return data;
}

addBookBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (addBookSearch.value) {
    await fetchFunc(addBookSearch.value);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill the inputs",
      timer: 1000,
      showConfirmButton: false,
    });
  }
});

let allHistoryElements = document.querySelectorAll(".history p");
let allHistoryElementsSpan = document.querySelectorAll(".history .spanName");

$(document).on("click", ".history p", async function (e) {
  arr.forEach((x) => {
    // console.log(e.target.innerHTML)
    // console.log(x[1].volumeInfo.ratingsCount)

    if (
      e.target.innerHTML.toLowerCase().trim() ==
      x[1].volumeInfo.title.toLowerCase().trim()
    ) {
      bookname.value = x[1].volumeInfo.title;
      authorname.value = x[1].volumeInfo.authors;
      bookimgUrl.value = x[1].volumeInfo.imageLinks.smallThumbnail;
      x[1].volumeInfo.description
        ? (description.value = x[1].volumeInfo.description)
        : (description.value =
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos distinctio repudiandae molestias nostrum, animi quos modi amet reiciendis sapiente voluptates!");
      booktype.value = x[1].volumeInfo.categories;
      bookname.dataset.sell=x[1].volumeInfo.ratingsCount?x[1].volumeInfo.ratingsCount:"4";
      searchHistory.innerHTML = "";
      addBookSearch.value = "";
    }
  });
});

///Add book
function sell() {
  let oneOrZero = Math.random() >= 0.5 ? 1 : 0;
  return oneOrZero;
}
const addBtnBook = document.querySelector(".add .addBtn");
addBtnBook.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    bookname.value &&
    authorname.value &&
    bookimgUrl.value &&
    description.value &&
    booktype.value
  ) {
    let x = new Date();
    let formData = {
      bookName: bookname.value,
      authorname: authorname.value,
      bookimgUrl: bookimgUrl.value,
      description: description.value,
      addTime: `${x}`,
      booktype: booktype.value,
      sell:bookname.dataset.sell
    };
    console.log(formData)
    let id = push(ref(db, "/Books")).key;
    set(ref(db, "/Books/" + id), formData);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Book has been added",
      showConfirmButton: false,
      timer: 1500,
    });
    bookname.value = "";
    authorname.value = "";
    bookimgUrl.value = "";
    description.value = "";
    booktype.value = "";
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill the inputs",
      timer: 1500,
      showConfirmButton: false,
    });
  }
});
