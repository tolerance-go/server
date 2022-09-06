import { getInitialStateFromURL } from '@/utils/getInitialStateFromURL';
import { useGetState } from 'ahooks';

export default () => {
  const [searchVal, setSearchVal, getSearchVal] = useGetState(
    () => getInitialStateFromURL('searchText', 'string') ?? '',
  );

  return {
    getSearchVal,
    searchVal,
    setSearchVal,
  };
};
