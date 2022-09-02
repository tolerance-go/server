import { Badge } from 'antd';

export default ({
  active = false,
  count,
}: {
  count?: number;
  active?: boolean;
}) => {
  return (
    <Badge
      count={count}
      style={{
        marginTop: -3,
        marginLeft: 4,
        color: active ? '#1890FF' : '#999',
        backgroundColor: active ? '#E6F7FF' : '#eee',
      }}
    />
  );
};
