import React, { useEffect } from 'react';
import useLatest from './useLatest';

type Event = MouseEvent | TouchEvent;

const useOnClickOutside = (
  callback: () => void,
  opened: boolean,
  ...ref: React.RefObject<HTMLElement>[]
) => {
  const latest = useLatest(callback);
  useEffect(() => {
    if (!opened) return;
    const handleClickOutside = (event: Event) => {
      let shouldCallCallback = true;
      ref.forEach((item) => {
        const element = item.current;
        if (!element || element.contains(event.target as Node) || null) shouldCallCallback = false;
      });
      if (shouldCallCallback && latest.current) latest.current();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, latest, opened]);
};

export default useOnClickOutside;
