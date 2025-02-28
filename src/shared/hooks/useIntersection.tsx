import { useCallback, useRef } from "react";

export const useIntersection = (onIntersect: () => void) => {
  const unsubscribe = useRef(() => {});

  return useCallback(
    (el: HTMLDivElement | null) => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        });
      });

      if (el) {
        observer.observe(el);
        unsubscribe.current = () => observer.unobserve(el);
      } else {
        unsubscribe.current();
      }
    },
    [onIntersect]
  );
};
