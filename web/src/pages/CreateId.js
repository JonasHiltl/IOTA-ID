import React, {useState} from "react";
import styled from "@emotion/styled"
import axios from "axios";
import Typical from "react-typical"
import { useTranslation } from "react-i18next";
import Localbase from 'localbase'

import ChangeLanugage from "../components/changeLanguage"
import {
  Form,
  Input,
  Button,
  message,
  Row,
  Col,
  Steps,
  Typography,
  Tooltip
} from "antd";
import { 
  SendOutlined,
  TeamOutlined,
  MailOutlined,
  UserOutlined
} from "@ant-design/icons";

const { Step } = Steps;
const { Title } = Typography;

export const Container = styled.div`
  display: grid;
  place-items:center;
  height: 50vh;
  width: 100vw;
  position: relative;
`

export const CenteredWrapper = styled.div`
  width: 40%;
  padding: 20px;
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

function CreateId() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
		email: ""
	});
  const [current, setCurrent] = useState(0)

  const isDisabled = current === 0

  const { firstName, lastName, email } = formData;
	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const increment = () => {
		setCurrent(current + 1)
	};

	const decrement = () => {
		setCurrent(current - 1)
	};

  let db = new Localbase('db')

  const create = async () => {
    if (firstName && lastName && email) {
      const res = await axios.post("http://localhost:3001/create", {
        firstName: firstName,
        lastName: lastName,
        email: email
      });
    if (res.data.success === true) {
      db.collection("identity").add({
        docHash: res.data.docHash,
        pubKey: res.data.pubKey,
        privKey: res.data.privKey
      }, "did")
			message.success(res.data.message);
		} else if (res.data.success === false) {
			message.error(res.data.message);
		}
	}}

  return (
    <>
      <div style={{ display:"flex", padding:20 }}>
        <Steps current={current} style={{ marginRight:4 }}>
          <Step icon={<UserOutlined/>}/>
          <Step icon={<TeamOutlined/>}/>
          <Step icon={<MailOutlined/>}/>
        </Steps>
        <ChangeLanugage/>
      </div>
      <Container>
        <CenteredWrapper>
          <Form onFinish={create}>
            { current === 0 &&
              <Form.Item>
                <Row>
                  <Title>
                    <Typical
                      steps={[t("signUp.firstName")]}
                      className={'typical'}
                    />
                  </Title>
                </Row>
                <Row>
                  <Col span={24} style={{ display:"flex" }}>
                    <Input
                      size="large" 
                      name="firstName"
                      value={firstName}
                      placeholder={t("signUp.firstN")}
                      allowClear
                      onChange={e => onChange(e)}
                    />
                    <Tooltip title={t("toolTip.back")}>
                      <Button
                        type="text"
                        size="large"
                        onClick={decrement}
                        disabled={isDisabled}
                      >
                        <SendOutlined rotate={180}/>
                      </Button>
                    </Tooltip>
                    <Tooltip title={t("toolTip.next")}>
                      <Button
                        size="large"
                        type="text"
                        onClick={increment}
                        disabled={!firstName}
                      >
                        <SendOutlined/>
                      </Button>
                    </Tooltip>
                  </Col>
                </Row>
              </Form.Item>
            }
            { current === 1 &&
              <Form.Item>
                <Row>
                  <Title>
                    <Typical
                      steps={[t("signUp.lastName")]}
                      className={'typical'}
                    />
                  </Title>
                </Row>
                <Row>
                  <Col span={24} style={{ display:"flex" }}>
                    <Input
                      size="large" 
                      name="lastName"
                      value={lastName}
                      placeholder={t("signUp.lastN")}
                      allowClear
                      onChange={e => onChange(e)}
                    />
                    <Tooltip title={t("toolTip.back")}>
                      <Button
                        type="text"
                        size="large"
                        onClick={decrement}
                      >
                        <SendOutlined rotate={180}/>
                      </Button>
                    </Tooltip>
                    <Tooltip title={t("toolTip.next")}>
                      <Button
                        size="large"
                        type="text"
                        onClick={increment}
                        disabled={!lastName}
                      >
                        <SendOutlined/>
                      </Button>
                    </Tooltip>
                  </Col>
                </Row>
              </Form.Item>
            }
            { current === 2 &&
              <Form.Item>
                <Row>
                  <Title>
                    <Typical
                      steps={[t("signUp.emailTypical")]}
                      className={'typical'}
                    />
                  </Title>
                </Row>
                <Row>
                  <Col span={24} style={{ display:"flex" }}>
                    <Input
                      size="large" 
                      name="email"
                      value={email}
                      placeholder="Email"
                      allowClear
                      onChange={e => onChange(e)}
                    />
                    <Tooltip title={t("toolTip.back")}>
                      <Button
                        size="large"
                        type="text"
                        onClick={decrement}
                      >
                        <SendOutlined rotate={180}/>
                      </Button>
                    </Tooltip>
                    <Tooltip title={t("toolTip.submit")}>
                      <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                      >
                        <SendOutlined/>
                      </Button>
                    </Tooltip>
                  </Col>
                </Row>
              </Form.Item>
            }
          </Form>
        </CenteredWrapper>
      </Container>
    </>
  );
}

export default CreateId;
