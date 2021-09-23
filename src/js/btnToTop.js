const btnToTopImg = document.querySelector(".btn-to-top");

window.addEventListener("scroll", hideElement(btnToTopImg));
btnToTopImg.addEventListener("click", onScroll);

function hideElement(el) {
  return function hideOnScroll(e) {
    if (scrollY > document.documentElement.clientHeight) {
      el.classList.add("showBtn");
    } else {
      el.classList.remove("showBtn");
    }
  };
}

function onScroll() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}