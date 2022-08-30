import { useState } from 'react';

export default () => {
  const [searchVal, setSearchVal] = useState<string>('');

  return {
    searchVal,
    setSearchVal,
  };
};
