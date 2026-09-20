/*
 * Loads the PSP browser SDK (paidy.js) on demand and returns the configured `window.Paidy`.
 * The script is served by the PSP itself; its URL and the publishable key come from the BFF
 * (GET /payments/config), so neither is hard-coded in the front-end.
 */

export interface PaidyCard {
  type?: string;
  number: string;
  expMonth: number;
  expYear: number;
  cvc: string;
}

export interface PaidyToken {
  tokenId: string;
  method: unknown;
  expiresAt: string;
  used: boolean;
}

export interface PaidySdk {
  configure: (options: { publishableKey: string; apiBase?: string }) => void;
  tokenize: (card: PaidyCard) => Promise<PaidyToken>;
}

declare global {
  interface Window {
    Paidy?: PaidySdk;
  }
}

let loading: Promise<PaidySdk> | null = null;

/**
 * Injects paidy.js once (idempotent across calls) and returns the configured SDK.
 *
 * @param scriptUrl the PSP-served paidy.js URL (from the BFF)
 * @param publishableKey the merchant's publishable key to configure the SDK with
 * @returns the ready {@link PaidySdk} on window.Paidy
 */
const loadPaidy = (scriptUrl: string, publishableKey: string): Promise<PaidySdk> => {
  // already present (e.g. revisiting checkout) — just re-configure
  if (window.Paidy) {
    window.Paidy.configure({ publishableKey });
    return Promise.resolve(window.Paidy);
  }

  // inject once; concurrent callers share the same promise
  if (!loading) {
    loading = new Promise<PaidySdk>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.onload = () => {
        if (!window.Paidy) {
          reject(new Error('paidy.js loaded but window.Paidy is missing'));
          return;
        }
        window.Paidy.configure({ publishableKey });
        resolve(window.Paidy);
      };
      script.onerror = () => reject(new Error('failed to load paidy.js'));
      document.head.appendChild(script);
    });
  }

  return loading;
};

export default loadPaidy;
