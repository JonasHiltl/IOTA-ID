import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import GeneralMenu from "../components/Menu";
import { 
  Layout,
  Spin
} from "antd";
import { 
  LoadingOutlined 
} from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 45 }} spin />;

const MenuLayout = props => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState();
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const personalInformation = useSelector(state => state.personalInformation);
  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
  };

  const generalMenu = (
    <GeneralMenu
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedKey("0");
        break;
      case "/2":
        setSelectedKey("1");
        break;
      case "/patientenfragebogen":
        setSelectedKey("2");
        break;
      default:
        setSelectedKey("0");
        break;
    }
  }, [location.pathname, isAuthenticated])

  return (
    <div>
      { !isAuthenticated || Object.keys(personalInformation).length === 0 ?
        <Spin indicator={antIcon} style={{ position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)'}}/>
        :
        <>
          <NavBar menu={generalMenu} />
          <Layout>
            <SideBar menu={generalMenu} />
            <Layout.Content className="content">
              { props.children }
            </Layout.Content>
          </Layout>
        </>
      }

    </div>
  );
}

export default MenuLayout;