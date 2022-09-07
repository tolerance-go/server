import { useState } from 'react';

export type WidgetKey = 'widgets' | 'widgetGroups' | 'widgetLibs';

export default () => {
  const [activeKey, setActiveKey] = useState<WidgetKey>('widgets');
  return {
    activeKey,
    setActiveKey,
  };
};
