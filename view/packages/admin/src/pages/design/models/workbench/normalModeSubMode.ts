import { useState } from 'react';

export type PagesSiderMode = 'page' | 'layout' | 'material';

export default () => {
  const [pagesSiderMode, setPagesSiderMode] = useState<PagesSiderMode>('page');
  return {
    pagesSiderMode,
    setPagesSiderMode,
  };
};
