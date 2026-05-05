import { useEffect, useRef, useState } from 'react';

export function useOverflowCheck() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        // A4 page height is 297mm. 
        // 297mm ≈ 1122.5px at 96 DPI.
        // We'll use scrollHeight > clientHeight to detect overflow.
        const { scrollHeight, clientHeight } = containerRef.current;
        // Add a tiny tolerance to avoid false positives due to rounding
        if (scrollHeight > clientHeight + 1) {
          setIsOverflowing(true);
        } else {
          setIsOverflowing(false);
        }
      }
    };

    // Initial check
    checkOverflow();

    // Create observer to watch for content changes
    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      // Also observe children to be safe
      Array.from(containerRef.current.children).forEach(child => {
         resizeObserver.observe(child);
      });
    }

    return () => resizeObserver.disconnect();
  }); // Run after every render to ensure latest DOM is checked

  return { containerRef, isOverflowing };
}
