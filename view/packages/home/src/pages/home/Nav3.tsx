import React from "react";
import TweenOne from "rc-tween-one";
import { Menu } from "antd";
import { getChildrenToRender } from "./utils";
import { Popover } from "antd";
import { Image } from "antd";
import { Card } from "antd";
import { useMediaQuery } from "react-responsive";
import { Space } from "antd";
import { Typography } from "antd";

const { Item, SubMenu } = Menu;

const Wapper = (props) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  return <Header3 {...props} isSmallScreen={isSmallScreen} />;
};

class Header3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: undefined,
    };
  }

  phoneClick = () => {
    const phoneOpen = !this.state.phoneOpen;
    this.setState({
      phoneOpen,
    });
  };

  render() {
    const { dataSource, isMobile, isSmallScreen, ...props } = this.props;
    const { phoneOpen } = this.state;
    const navData = dataSource.Menu.children;
    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: "from" }}
        {...dataSource.wrapper}
        {...props}
      >
        <div
          {...dataSource.page}
          className={`${dataSource.page.className}${phoneOpen ? " open" : ""}`}
        >
          <TweenOne
            animation={{ x: -30, type: "from", ease: "easeOutQuad" }}
            {...dataSource.logo}
          >
            <Space align="center" size={12}>
              <img width="30px" src={"/logo.svg"} alt="logo" />
              <Typography.Text
                style={{
                  fontSize: "18px",
                }}
              >
                FENXING
              </Typography.Text>
            </Space>
          </TweenOne>
          {isMobile && (
            <div
              {...dataSource.mobileMenu}
              onClick={() => {
                this.phoneClick();
              }}
            >
              <em />
              <em />
              <em />
            </div>
          )}

          <div
            {...dataSource.Menu}
            style={
              isMobile
                ? {
                    transition: "height 0.3s ease",
                    height: phoneOpen ? 145 : 0,
                  }
                : null
            }
          >
            <Menu mode={isMobile ? "inline" : "horizontal"} theme="light">
              {navData.map((item) => {
                const { children: a, subItem, ...itemProps } = item;
                if (subItem) {
                  return (
                    <SubMenu
                      key={item.name}
                      {...itemProps}
                      title={
                        <div
                          {...a}
                          className={`header3-item-block ${a.className}`.trim()}
                        >
                          {a.children.map(getChildrenToRender)}
                        </div>
                      }
                      popupClassName="header3-item-child"
                    >
                      {subItem.map(($item, ii) => {
                        const { children: childItem } = $item;
                        const child = childItem.href ? (
                          <a {...childItem}>
                            {childItem.children.map(getChildrenToRender)}
                          </a>
                        ) : (
                          <div {...childItem}>
                            {childItem.children.map(getChildrenToRender)}
                          </div>
                        );
                        return (
                          <Item key={$item.name || ii.toString()} {...$item}>
                            {child}
                          </Item>
                        );
                      })}
                    </SubMenu>
                  );
                }
                const dist = (
                  <Item key={item.name} {...itemProps}>
                    <a
                      {...a}
                      className={`header3-item-block ${a.className}`.trim()}
                    >
                      {a.children.map(getChildrenToRender)}
                    </a>
                  </Item>
                );

                if (item.name === "chat") {
                  return (
                    <Item key={item.name} {...itemProps}>
                      <Popover
                        popupAlign={{ offset: [0, isSmallScreen ? 13 : 15] }}
                        overlayClassName="link-overlay"
                        content={
                          <Card bordered={false}>
                            <Card.Grid
                              style={{
                                width: isSmallScreen ? "100%" : "50%",
                                textAlign: "center",
                              }}
                            >
                              <img width={"200px"} src="/weixin.jpeg" />
                              <div>加微信，拉你进群</div>
                            </Card.Grid>
                            <Card.Grid
                              style={{
                                width: isSmallScreen ? "100%" : "50%",
                                textAlign: "center",
                              }}
                            >
                              <img
                                width={"176px"}
                                style={{
                                  margin: "12px",
                                }}
                                src="/dingding.jpeg"
                              />
                              <div>钉钉群，扫码入群</div>
                            </Card.Grid>
                          </Card>
                        }
                      >
                        <a
                          {...a}
                          className={`header3-item-block ${a.className}`.trim()}
                        >
                          {a.children.map(getChildrenToRender)}
                        </a>
                      </Popover>
                    </Item>
                  );
                }

                return dist;
              })}
            </Menu>
          </div>
        </div>
      </TweenOne>
    );
  }
}

export default Wapper;
