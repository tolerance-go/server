import { useRef } from 'react';
export const useTag = <T>(defaultTag: T) => {
  const tagRef = useRef<T>(defaultTag);

  return tagRef;
};
