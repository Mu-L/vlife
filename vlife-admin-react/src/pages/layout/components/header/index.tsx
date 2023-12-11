import React, { FC, useEffect, useMemo, useState } from "react";
const apiUrl = import.meta.env.VITE_APP_API_URL;
import {
  Layout,
  Nav,
  Button,
  Avatar,
  Dropdown,
  Empty,
  Tooltip,
  Popover,
  Image,
} from "@douyinfe/semi-ui";
import { IconDesktop, IconGithubLogo, IconSetting } from "@douyinfe/semi-icons";
import logo from "@src/assets/logo.png";
import "../../index.scss";
import { useAuth } from "@src/context/auth-context";
import { useNiceModal } from "@src/store";
import {
  saveUserPasswordModifyDto,
  UserPasswordModifyDto,
} from "@src/api/SysUser";
import { useNavigate } from "react-router-dom";
import { MenuVo } from "@src/api/SysMenu";
import SelectIcon from "@src/components/SelectIcon";
import { MenuItem } from "../../types";
import wxImage from "@src/assets/wx.jpg";
import LinkMe from "./LinkMe";

const mode = import.meta.env.VITE_APP_MODE;
const { Header } = Layout;
/**
 *
 *  当前地址没有和菜单关联，如何定位一级菜单
 */
const Index = ({
  appMenus,
  onAppClick,
  outApp,
}: {
  appMenus: MenuVo[];
  onAppClick: (menuVo: MenuVo) => void;
  outApp?: MenuVo; //通过url确定的应用
}) => {
  const navigate = useNavigate();
  const formModal = useNiceModal("formModal");
  const { loginOut, user, checkBtnPermission } = useAuth();
  const [app, setApp] = useState<MenuVo | undefined>(outApp);

  useEffect(() => {
    if (app === undefined) {
      setApp(appMenus[0]); //选中第一个
      onAppClick(appMenus[0]);
    } else {
      setApp(outApp);
    }
  }, [app, appMenus, outApp]);

  function renderIcon(icon: any) {
    if (!icon) {
      return null;
    }
    if (typeof icon === "string") {
      return <SelectIcon read value={icon} />;
    }
    return icon.render();
  }
  const menuItems = useMemo((): Partial<MenuItem>[] => {
    return appMenus.map((m: MenuVo) => {
      return {
        itemKey: m.id,
        text: m.name,
        icon: m.icon ? renderIcon(m.icon) : null,
        onClick: () => {
          if (m.url) navigate(m.url);
          onAppClick(m);
          setApp(m);
        },
      };
    });
  }, [appMenus]);

  const editPassword = () => {
    formModal
      .show({
        title: "密码修改",
        type: "userPasswordModifyDto",
        formData: { id: user?.id }, //数据
        saveFun: (pwd: UserPasswordModifyDto) => {
          return saveUserPasswordModifyDto(pwd);
        },
      })
      .then((saveData) => {
        loginOut();
      });
  };

  return (
    <>
      <Header className="layout-header shadow">
        <Nav
          mode={"horizontal"}
          header={
            <div
              className=" flex items-center cursor-pointer "
              onClick={() => {
                navigate("/");
                // setApp(undefined);
              }}
            >
              <Empty
                className=" relative top-3  mr-4"
                image={
                  <img src={logo} style={{ width: 150, height: 45, top: 5 }} />
                }
              ></Empty>
            </div>
          }
          defaultSelectedKeys={[(app && app.id) || ""]}
          items={menuItems}
          footer={
            <>
              {(mode === "dev" || user?.superUser) && (
                <>
                  <LinkMe></LinkMe>
                  {user?.superUser && (
                    <Button
                      theme="borderless"
                      onClick={() => {
                        navigate("/sysConf/model");
                      }}
                      style={{
                        color: "var(--semi-color-text-2)",
                      }}
                      icon={<IconSetting />}
                    >
                      配置中心
                    </Button>
                  )}

                  <Button
                    theme="borderless"
                    icon={<IconDesktop size="large" />}
                    style={{
                      color: "var(--semi-color-text-2)",
                      marginRight: "12px",
                    }}
                    onClick={() => {
                      window.open("http://vlife.cc");
                    }}
                  >
                    使用指南
                  </Button>

                  <Button
                    theme="borderless"
                    icon={<IconGithubLogo size="large" />}
                    style={{
                      color: "var(--semi-color-text-2)",
                      marginRight: "12px",
                    }}
                    onClick={() => {
                      window.open("https://gitee.com/wwwlike/vlife");
                    }}
                  >
                    GITEE
                  </Button>
                </>
              )}
              <Dropdown
                render={
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={loginOut}>退出登录</Dropdown.Item>
                    {checkBtnPermission(
                      "sysUser:save:userPasswordModifyDto"
                    ) && (
                      <Dropdown.Item onClick={editPassword}>
                        密码修改
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                }
              >
                {user?.avatar ? (
                  <Avatar
                    alt="beautiful cat"
                    size="small"
                    src={`${apiUrl}/sysFile/image/${user?.avatar}`}
                    style={{ margin: 4 }}
                  />
                ) : (
                  <Avatar color="orange" size="small">
                    {user?.name[0]}
                  </Avatar>
                )}
              </Dropdown>
            </>
          }
        ></Nav>
      </Header>
    </>
  );
};

export default Index;
