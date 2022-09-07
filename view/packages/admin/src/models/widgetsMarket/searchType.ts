import { WidgetsType } from '@/typings/widgets';
import { useState } from 'react';
export default () => {
  const [searchType, setSearchType] = useState<WidgetsType>('widget');

  return {
    searchType,
    setSearchType,
  };
};
