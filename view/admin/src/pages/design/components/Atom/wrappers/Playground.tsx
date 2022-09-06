import { PLAYGROUND_ATOM_WRAPPER_CLASS_NAME } from '@/pages/design/constants/atoms';
import { ComponentStructure } from '@/pages/design/models/page/nodesStructuresAndRootIds';
import React from 'react';

export const AtomPlaygroundWrapper = (
  props: React.PropsWithChildren<{
    statId: string;
    comId: string;
    display: ComponentStructure['display'];
  }>,
) => {
  return (
    <div
      data-statId={props.statId}
      data-comId={props.comId}
      className={PLAYGROUND_ATOM_WRAPPER_CLASS_NAME}
      style={{
        display: props.display,
      }}
    >
      {props.children}
    </div>
  );
};
