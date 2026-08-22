"use client";

import {
  type ReactNode,
  useEffect,
  useRef,
} from "react";

type Props = {
  children: ReactNode;
  className?: string;
  topOffset?: number;
};

export default function SmoothFollowSidebar({
  children,
  className = "",
  topOffset = 92,
}: Props) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const parent = sidebar.parentElement;
    if (!parent) return;

    let currentY = 0;
    let targetY = 0;
    let animationFrame = 0;
    let running = false;

    const calculateTarget = () => {
      const parentRect = parent.getBoundingClientRect();
      const sidebarHeight = sidebar.offsetHeight;
      const parentHeight = parent.offsetHeight;

      /*
       * مقدار الحركة المطلوبة داخل العمود.
       * عندما ننزل بالصفحة يتحرك السايدبار للأسفل،
       * لكنه لا يتجاوز نهاية القسم.
       */
      const requested =
        window.scrollY +
        topOffset -
        (parentRect.top + window.scrollY);

      const maxY = Math.max(
        0,
        parentHeight - sidebarHeight,
      );

      targetY = Math.min(
        Math.max(requested, 0),
        maxY,
      );
    };

    const animate = () => {
      /*
       * كلما صغر الرقم تصبح الحركة أنعم وأبطأ.
       * 0.13 تعطي Follow واضح بدون تأخير مزعج.
       */
      currentY +=
        (targetY - currentY) * 0.13;

      if (
        Math.abs(targetY - currentY) < 0.15
      ) {
        currentY = targetY;
      }

      sidebar.style.transform =
        `translate3d(0, ${currentY}px, 0)`;

      if (
        Math.abs(targetY - currentY) > 0.15
      ) {
        animationFrame =
          requestAnimationFrame(animate);
      } else {
        running = false;
      }
    };

    const update = () => {
      calculateTarget();

      if (!running) {
        running = true;
        animationFrame =
          requestAnimationFrame(animate);
      }
    };

    calculateTarget();

    window.addEventListener(
      "scroll",
      update,
      { passive: true },
    );

    window.addEventListener(
      "resize",
      update,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        update,
      );

      window.removeEventListener(
        "resize",
        update,
      );

      cancelAnimationFrame(
        animationFrame,
      );
    };
  }, [topOffset]);

  return (
    <div
      ref={sidebarRef}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}