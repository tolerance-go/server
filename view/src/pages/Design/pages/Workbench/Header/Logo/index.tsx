import { PATHS } from '@/constants/path';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import { Button, Dropdown, Menu, Space } from 'antd';
import { useState } from 'react';
import Keybord from './Keybord';

const LogoMenu = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  return (
    <Menu
      items={[
        {
          label: '返回应用管理',
          key: '1',
          onClick: () => {
            navigate(PATHS.APP_LIST);
          },
        },
        {
          label: <Keybord visible={visible} setVisible={setVisible} />,
          key: 'keybord',
          onClick: () => {
            if (visible === false) {
              setVisible(true);
            }
          },
        },
      ]}
    />
  );
};

const App = () => (
  <Dropdown overlay={<LogoMenu />}>
    <Button shape="round">
      <Space>
        <img src="/logo.svg" width={'20px'}></img>
        <DownOutlined
          style={{
            fontSize: '12px',
          }}
        />
      </Space>
    </Button>
  </Dropdown>
);

export default App;
