/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import { PATHS } from '@/constants/path';
import { UserControllerShowWithSession } from '@/services/server/UserController';
import { useModel, useNavigate } from '@umijs/max';
import { enquireScreen } from 'enquire-js';
import React from 'react';
import Banner5 from './Banner5';
import Content5 from './Content5';
import {
  Banner50DataSource,
  Content50DataSource,
  Feature00DataSource,
  Footer00DataSource,
  Pricing10DataSource,
} from './assets/data.source';
import Feature0 from './Feature0';
import Footer0 from './Footer0';
import './less/antMotionStyle.less';
import Nav3 from './Nav3';
import Pricing1 from './Pricing1';

const Nav33 = ({ isMobile }: { isMobile: boolean }) => {
  const { setInitialState } = useModel('@@initialState');
  const navigate = useNavigate();
  const Nav30DataSource = {
    wrapper: { className: 'header3 home-page-wrapper l5c4lv1na9k-editor_css' },
    page: { className: 'home-page' },
    logo: {
      className: 'header3-logo',
      children:
        'https://gw.alipayobjects.com/zos/basement_prod/b30cdc2a-d91c-4c78-be9c-7c63b308d4b3.svg',
    },
    Menu: {
      className: 'header3-menu',
      children: [
        {
          name: 'chat',
          className: 'header3-item',
          children: {
            href: '#',
            children: [{ children: '交流社群', name: 'text' }],
          },
        },
        {
          name: 'item3',
          className: 'header3-item',
          children: {
            href: '#',
            children: [{ children: '组件市场', name: 'text' }],
          },
        },
        {
          name: 'item4',
          className: 'header3-item',
          children: {
            href: '#',
            children: [{ children: '开发者文档', name: 'text' }],
          },
        },
        {
          name: 'workbench',
          className: 'header3-item',
          children: {
            onClick: async () => {
              try {
                const user = await UserControllerShowWithSession({
                  skipServerErrorHandle: true,
                  skipNetworkErrorHandle: true,
                });
                navigate(PATHS.DASHBOARD);
                setInitialState({ user });
              } catch {
                navigate(PATHS.LOGIN);
              }
            },
            children: [{ children: '工作台', name: 'text' }],
          },
        },
      ],
    },
    mobileMenu: { className: 'header3-mobile-menu' },
  };

  return (
    <Nav3
      id="Nav3_0"
      key="Nav3_0"
      dataSource={Nav30DataSource}
      isMobile={isMobile}
    />
  );
};

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location = {} } = typeof window !== 'undefined' ? window : {};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      show: !location.port, // 如果不是 dva 2.0 请删除
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
    // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
    /* 如果不是 dva 2.0 请删除 start */
    if (location.port) {
      // 样式 build 时间在 200-300ms 之间;
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 500);
    }
    /* 如果不是 dva 2.0 请删除 end */
  }

  render() {
    const children = [
      <Nav33 isMobile={this.state.isMobile} />,
      <Banner5
        id="Banner5_0"
        key="Banner5_0"
        dataSource={Banner50DataSource}
        isMobile={this.state.isMobile}
      />,
      <Feature0
        id="Feature0_0"
        key="Feature0_0"
        dataSource={Feature00DataSource}
        isMobile={this.state.isMobile}
      />,
      <Pricing1
        id="Pricing1_0"
        key="Pricing1_0"
        dataSource={Pricing10DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content5
        id="Content5_0"
        key="Content5_0"
        dataSource={Content50DataSource}
        isMobile={this.state.isMobile}
      />,
      // <Footer2
      //   id="Footer2_0"
      //   key="Footer2_0"
      //   dataSource={Footer20DataSource}
      //   isMobile={this.state.isMobile}
      // />,
      <Footer0
        id="Footer0_0"
        key="Footer0_0"
        dataSource={Footer00DataSource}
        isMobile={this.state.isMobile}
      />,
    ];
    return (
      <div
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}
      >
        {/* 如果不是 dva 2.0 替换成 {children} start */}
        {this.state.show && children}
        {/* 如果不是 dva 2.0 替换成 {children} end */}
      </div>
    );
  }
}
