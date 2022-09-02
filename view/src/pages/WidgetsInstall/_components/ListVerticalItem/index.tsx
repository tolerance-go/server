import React from 'react';

export default ({
  title,
  children,
}: React.PropsWithChildren<{ title: string }>) => {
  return (
    <>
      <div style={{ color: '#00000073' }}>{title}</div>
      <div style={{ color: '#000000D9' }}>{children}</div>
    </>
  );
};
