import {useState, useCallback, useEffect, useRef} from 'react';

/**
 * set a modal to the referenced HTMLDivElement.
 * modal attributes are
 * * data-modal: set a unique string as it's modalId
 * * data-modal-trigger: set `data-modal-trigger="<modalId>"` for elements to open the modal
 * * data-modal-close: set `data-modal-close="<modalId>"` for elements to close the modal (revoke preventDefault())
 * * data-modal-jump: set `data-modal-jump="<modalId>"` for elements to jump to another page after closing the modal (not revoke preventDefault())
 * * data-modal-wrapper: set `data-modal-wrapper="<modalId>"` for wrappers (e.g. an overlay)
 */
const useModal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [modalId, setModalId] = useState('');
  const [scrollTop, setScrollTop] = useState(
    document.documentElement.scrollTop || document.body.scrollTop,
  );

  // todo: モーダル開閉で`scrollTop`の値が変わる度に`setModal()`が走ってeventListenerが蓄積するのでは？
  const stopScroll = useCallback(
    (e: Event) => {
      e.stopPropagation();
      window.scrollTo(0, scrollTop);
    },
    [scrollTop],
  );

  const openModal = useCallback(
    (element: HTMLDivElement) => {
      setScrollTop(document.documentElement.scrollTop || document.body.scrollTop);
      element.setAttribute('aria-hidden', 'false');
      element.setAttribute('tabindex', '1');
      window.addEventListener('scroll', stopScroll, true);
    },
    [stopScroll],
  );

  const closeModal = useCallback(
    (element: HTMLDivElement) => {
      element.setAttribute('aria-hidden', 'true');
      element.setAttribute('tabindex', '-1');
      window.removeEventListener('scroll', stopScroll, true);
    },
    [stopScroll],
  );

  const setModal = useCallback(
    (element: HTMLDivElement) => {
      // set open triggers
      Array.from(document.querySelectorAll(`[data-modal-trigger="${modalId}"]`)).forEach(el => {
        el.addEventListener('click', () => {
          openModal(element);
        });
      });

      // set close triggers
      Array.from(document.querySelectorAll(`[data-modal-close="${modalId}"]`)).forEach(el => {
        el.addEventListener('click', e => {
          e.preventDefault();
          closeModal(element);
        });
      });

      // set transition triggers
      Array.from(document.querySelectorAll(`[data-modal-jump="${modalId}"]`)).forEach(el => {
        el.addEventListener('click', () => {
          closeModal(element);
        });
      });

      // set close triggers
      Array.from(document.querySelectorAll(`[data-modal-wrapper="${modalId}"]`)).forEach(el => {
        el.addEventListener('click', e => {
          const target = e.target as HTMLDivElement;
          if (target.getAttribute('data-modal-wrapper') === modalId) {
            e.preventDefault();
            closeModal(element);
          }
        });
      });
    },
    [modalId, openModal, closeModal],
  );

  useEffect(() => {
    setModalId(ref.current?.getAttribute('data-modal') ?? '');
  }, [ref]);

  useEffect(() => {
    if (ref.current && modalId) {
      setModal(ref.current);
    }
  }, [modalId, setModal]);

  return ref;
};

export default useModal;
