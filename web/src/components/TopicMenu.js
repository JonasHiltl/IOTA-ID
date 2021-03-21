import React from "react";
import { Link } from 'react-router-dom';

import {
  Menu,
  Divider
} from "antd";
import { 
  HomeOutlined
} from "@ant-design/icons";
import "./TopicMenu.css"


const TopicMenu = ({ selectedKey, changeSelectedKey }) => {
  return (
    <Menu mode="inline" selectedKeys={[selectedKey]}>
      <Menu.Item icon={<HomeOutlined/>} onClick={changeSelectedKey}>
        <Link to="/#">First topic</Link>
      </Menu.Item>
      <Menu.Item icon={<HomeOutlined/>} onClick={changeSelectedKey}>
        <Link to="/#">Second topic</Link>
      </Menu.Item>
      <Divider/>
      <Menu.Item icon={<HomeOutlined/>} onClick={changeSelectedKey}>
        <Link to="/patientenfragebogen">Patientenfragebogen</Link>
      </Menu.Item>
    </Menu>
  );
}
export default TopicMenu;