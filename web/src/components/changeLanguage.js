import React from "react"
import { useTranslation } from "react-i18next";

import { 
  Button, 
  Menu, 
  Dropdown, 
} from "antd";
import { 
  CheckCircleFilled, 
  DownOutlined 
} from "@ant-design/icons";

const ChangeLanguage = props => {
  const { i18n } = useTranslation();

  const changeLanguage = lang => {
    i18n.changeLanguage(lang);
  }

  const menu = (
    <Menu>
      <Menu.Item style={{ display:"flex", alignItems:"center" }}>
        <Button 
          style={{ display:"flex", flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center"}}
          type="text" 
          onClick={() => changeLanguage("de")}>
          Deutsch
        </Button>
        {i18n.language === "de" && <CheckCircleFilled style={{ opacity:"0.7"}}/>} 
      </Menu.Item>
      <Menu.Item style={{ display:"flex", alignItems:"center" }}>
        <Button
          style={{ display:"flex", flexDirection: "row-reverse", justifyContent: "space-between", alignItems:"center"}}
          type="text" 
          onClick={() => changeLanguage("en")}>
          English
        </Button>
        {i18n.language === "en" && <CheckCircleFilled style={{ opacity:"0.7"}}/>} 
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown trigger={["click"]} overlay={menu} placement={props.placement}>
      <Button
        icon={<img src="languageIcon.svg" style={{ marginRight:"4px" }} alt="language Icon"/>}
        type="text"
        >
        {i18n.language === "de" ? "Deutsch" : "English"}<DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default ChangeLanguage