import React from "react"
import { useTranslation } from "react-i18next";

import { Button, Menu, Dropdown, } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

const ChangeLanugage = props => {
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
        icon={<img src="languageIcon.svg" style={{ marginRight:"4px" }} alt=""/>}
        >
        {i18n.language === "de" ? "Deutsch" : "English"}
      </Button>
    </Dropdown>
  );
};

export default ChangeLanugage