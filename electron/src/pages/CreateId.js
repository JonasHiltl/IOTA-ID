import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive"
import Typical from "react-typical";
const { ipcRenderer } = require("electron");

import "./CreateId.css"
import ChangeLanugage from "../components/ChangeLanugage"
import InputPersonal from "../components/createID/InputPersonal"
import InputSexDate from "../components/createID/InputSexDate"
import InputAddress from "../components/createID/InputAddress"
import {
  Button,
  Carousel,
  Row,
  Col,
  Typography,
  Steps,
  Form,
  Space
} from "antd";
import {
  UserOutlined,
  HomeOutlined,
  HeartOutlined
} from "@ant-design/icons";
const {
  SAVE_DATA_IN_STORAGE,
  HANDLE_SAVE_DATA
} = require("../../utils/constants");
import { saveDataInStorage } from "../renderer"

const { Step } = Steps;
const { Text, Title } = Typography

const CreateId = () => {
  const { t } = useTranslation();
  const is1355 = useMediaQuery({ minWidth: 1355 })
  const [isLoading, setIsLoading] = useState(false)
  const [current, setCurrent] = useState(0)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
		email: "",
    phoneNumber: "",
    dateOfBirth: "",
    sex: "",
    streetNumber: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
	});

  const { firstName, lastName, email, phoneNumber, dateOfBirth, sex, streetNumber, city, state, postalCode, country } = formData;

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isFormComplete = firstName && lastName && dateOfBirth && sex && email && re.test(email) && phoneNumber && streetNumber && city && state && postalCode && country
  const firstIsValid = firstName && lastName && email && re.test(email) && phoneNumber
  const secondIsValid = dateOfBirth && sex

  const create = async () => {
    setIsloading(true)
    if (!isFormComplete) return message.error("You are missing personal information.");

    const res = await axios.post("http://localhost:3001/create", {
      firstName: firstName,
      lastName: lastName,
      birthDate: dateOfBirth,
      sex: sex,
      email: email,
      phoneNumber: phoneNumber,
      streetNumber: streetNumber,
      city: city,
      state: state,
      postalCode: postalCode,
      country: country
    });
    
    if (res.data.success) {
      const did = {
        id: res.data.id,
        docHash: res.data.docHash,
        pubKey: res.data.pubKey,
        privKey: res.data.privKey
      }
      console.log("React triggered saving did", did)
      saveDataInStorage(did)
      message.success(res.data.message);
    } else {
      message.error(res.data.message);
    }
    setIsloading(false)
  }

  useEffect(() => {
    ipcRenderer.on(HANDLE_SAVE_DATA, handleNewItem)
    return () => {
      ipcRenderer.removeListener(HANDLE_SAVE_DATA, handleNewItem)
    }
  });

  const handleNewItem = (event, data) => {
    console.log("Renderer received new item:", data)
  }

  const incrementUntil2 = () => {
    if (current === 2) return
		setCurrent(current + 1)
	};

	const decrement = () => {
		setCurrent(current - 1)
	};

  return (
    <div>
      <Row>
        { is1355 &&
          <>
            <Title style={{ color:"white", position:"absolute", top:20, left:20, zIndex:1 }}>Logo</Title>
            <Col flex={2} style={{ width:"30%",  }}>
              <Carousel autoplay style={{ width:"100%" }}>
                <div>
                  <div style={{ background:"#003a8c", height:"100vh", padding:30 }}>
                  </div>
                </div>
                <div>
                  <div style={{ background:"#1890ff", height:"100vh", padding:30 }}>
                  </div>
                </div>
                <div>
                  <div style={{ background:"#91d5ff", height:"100vh", padding:30 }}>
                  </div>
                </div>
              </Carousel>
            </Col>
          </>
        }
        <Col flex="auto" className="createColRight" style={{ width:"70%", justifyContent:"space-between", display: "flex", flexDirection:"column" }}>
          <div>
            <div style={{ display:"flex", marginBottom:100 }}>
              <Steps current={current} style={{ marginRight:4 }}>
                <Step icon={<UserOutlined/>}/>
                <Step icon={<HeartOutlined />}/>
                <Step icon={<HomeOutlined/>}/>
              </Steps>
              <ChangeLanugage/>
            </div>
            <Space direction="vertical">
              <Title>
                <Typical
                  steps={[t("signUp.header")]}
                  className={"typical"}
                />
              </Title>
              <Text>{t("signUp.paragraph")}</Text>
            </Space>
          </div>
          <Form onFinish={create}>
          { current === 0 && 
            <InputPersonal formData={formData} setFormData={setFormData}/>
          }
          { current === 1 && 
            <InputSexDate formData={formData} setFormData={setFormData}/>
          }
          { current === 2 && 
            <InputAddress formData={formData} setFormData={setFormData}/>
          }
          </Form>
          <Col>
            <Space>
              { current < 2 ?
                <Button type="primary" style={{ width:200 }} onClick={incrementUntil2} disabled={current === 0 && !firstIsValid || current === 1 && !secondIsValid}>{t("general.next")}</Button>
                :
                <Button type="primary" style={{ width:200 }} onClick={incrementUntil2} loading={isLoading} disabled={!isFormComplete}>{t("general.done")}</Button>
              }
              { current > 0 &&
                <Button onClick={decrement}>{t("general.previous")}</Button>
              }
            </Space>
          </Col>
        </Col>
      </Row>
    </div>
  );
}

export default CreateId;
