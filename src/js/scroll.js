import refs from './refs.js';
export default function scrollIntoView() {
  refs.eventsContainer.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}
