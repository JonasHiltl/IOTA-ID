import React from "react"
import styled from "@emotion/styled"
import { useTranslation } from "react-i18next";

import { Button, Menu, Dropdown, } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

export const Container = styled.div`
  display: grid;
  place-items:center;
  height: 100vh;
  width: 100vw;
  position: relative;
`

export const CenteredWrapper = styled.div`
  width: 440px;
  @media (max-width: 1024px) {
      width: 60%;
  }
  @media (max-width: 768px) {
      width: 70%;
  }
  @media (max-width: 480px) {
      width: 100%;
  }
`

const CenterItems = props => {
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
              {i18n.language === "de" ? <CheckCircleFilled style={{ opacity:"0.7"}}/> : null} 
          </Menu.Item>
          <Menu.Item style={{ display:"flex", alignItems:"center" }}>
              <Button 
                  style={{ display:"flex", flexDirection: "row-reverse", justifyContent: "space-between", alignItems:"center"}}
                  type="text" 
                  onClick={() => changeLanguage("en")}>
                      English
              </Button>
              {i18n.language === "en" ? <CheckCircleFilled style={{ opacity:"0.7"}}/> : null} 
          </Menu.Item>
      </Menu>
  );

  return (
    <Container>
        <Dropdown trigger={["click"]} overlay={menu} placement="bottomRight">
            <Button 
                icon={<img src="languageIcon.svg" style={{ marginRight:"4px" }} alt=""/>} 
                style={{ position:"absolute", top:"20px", right:"20px", justifyContent:"center", display:"flex"}}>
                {i18n.language === "de" ? "Deutsch" : "English"}
            </Button>
        </Dropdown>
        <CenteredWrapper>
            { props.children }
        </CenteredWrapper>
    </Container>
  );
};

export default CenterItems