import { useEffect, useState } from 'react';

const useSwipe = (callback: () => void, isOpen: boolean) => {
  const [touchStartPageX, setTouchStartPageX] = useState<number>(0);
  const [touchEndPageX, setTouchEndPageX] = useState<number>(0);
  const [touchStartPageY, setTouchStartPageY] = useState<number>(0);
  const [touchEndPageY, setTouchEndPageY] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('touchstart', (event) => {
      setTouchStartPageX(Number(event.changedTouches[0].clientX));
      setTouchStartPageY(Number(event.changedTouches[0].clientY));
    });
    document.addEventListener('touchend', (event) => {
      setTouchEndPageX(Number(event.changedTouches[0].clientX));
      setTouchEndPageY(Number(event.changedTouches[0].clientY));
    });
    if (touchStartPageX - touchEndPageX > 100 && Math.abs(touchStartPageY - touchEndPageY) < 50)
      callback();

    return () => {
      document.removeEventListener('touchend', (event) => {
        setTouchEndPageX(Number(event.changedTouches[0].clientX));
        setTouchEndPageY(Number(event.changedTouches[0].clientY));
      });
      document.removeEventListener('touchstart', (event) => {
        setTouchStartPageX(Number(event.changedTouches[0].clientX));
        setTouchStartPageY(Number(event.changedTouches[0].clientY));
      });
    };
  }, [callback, isOpen]);
};

export default useSwipe;
