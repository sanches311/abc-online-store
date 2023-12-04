import React, { useEffect } from 'react';

const useOnClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void,
  opened: boolean
) => {
  useEffect(() => {
    if (!opened) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (ref) {
        if (!ref.current) return;
        if (!ref.current.contains(event.target as Node)) callback();
      }
    };
    document.addEventListener('mousedown', (event: MouseEvent) => handleClickOutside(event));
    return () =>
      document.removeEventListener('mousedown', (event: MouseEvent) => handleClickOutside(event));
  }, [ref, callback, opened]);
};

export default useOnClickOutside;
