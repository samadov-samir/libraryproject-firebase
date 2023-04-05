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

const commentTitle = document.querySelector("#commentTitle");
const addCommentBtn = document.querySelector("#addComment");
const comments = document.querySelector(".book-comment-details");
const bookContainer = document.querySelector(".book-container");
////////////

///////////////////////////
let t = JSON.parse(localStorage.getItem("READMORE"));
console.log(t);
onValue(ref(db, "/Books"), async (sp) => {
  let z = await sp.val();
  let arr = Object.entries(z);
  arr.forEach((element) => {
    if (element[0] == t) {
      let now = new Date();
      let date = new Date(element[1].addTime);
      function diff_hours(dt2, dt1) {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;

        return Math.abs(Math.round(diff / (60 * 60)));
      }
      console.log();
      bookContainer.innerHTML = `
        
      <div class="book-text">
      <button class="book-btn"><a href="../catalogPage/catalogPage.html">&#60; Back</a></button>
      <p class="year">${date.getFullYear()}</p>
      <h3 class="book-name">${element[1].bookName}</h3>
      <span class="ago">${
        diff_hours(date, now) < 24
          ? diff_hours(date, now)
          : "More one day before"
      } hours ago added</span>
      <p class="writer">${element[1].authorname}</p>
      <p class="book-about">
      ${element[1].description}
      </p>
    </div>
    <div class="book-img">
      <img src="${element[1].bookimgUrl}" alt="book">
    </div>
  
        `;
        if(element[1].comments){
            let commentsArray=Object.entries(element[1].comments)
            if(commentsArray){
        
                commentsArray.forEach(comment=>{
                    if(comment){
                        comments.insertAdjacentHTML("afterbegin",  `
                        <div class="book-comment-box">
                              <span class="anonim">Anonim</span> <span class="time">${date.getHours()}:${date.getMinutes() } today </span>
                              <p class="comment">
                                ${comment[1].comment}
                              </p>
                            </div>`);
                        ;
                        console.log(comment[1]);
                        commentTitle.value=""
                    }
                    else{
                       console.log("aue")
                    }
                    
                })
              }
              else{
                console.log("Sa");
              }
        }
        else{
            comments.innerHTML=` <div style="text-align:center;margin-top:30px;font-size:30px">You write first comment</div>`
        }
        
      
    }
  });
});
addCommentBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let date = new Date();
  console.log(date.getTime());
  onValue(ref(db, "/Books"), async (sp) => {
    let z = await sp.val();
    let arr = Object.entries(z);
  });
  if (commentTitle.value) {
    let id = push(ref(db, `/Books/${t}`)).key;
    
    set(ref(db, `/Books/${t}/comments/` + id), {"comment":commentTitle.value,"time":Date(date)});
comments.innerHTML=""
    comments.insertAdjacentHTML(`
        <div class="book-comment-box">
              <span class="anonim">Anonim</span> <span class="time">${date.getHours()}:${date.getMinutes() } today </span>
              <p class="comment">
                ${commentTitle.value}
              </p>
            </div>`);
  } else {
    alert("sas");
  }
});
