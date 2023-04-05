const types = document.querySelectorAll(".cat-box p");
const TYPES = "TYPES";
types.forEach((e) => {
  console.log(e.innerHTML);
  let y = JSON.parse(localStorage.getItem(TYPES));
  e.addEventListener("click", (k) => {
    if (!y) {
      localStorage.setItem(TYPES, JSON.stringify(k.target.innerHTML));
    }
  });
});
