// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';
import { executors as rawExecutors } from './executors';

const Executor = ({ hook }: { hook: () => any }) => {
  hook();
  return null;
};

function ProviderWrapper(props: any) {
  return (
    <>
      {rawExecutors.map((item) => (
        <Executor key={item.namespace} hook={item.executor} />
      ))}
      {props.children}
    </>
  );
}

export function dataflowProvider(container, opts) {
  return <ProviderWrapper {...opts}>{container}</ProviderWrapper>;
}