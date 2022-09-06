import { Button, ButtonProps } from 'antd';

// 图标按钮
export default (props: ButtonProps) => {
  return <Button size="small" type="text" {...props}></Button>;
};
