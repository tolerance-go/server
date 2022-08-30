import { PUBLIC_PATH } from '@/constants/base';
import {
  UserControllerCreate,
  UserControllerLogin,
} from '@/services/server/UserController';
import {
  AlipayOutlined,
  LockOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { useResponsive } from 'ahooks';
import { Divider, Space, Tabs } from 'antd';
import { getPublicKey } from 'helpers/getPublicKey';
import qs from 'qs';
import type { CSSProperties } from 'react';
import { useState } from 'react';
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
  let difference = max - min;

  // generate random number
  let rand = Math.random();

  // multiply with difference
  rand = Math.floor(rand * difference);

  // add with min value
  rand = rand + min;

  return rand;
}

const bgTarget = list[generateRandom(0, list.length)];

export default () => {
  const responsive = useResponsive();
  const [loginType, setLoginType] = useState<LoginType>('login');
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

              await UserControllerLogin({
                username: user.username,
                /** 已经被加密 */
                password: user.password,
              });

              window.location.href = `http://localhost:8000/?${qs.stringify({
                // token,
                userInfo: {
                  username: user.username,
                  password: user.password,
                },
              })}`;
            } catch {
              return false;
            }

            return true;
          }

          try {
            const token = await UserControllerLogin({
              username: values.username,
              password: key.encrypt(values.password, 'base64'),
            });

            window.location.href = `http://localhost:8000/?${qs.stringify({
              // token,
              userInfo: {
                username: token.username,
                password: token.password,
              },
            })}`;
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
