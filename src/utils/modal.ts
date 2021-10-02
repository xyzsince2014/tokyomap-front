/**
 * set modals
 *
 * modal attributes
 * * data-modal: set a unique string as it's modalId
 * * data-modal-trigger: set `data-modal-trigger="<modalId>"` for elements to open the modal
 * * data-modal-close: set `data-modal-close="<modalId>"` for elements to close the modal (revoke preventDefault())
 * * data-modal-jump: set `data-modal-jump="<modalId>"` for elements to jump to another page after closing the modal (not revoke preventDefault())
 * * data-modal-wrapper: set `data-modal-wrapper="<modalId>"` for wrappers (e.g. the overlay)
 * @param {Element} modal
 */
export const setModals = (modal: Element) => {
  const modalId = modal.getAttribute('data-modal') ?? '';

  // todo: use `const`
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  const stopScroll = (e: Event) => {
    e.stopPropagation();
    window.scrollTo(0, scrollTop);
  };

  const openModal = () => {
    scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('tabindex', '1');
    window.addEventListener('scroll', stopScroll, true);
  };

  const closeModal = () => {
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('tabindex', '-1');
    window.removeEventListener('scroll', stopScroll, true);
  };

  // open triggers
  // todo: use `useRef` instead of `document.querySelectorAll`
  // todo: replace `map` with `forEach`
  Array.from(document.querySelectorAll(`[data-modal-trigger="${modalId}"]`)).map(el => {
    el.addEventListener('click', () => {
      openModal();
    });
    return false;
  });

  // close triggers
  Array.from(document.querySelectorAll(`[data-modal-close="${modalId}"]`)).map(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      closeModal();
    });
    return false;
  });

  // transition triggers
  Array.from(document.querySelectorAll(`[data-modal-jump="${modalId}"]`)).map(el => {
    el.addEventListener('click', () => {
      closeModal();
    });
    return false;
  });

  // close triggers
  Array.from(document.querySelectorAll(`[data-modal-wrapper="${modalId}"]`)).map(el => {
    el.addEventListener('click', e => {
      const target = e.target as HTMLInputElement;
      if (target.getAttribute('data-modal-wrapper') === modalId) {
        e.preventDefault();
        closeModal();
      }
    });
    return false;
  });
};
