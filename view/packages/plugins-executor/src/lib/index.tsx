import React, { useEffect } from 'react';

const Exec = React.memo(
  ({ hook, namespace }: { hook: () => any; namespace: string }) => {
    hook();

    useEffect(() => {
      console.log(`executor: ${namespace} mounted.`);
      return () => {
        console.log(`executor: ${namespace} unmounted.`);
      };
    }, []);

    return null;
  },
);

export type IExecutor = {
  id: string;
  namespace: string;
  hook: () => any;
  pathname: string;
};

export const Executor = React.memo(
  ({ executors }: { executors: IExecutor[] }) => {
    return (
      <>
        {executors.map((item) => (
          <Exec
            key={item.namespace}
            hook={item.hook}
            namespace={item.namespace}
          />
        ))}
      </>
    );
  },
);

export const withExecutorComponent =
  (Component: React.ElementType, Executors: React.ElementType) => () => {
    return (
      <>
        <Executors />
        <Component />
      </>
    );
  };
