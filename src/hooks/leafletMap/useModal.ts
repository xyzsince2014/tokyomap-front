import {useCallback, useEffect, useRef, useReducer} from 'react';
import produce from 'immer';

interface ModalState {
  modalId: string;
  scrollTop: number;
}

// todo: use redux toolkit
const ModalActionType = {
  setModalId: 'MODAL/SET_MODAL_ID',
  setScrollTop: 'MODAL/SET_SCROLL_TOP',
} as const;

interface ModalAction {
  type: ValueOf<typeof ModalActionType>;
  payload?: ModalState | {modalId: string};
}

const modalActionCreator = {
  setModalId: (modalId: string): ModalAction => ({
    type: ModalActionType.setModalId,
    payload: {modalId},
  }),
  setScrollTop: (): ModalAction => ({
    type: ModalActionType.setScrollTop,
  }),
};

const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case ModalActionType.setModalId: {
      return produce(state, draft => ({
        modalId: action.payload?.modalId ?? '',
        scrollTop: draft.scrollTop,
      }));
    }
    case ModalActionType.setScrollTop: {
      return produce(state, draft => ({
        modalId: draft.modalId,
        scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
      }));
    }
    default: {
      const _: never = action.type;
      return state;
    }
  }
};

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

  const [modalState, dispatch] = useReducer(modalReducer, {
    modalId: '',
    scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
  });

  // todo: モーダル開閉で`scrollTop`の値が変わる度に`setModal()`が走ってeventListenerが蓄積するのでは？
  const stopScroll = useCallback(
    (e: Event) => {
      e.stopPropagation();
      window.scrollTo(0, modalState.scrollTop);
    },
    [modalState.scrollTop],
  );

  const openModal = useCallback(
    (element: HTMLDivElement) => {
      dispatch(modalActionCreator.setScrollTop());
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
    dispatch(modalActionCreator.setModalId(ref.current?.getAttribute('data-modal') ?? ''));
  }, [ref]);

  useEffect(() => {
    if (ref.current && modalState.modalId) {
      setModal(ref.current);
    }
  }, [modalState.modalId, setModal]);

  return ref;
};

export default useModal;
