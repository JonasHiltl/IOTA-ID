import React from "react";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import {
  Menu,
  Divider
} from "antd";
import { 
  HomeOutlined,
  AuditOutlined,
  UserOutlined
} from "@ant-design/icons";
import "./Menu.css"

const GeneralMenu = ({ selectedKey, changeSelectedKey }) => {
  const { t } = useTranslation();
  return (
    <Menu mode="inline" selectedKeys={[selectedKey]}>
      <Menu.Item icon={<HomeOutlined/>} key={0} onClick={changeSelectedKey}>
        <Link to="/#">First topic</Link>
      </Menu.Item>
      <Menu.Item icon={<HomeOutlined/>} key={1} onClick={changeSelectedKey}>
        <Link to="/2">Second topic</Link>
      </Menu.Item>
      <Divider style={{ margin:"14px 0px" }}/>
      <Menu.Item icon={<AuditOutlined />} key={2} onClick={changeSelectedKey}>
        <Link to="/patientenfragebogen">{t("patientQuestionnaire.patientQuestionnaire")}</Link>
      </Menu.Item>
      <Divider style={{ margin:"14px 0px" }}/>
      <Menu.Item icon={<UserOutlined />} key={3} onClick={changeSelectedKey}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
    </Menu>
  );
}
export default GeneralMenu;