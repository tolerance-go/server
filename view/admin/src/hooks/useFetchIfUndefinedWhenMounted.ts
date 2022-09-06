import { useEffect } from 'react';

export default <T, F extends (...args: any[]) => any>({
  value,
  fetch,
}: {
  value: T;
  fetch: F;
}) => {
  useEffect(() => {
    if (value === undefined) {
      fetch();
    }
  }, []);
};
