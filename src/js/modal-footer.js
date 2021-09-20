const refs = {
  openModalBtn: document.querySelector('[data-action="open-modal-footer"]'),
  closeModalBtn: document.querySelector('[data-action="close-modal-footer"]'),
  backdrop: document.querySelector('.js-backdrop-footer'),
  btnToTop:document.querySelector("[data-up-btn]"),
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onOpenModal() {
  window.addEventListener('keydown', onEscKeyPress);
  document.body.classList.add('show-modal');
   refs.btnToTop.classList.add('visually-hidden');
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal');
   refs.btnToTop.classList.remove('visually-hidden');
}
function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    console.log('Кликнули именно в бекдроп!!!!');
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}