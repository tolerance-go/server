import { PUBLIC_PATH } from '@/constants/base';
import { PATHS } from '@/constants/path';
import { STORE_TAG } from '@/constants/store';
import { getPublicKey } from '@/helpers/getPublicKey';
import {
  UserControllerCreate,
  UserControllerLogin,
} from '@/services/server/UserController';
// 运行时配置

import {
  AlipayOutlined,
  LockOutlined,
  SmileTwoTone,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { useModel, Link, useNavigate } from '@umijs/max';
import { useMemoizedFn, useResponsive } from 'ahooks';
import { Divider, message, Space, Tabs } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import store from 'store';
import styles from './index.less';

type LoginType = 'register' | 'login';

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const list = [
  {
    url: 'Mandel_zoom_00_mandelbrot_set.jpg',
    share: 'Created by Wolfgang Beyer with the program Ultra Fractal 3',
    link: 'https://commons.wikimedia.org/w/index.php?curid=321973',
  },
  {
    url: 'Mandel_zoom_09_satellite_head_and_shoulder.jpg',
    share: 'By Created by Wolfgang Beyer with the program Ultra Fractal 3',
    link: 'https://commons.wikimedia.org/w/index.php?curid=322038',
  },
  {
    url: 'Mandel_zoom_12_satellite_spirally_wheel_with_julia_islands.jpg',
    share: 'By Created by Wolfgang Beyer with the program Ultra Fractal 3',
    link: 'https://commons.wikimedia.org/w/index.php?curid=322050',
  },
];

/** [min, max) */
function generateRandom(min = 0, max = 100) {
  // find diff
  const difference = max - min;

  // generate random number
  let rand = Math.random();

  // multiply with difference
  rand = Math.floor(rand * difference);

  // add with min value
  rand = rand + min;

  return rand;
}

const bgTarget = list[generateRandom(0, list.length)];

const logWelcomeMsg = (user: API.ShownUser) => {
  const getTimeMsg = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 6) {
      return '早上好';
    } else if (hour < 12) {
      return '上午好';
    } else if (hour < 14) {
      return '中午好';
    } else if (hour < 17) {
      return '下午好';
    }
    return '晚上好';
  };

  message.open({
    icon: <SmileTwoTone />,
    content: `Hi，${user.username} ${getTimeMsg()}~`,
  });
};

export default () => {
  const responsive = useResponsive();
  const [loginType, setLoginType] = useState<LoginType>('login');
  const { setInitialState } = useModel('@@initialState');
  const navigate = useNavigate();

  const login = useMemoizedFn(async (username: string, password: string) => {
    const user = await UserControllerLogin({
      username,
      /** 已经被加密 */
      password,
    });

    store.set(STORE_TAG.SAY_HI_ALREADY, true);
    setInitialState({ user });
    navigate(PATHS.DASHBOARD);
    logWelcomeMsg(user);
  });

  return (
    <div
      className={styles.wrap}
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      {responsive.md === false ? null : (
        <a
          style={{
            fontSize: 12,
            position: 'absolute',
            left: 15,
            bottom: 10,
          }}
          href={bgTarget.link}
          target={'_blank'}
          rel="noreferrer"
        >
          [{bgTarget.share}]
        </a>
      )}
      <Link
        style={{
          position: 'absolute',
          top: 10,
          right: 15,
        }}
        to={PATHS.HOME}
      >
        返回主页
      </Link>
      <LoginFormPage<{
        username: string;
        password: string;
        newUsername: string;
        newPassword: string;
        confirmPassword: string;
      }>
        backgroundImageUrl={`${PUBLIC_PATH}${bgTarget.url}`}
        logo={`${PUBLIC_PATH}logo.svg`}
        title="分形"
        subTitle="好用的渐进式低代码管理平台"
        onFinish={async (values) => {
          const key = getPublicKey();
          if (loginType === 'register') {
            try {
              const user = await UserControllerCreate({
                username: values.newUsername,
                password: key.encrypt(values.newPassword, 'base64'),
              });
              await login(user.username, user.password);
            } catch {
              return false;
            }

            return true;
          }

          try {
            await login(
              values.username,
              key.encrypt(values.password, 'base64'),
            );
          } catch {
            return false;
          }
        }}
        actions={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Divider plain>
              <span
                style={{ color: '#CCC', fontWeight: 'normal', fontSize: 14 }}
              >
                其他登录方式
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid #D4D8DD',
                  borderRadius: '50%',
                }}
              >
                <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid #D4D8DD',
                  borderRadius: '50%',
                }}
              >
                <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid #D4D8DD',
                  borderRadius: '50%',
                }}
              >
                <WeiboOutlined style={{ ...iconStyles, color: '#333333' }} />
              </div>
            </Space>
          </div>
        }
      >
        <Tabs
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={'login'} tab={'账号密码登录'} />
          <Tabs.TabPane key={'register'} tab={'注册&登录'} />
        </Tabs>
        {loginType === 'login' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'请输入用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'请输入密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            />
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                忘记密码
              </a>
            </div>
          </>
        )}
        {loginType === 'register' && (
          <>
            <ProFormText
              name="newUsername"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'请输入新用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入新用户名',
                },
              ]}
            />
            <ProFormText.Password
              name="newPassword"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'请输入新密码'}
              rules={[
                {
                  required: true,
                  message: '请输入新密码',
                },
              ]}
            />
            <ProFormText.Password
              dependencies={['newPassword']}
              name="confirmPassword"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'请确认新密码'}
              rules={[
                {
                  required: true,
                  message: '请输入确认密码',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('两次输入的密码好像不一致'),
                    );
                  },
                }),
              ]}
            />
          </>
        )}
      </LoginFormPage>
    </div>
  );
};
