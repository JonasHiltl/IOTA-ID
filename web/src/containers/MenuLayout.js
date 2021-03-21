import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import { Layout } from "antd";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import TopicMenu from "../components/TopicMenu";

const MenuLayout = props => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState();
  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
  };

  const Menu = (
    <TopicMenu
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedKey("0");
        break;
      case "/patientenfragebogen":
        setSelectedKey("2");
        break;
      default:
        setSelectedKey("0");
        break;
    }
  }, [location.pathname])

  return (
    <div>
      <NavBar menu={Menu} />
      <Layout>
        <SideBar menu={Menu} />
        <Layout.Content className="content">
          { props.children }
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default MenuLayout;