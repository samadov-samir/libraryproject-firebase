var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
let jbtn = document.querySelector(".jbtn");
const joinName = document.querySelector("#joinName");
const joinEmail = document.querySelector("#joinEmail");
btn.addEventListener("click", function () {
  modal.style.display = "block";
});
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
