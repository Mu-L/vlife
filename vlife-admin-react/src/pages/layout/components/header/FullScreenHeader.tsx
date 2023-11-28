import React, { useEffect, useState } from "react";
import { Layout, Nav } from "@douyinfe/semi-ui";

import { useLocation, useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@douyinfe/semi-icons";
import { detail, SysMenu } from "@src/api/SysMenu";
const { Header } = Layout;
/**
 *
 *  当前地址没有和菜单关联，如何定位一级菜单
 */
export default ({ menuId }: { menuId: string }) => {
  const [menu, setMenu] = useState<SysMenu>();
  useEffect(() => {
    detail(menuId).then((d) => setMenu(d.data));
  }, [menuId]);
  const navigate = useNavigate();
  return (
    <Header className="layout-header shadow">
      <Nav
        mode={"horizontal"}
        header={
          <div className=" flex items-center  space-x-3">
            <IconArrowLeft
              className="cursor-pointer"
              onClick={() => {
                navigate(-1);
              }}
            />
            <div className=" text-base font-bold "></div>
          </div>
        }
        footer={<>footer</>}
      ></Nav>
    </Header>
  );
};