import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./NavBar.css";
import ChangeLanugage from "./changeLanguage"

const NavBar = ({ menu }) => {
  const [visible, setVisible] = useState(false);
  return (
    <nav className="navbar">
      <Drawer
        title="Logo"
        placement="left"
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
      > 
        {menu}
      </Drawer>
      <a href="/">Logo</a>
      <div>
        <ChangeLanugage
          style={{ position:"relative"}}
        />
        <Button
          className="menu"
          type="primary"
          icon={<MenuOutlined />}
          onClick={() => setVisible(true)}
          style={{ marginLeft:"10px"}}
        />
      </div>
    </nav>
  );
};
export default NavBar;