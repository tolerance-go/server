import React from 'react';

export const withExecutor =
  (Component: React.ElementType, Executor: React.ElementType) => () => {
    return (
      <>
        <Executor />
        <Component />
      </>
    );
  };
