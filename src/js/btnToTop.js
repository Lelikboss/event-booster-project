const btnToTop = document.querySelector("[data-up-btn]");

window.addEventListener("scroll", hideElement(btnToTop));
btnToTop.addEventListener("click", onScrollToTop);

function hideElement(el) {
  return function hideBtnOnScroll() {
    if (scrollY < document.documentElement.clientHeight) {
      el.classList.add("visually-hidden");
    } else {
      el.classList.remove("visually-hidden");
    }
  };
}

function onScrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}