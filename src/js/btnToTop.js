const btnToTop = document.querySelector("[data-up-btn]");

window.addEventListener("scroll", hideElement(btnToTop));
btnToTop.addEventListener("click", onScroll);

function hideElement(el) {
  return function hideOnScroll(e) {
    if (scrollY < document.documentElement.clientHeight) {
      el.classList.add("visually-hidden");
    } else {
      el.classList.remove("visually-hidden");
    }
  };
}

function onScroll() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}