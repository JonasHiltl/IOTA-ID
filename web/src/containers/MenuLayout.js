import React, { useState } from 'react';

import { Layout } from "antd";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import TopicMenu from "../components/TopicMenu";

const MenuLayout = props => {
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");
  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
  };

  const Menu = (
    <TopicMenu
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );

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