import { useEffect, useRef } from 'react';

type IntersectionObserverOptions = {
  root?: HTMLElement | null;
  target: HTMLElement | null;
  onIntersect: () => void;
  threshold?: number;
  rootMargin?: string;
  disabled?: boolean;
};

export function useIntersectionObserver({
  root = null,
  target,
  onIntersect,
  threshold = 0,
  rootMargin = '0px',
  disabled = false,
}: IntersectionObserverOptions) {
  const cbRef = useRef(onIntersect);
  cbRef.current = onIntersect;

  useEffect(() => {
    if (disabled) {
      return;
    }

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        entry.isIntersecting && cbRef.current?.();
      },
      {
        root: root,
        threshold: threshold,
        rootMargin: rootMargin,
      },
    );

    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [disabled, root, target, threshold, rootMargin]);
}
