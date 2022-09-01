import { useState } from 'react';
export default () => {
  const [searchType, setSearchType] =
    useState<API.CreationLicense['widgetType']>('widget');

  return {
    searchType,
    setSearchType,
  };
};
