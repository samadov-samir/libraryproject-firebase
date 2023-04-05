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

var value = document.querySelector("#searchBook");
var searchButton = document.querySelector("#searchButton");
var image = document.querySelector(".card-img");
var name = document.querySelector(".name");
var cardWrappper = document.querySelector(".carousel-inner");

onValue(ref(db, "/Books"), async (sp) => {
  let z = await sp.val();
  let arr = Object.entries(z);

  let lastBook = arr[arr.length - 1][1];
  console.log(lastBook);
  cardWrappper.innerHTML = `<div class="carousel-item active">
      <div class="itemC">
        <div class="itemLeft">
          <img src="${lastBook.bookimgUrl}">
        </div>
        <div class="itemRight">
          <div class="bookName">
          ${lastBook.bookName}
          </div>
          <div class="bookAuthor">
          ${lastBook.authorname}
          </div>
          <div class="bookDescription">
          ${lastBook.desription}
          </div>
        </div>
      </div>
    </div>`;

  // ----------
  searchButton.addEventListener("click", function () {
   if(value.value){
    
   }
      cardWrappper.innerHTML = "";
      console.log();
      for (let book in arr) {
        if (book == 0) {
          cardWrappper.innerHTML += `<div class="carousel-item active">
      <div class="itemC">
        <div class="itemLeft">
          <img src="${arr[0][1].bookimgUrl}">
        </div>
        <div class="itemRight">
          <div class="bookName">
          ${arr[0][1].bookName}
          </div>
          <div class="bookAuthor">
          ${arr[0][1].authorname}
          </div>
          <div class="bookDescription">
          ${arr[0][1].desription}
          </div>
        </div>
      </div>
    </div>`;
        } else {
          if (
            arr[book][1].bookName
              .toLowerCase()
              .includes(value.value.toLowerCase())
          ) {
            console.log(book);

            cardWrappper.innerHTML += `<div class="carousel-item ">
        <div class="itemC">
          <div class="itemLeft">
            <img src="${arr[book][1].bookimgUrl}">
          </div>
          <div class="itemRight">
            <div class="bookName">
            ${arr[book][1].bookName}
            </div>
            <div class="bookAuthor">
            ${arr[book][1].authorname}
            </div>
            <div class="bookDescription">
            ${arr[book][1].desription}
            </div>
          </div>
        </div>
      </div>`;
          }
        }
      }
    
  });
});

// onValue(ref(db, "/Books"), async (sp) => {
//   let z = await sp.val();
//   let arr = Object.entries(z);
//   // ----------
//   searchButton.addEventListener("click", function () {
//     cardWrappper.innerHTML = "";
//     for (let book of arr) {
//       if (book[1].bookName.toLowerCase().includes(value.value.toLowerCase())) {
//         console.log(book);
//         let cardSwiperSlide = document.createElement('div');
//         cardSwiperSlide.classList.add('card')
//           cardSwiperSlide.innerHTML = `<div class="card swiper-slide">
//       <div class="image-content">
//           <span class="overlay"></span>
//           <div class="card-image">
//               <img src="${book[1].bookimgUrl}" alt="" class="card-img">
//           </div>
//       </div>
//       <div class="card-content">
//           <h2 class="name">${book[1].bookName}</h2>
//           <p>${book[1].description}</p>
//           <button class="button">READ MORE</button>
//       </div>
//   </div>`;

//       }
//     }
//   });
// });
