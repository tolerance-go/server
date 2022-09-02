import { useGetState } from 'ahooks';
import { useState } from 'react';

export default () => {
  const [searchVal, setSearchVal, getSearchVal] = useGetState<string>('');

  return {
    getSearchVal,
    searchVal,
    setSearchVal,
  };
};
