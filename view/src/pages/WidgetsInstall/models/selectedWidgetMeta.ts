import { WidgetIncludeGroupIncludeLibAndUserAndLicense } from '@/typings/includes';
import { useState } from 'react';
export default () => {
  const [widget, setWidget] =
    useState<WidgetIncludeGroupIncludeLibAndUserAndLicense>();

  return {
    widget,
    setWidget,
  };
};
