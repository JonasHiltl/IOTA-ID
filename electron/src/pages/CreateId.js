import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

import ChangeLanugage from "../components/ChangeLanugage"
import InputPersonal from "../components/createID/InputPersonal"
import {
  Button,
  Carousel,
  Row,
  Col,
  Typography,
  Steps,
  Form
} from "antd";
import { 
  UserOutlined,
  HomeOutlined,
  HeartOutlined
} from "@ant-design/icons";

const { Step } = Steps;
const { Title } = Typography

const CreateId = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
		email: "",
    phoneNumber: "",
    birthDate: "",
    sex: "",
    streetNumber: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
	});

  const incrementUntil4 = () => {
    if (current === 4) return
		setCurrent(current + 1)
	};

	const decrement = () => {
		setCurrent(current - 1)
	};

  return (
    <div>
      <Row>
        <Col flex="35%" style={{ width:"35%" }}>
          <Carousel autoplay>
            <div>
              <div style={{ background:"#003a8c", height:"100vh", padding:30 }}>
                <Title style={{ color:"white" }}>Logo</Title>
              </div>
            </div>
            <div>
              <div style={{ background:"#1890ff", height:"100vh", padding:30 }}>
                <Title style={{ color:"white" }}>Logo</Title>
              </div>
            </div>
            <div>
              <div style={{ background:"#91d5ff", height:"100vh", padding:30 }}>
                <Title style={{ color:"white" }}>Logo</Title>
              </div>
            </div>
          </Carousel>
        </Col>
        <Col flex="auto" style={{ padding:50 }}>
          <Steps current={current} style={{ marginRight:4 }}>
            <Step icon={<UserOutlined/>}/>
            <Step icon={<HeartOutlined />}/>
            <Step icon={<HomeOutlined/>}/>
          </Steps>
          <Form>
          { current === 0 && 
            <InputPersonal formData={formData} setFormData={setFormData}/>
          }
          </Form>
          <ChangeLanugage/>
        </Col>
      </Row>
    </div>
  );
}

export default CreateId;
