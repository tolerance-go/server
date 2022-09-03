import { getURLQuery } from '@/helpers/getURLQuery';
import { useGetState } from 'ahooks';

export default () => {
  const [searchVal, setSearchVal, getSearchVal] = useGetState<string>(
    () => (getURLQuery().searchText as string | undefined) ?? '',
  );

  return {
    getSearchVal,
    searchVal,
    setSearchVal,
  };
};
