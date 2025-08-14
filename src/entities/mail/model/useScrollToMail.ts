"use client";

import { useCallback, useEffect, useRef } from "react";

export const useScrollToMail = () => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToMail = useCallback(() => {
    const target = ref.current;
    if (!target) return;

    const elementTop = target.getBoundingClientRect().top + window.scrollY;
    const middle =
      elementTop - window.innerHeight / 2 + target.offsetHeight / 2;

    window.scrollTo({
      top: middle,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        scrollToMail();
      }, 100);
    }
  }, [scrollToMail]);

  return ref;
};
