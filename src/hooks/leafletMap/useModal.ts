import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { useCallback, useEffect, useRef, useReducer } from 'react';

interface ModalState {
  modalId: string;
  scrollTop: number;
}

const initialState = {
  modalId: '',
  scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
};

const setModalIdAction = createAction<{ modalId: string }>('MODAL/SET_MODAL_ID');
const setScrollTopAction = createAction('MODAL/SET_SCROLL_TOP');

/**
 * createReducer() builds a reducer from a map of "action type -> handler".
 * When an action is dispatched, its handler runs and returns the next state.
 */
const modalReducer = createReducer<ModalState>(initialState, {
  // on SET_MODAL_ID: remember which modal is open
  [setModalIdAction.type]: (state, action: PayloadAction<{ modalId: string }>) => ({ ...state, modalId: action.payload.modalId }),

  // on SET_SCROLL_TOP: record the current page scroll position, so it can be restored after the modal closes.
  [setScrollTopAction.type]: state => ({ ...state, scrollTop: document.documentElement.scrollTop || document.body.scrollTop }),
});

/**
 * Sets a modal to the referenced HTMLDivElement.
 *
 * modal attributes are:
 * - data-modal: set a unique string as it's modalId
 * - data-modal-trigger: set `data-modal-trigger="<modalId>"` for elements to open the modal
 * - data-modal-close: set `data-modal-close="<modalId>"` for elements to close the modal (revoke preventDefault())
 * - data-modal-jump: set `data-modal-jump="<modalId>"` for elements to jump to another page after closing the modal (not revoke preventDefault())
 * - data-modal-wrapper: set `data-modal-wrapper="<modalId>"` for wrappers (e.g. an overlay)
 */
const useModal = () => {
  // ref points at the modal's own <div>.
  // The component attaches it with ref={ref}; once that element is on screen, ref.current IS the <div>, so the code below can read its data-* attributes and flip aria-hidden / tabindex on it directly.
  const ref = useRef<HTMLDivElement>(null);

  // this hook's own state, updated the Redux way: modalState holds {modalId, scrollTop}, and dispatch(action) runs modalReducer to compute the next value.
  const [modalState, dispatch] = useReducer(modalReducer, initialState);

  // todo: this hook drives the modal imperatively (document.querySelectorAll + addEventListener + setAttribute) instead of the React way (isOpen state + JSX onClick + conditional render).
  // Bug: setModal()'s click listeners are never removed, and setModal re-runs whenever scrollTop changes, so a fresh set of click listeners is added on every open and they accumulate.
  // Rewrite declaratively (or as a <Modal isOpen onClose> component) with a useEffect cleanup for the scroll lock; that also removes this leak.
  const stopScroll = useCallback(
    (e: Event) => {
      e.stopPropagation();
      window.scrollTo(0, modalState.scrollTop);
    },
    [modalState.scrollTop],
  );

  const openModal = useCallback(
    (element: HTMLDivElement) => {
      dispatch(setScrollTopAction);
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
      Array.from(document.querySelectorAll(`[data-modal-trigger="${modalState.modalId}"]`)).forEach(
        el => {
          el.addEventListener('click', () => {
            openModal(element);
          });
        },
      );

      // set close triggers
      Array.from(document.querySelectorAll(`[data-modal-close="${modalState.modalId}"]`)).forEach(
        el => {
          el.addEventListener('click', e => {
            e.preventDefault();
            closeModal(element);
          });
        },
      );

      // set transition triggers
      Array.from(document.querySelectorAll(`[data-modal-jump="${modalState.modalId}"]`)).forEach(
        el => {
          el.addEventListener('click', () => {
            closeModal(element);
          });
        },
      );

      // set close triggers
      Array.from(document.querySelectorAll(`[data-modal-wrapper="${modalState.modalId}"]`)).forEach(
        el => {
          el.addEventListener('click', e => {
            const target = e.target as HTMLDivElement;
            if (target.getAttribute('data-modal-wrapper') === modalState.modalId) {
              e.preventDefault();
              closeModal(element);
            }
          });
        },
      );
    },
    [modalState.modalId, openModal, closeModal],
  );

  useEffect(() => {
    dispatch(setModalIdAction({ modalId: ref.current?.getAttribute('data-modal') ?? '' }));
  }, [ref]);

  useEffect(() => {
    if (ref.current && modalState.modalId) {
      setModal(ref.current);
    }
  }, [modalState.modalId, setModal]);

  return ref;
};

export default useModal;
