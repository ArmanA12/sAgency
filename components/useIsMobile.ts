// useIsMobile.ts
import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // 768px is the standard breakpoint for tablets/mobile
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkMobile();

    // Listen for resize (in case user rotates phone or resizes browser)
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}