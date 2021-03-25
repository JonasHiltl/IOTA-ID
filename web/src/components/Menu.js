import React from "react";
import { Link } from 'react-router-dom';

import {
  Menu,
  Divider
} from "antd";
import { 
  HomeOutlined,
  AuditOutlined
} from "@ant-design/icons";
import "./Menu.css"


const GeneralMenu = ({ selectedKey, changeSelectedKey }) => {
  return (
    <Menu mode="inline" selectedKeys={[selectedKey]}>
      <Menu.Item icon={<HomeOutlined/>} key={0} onClick={changeSelectedKey}>
        <Link to="/#">First topic</Link>
      </Menu.Item>
      <Menu.Item icon={<HomeOutlined/>} key={1} onClick={changeSelectedKey}>
        <Link to="/#">Second topic</Link>
      </Menu.Item>
      <Divider style={{ margin:"14px 0px" }}/>
      <Menu.Item icon={<AuditOutlined />} key={2} onClick={changeSelectedKey}>
        <Link to="/patientenfragebogen">Patientenfragebogen</Link>
      </Menu.Item>
    </Menu>
  );
}
export default GeneralMenu;