import React from 'react';

export default (Component: React.ElementType, Executor: React.ElementType) =>
  () => {
    return (
      <>
        <Executor />
        <Component />
      </>
    );
  };
