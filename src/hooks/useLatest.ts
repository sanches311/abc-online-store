import { RefObject, useLayoutEffect, useRef } from 'react';

const useLatest = <T>(value: T): RefObject<T> => {
  const valueRef = useRef(value);
  useLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);
  return valueRef;
};

export default useLatest;
