import { RefObject, useEffect } from 'react';

export function useOutsideClick(ref: RefObject<HTMLElement | null>, cb: () => void) {
  useEffect(() => {
    function handler(event: globalThis.MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        cb();
      }
    }

    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [ref, cb]);
}
