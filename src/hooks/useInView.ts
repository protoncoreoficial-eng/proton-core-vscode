import { useEffect, useRef, useState } from 'react';

type Props = {
  threshold?: number;
  rootMargin?: string;
};

export function useInView<T extends HTMLElement = HTMLDivElement>({ threshold = 0.15, rootMargin = '0px 0px -50px 0px' }: Props = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}