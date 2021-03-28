import React, {useState} from "react";
import styled from "@emotion/styled";
import axios from "axios";
import Typical from "react-typical";
import { useTranslation } from "react-i18next";
import Localbase from "localbase";
import { useMediaQuery } from "react-responsive";

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
  Tooltip,
  AutoComplete,
  DatePicker
} from "antd";
import { 
  SendOutlined,
  TeamOutlined,
  MailOutlined,
  UserOutlined,
  HomeOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import countries from "./countries.json"

const { Step } = Steps;
const { Text, Title } = Typography;

export const Container = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  height: calc(100vh - 148px);
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
    padding: 10px
  }
`

function CreateId() {
  const { t } = useTranslation();
  const isMd = useMediaQuery({ minWidth: 768 })
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
		email: "",
    phoneNumber: "",
    streetNumber: "",
    postalCode: "",
    country: "",
    city: ""
	});
  const [current, setCurrent] = useState(0)

  const isDisabled = current === 0

  const { firstName, lastName, birthDate, email, phoneNumber, streetNumber, postalCode, country, city } = formData;
	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
  const onBirthDateChange = value => setFormData({ ...formData, "birthDate": value })

  const increment = () => {
		setCurrent(current + 1)
	};

	const decrement = () => {
		setCurrent(current - 1)
	};

  let db = new Localbase('db')

  const create = async () => {
    console.log("Your name is:" , firstName, lastName)
    console.log("You are born at:" , birthDate._d)
    console.log("Your contact information are:", email, phoneNumber)
    console.log("You live at:", streetNumber, postalCode, country, city)
    /* if (firstName && lastName && email) {
      const res = await axios.post("http://localhost:3001/create", {
        firstName: firstName,
        lastName: lastName,
        email: email
      });
    if (res.data.success === true) {
      db.collection("identity").add({
        id: res.data.id,
        docHash: res.data.docHash,
        pubKey: res.data.pubKey,
        privKey: res.data.privKey
      }, "did")
			message.success(res.data.message);
		} else if (res.data.success === false) {
			message.error(res.data.message);
		}
	} */
}

  return (
    <>
      <div style={{ display:"flex", padding:20 }}>
        <Steps current={current} style={{ marginRight:4 }}>
          <Step icon={<UserOutlined/>}/>
          <Step icon={<TeamOutlined/>}/>
          <Step icon={<ClockCircleOutlined/>}/>
          <Step icon={<MailOutlined/>}/>
          <Step icon={<HomeOutlined/>}/>
        </Steps>
        { isMd &&
          <ChangeLanugage placement="bottomRight"/>
        }
      </div>
      <Container>
        <CenteredWrapper>
          <Form onFinish={create}>
            { current === 0 &&
              <>
                <Row>
                  <Title>
                    <Typical
                      steps={[t("signUp.firstName")]}
                      className={'typical'}
                    />
                  </Title>
                </Row>
                <Row>
                  <Form.Item style={{ width:"100%" }}>
                    <Input
                      size="large" 
                      name="firstName"
                      value={firstName}
                      placeholder={t("signUp.firstN")}
                      allowClear
                      onChange={e => onChange(e)}
                    />
                  </Form.Item>
                </Row>
                <Row justify="end">
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
                </Row>
              </>
            }
            { current === 1 &&
              <>
                <Row>
                  <Title>
                    <Typical
                      steps={[t("signUp.lastName")]}
                      className={'typical'}
                    />
                  </Title>
                </Row>
                <Row>
                  <Form.Item style={{ width:"100%" }}>
                    <Input
                      size="large" 
                      name="lastName"
                      value={lastName}
                      placeholder={t("signUp.lastN")}
                      allowClear
                      onChange={e => onChange(e)}
                    />
                  </Form.Item>
                </Row>
                <Row justify="end">
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
                </Row>
              </>
            }
            { current === 2 &&
              <Form.Item>
                <Row>
                  <Title>
                    <Typical
                      steps={[t("signUp.typicalBirthday")]}
                      className={'typical'}
                    />
                  </Title>
                </Row>
                <Row>
                  <Form.Item style={{ width:"100%" }}>
                    <DatePicker
                      name="birthDate"
                      format="DD/MM/YYYY"
                      style={{ width:"100%" }}
                      value={birthDate}
                      showToday={false}
                      onChange={value => onBirthDateChange(value)}
                    />
                  </Form.Item>
                </Row>
                <Row  justify="end">
                  <Tooltip title={t("toolTip.back")}>
                    <Button
                      size="large"
                      type="text"
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
                      disabled={!birthDate}
                    >
                      <SendOutlined/>
                    </Button>
                  </Tooltip>
                </Row>
              </Form.Item>
            }
            { current === 3 &&
              <Form.Item>
                <Row>
                  <Title>
                    <Typical
                      steps={[t("signUp.contactTypical")]}
                      className={'typical'}
                    />
                  </Title>
                </Row>
                <Row>
                  <Form.Item style={{ width:"100%" }}>
                    <Text>Email:</Text>
                    <Input
                      size="large" 
                      name="email"
                      value={email}
                      placeholder="Email"
                      allowClear
                      onChange={e => onChange(e)}
                    />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item style={{ width:"100%" }}>
                    <Text>Phone number:</Text>
                    <Input
                      size="large"
                      name="phoneNumber"
                      value={phoneNumber}
                      placeholder="Phone number"
                      allowClear
                      onChange={e => onChange(e)}
                    />
                  </Form.Item>
                </Row>
                <Row  justify="end">
                  <Tooltip title={t("toolTip.back")}>
                    <Button
                      size="large"
                      type="text"
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
                    >
                      <SendOutlined/>
                    </Button>
                  </Tooltip>
                </Row>
              </Form.Item>
            }
            { current === 4 &&
              <>
                <Row>
                  <Title>
                    <Typical
                      steps={[t("signUp.addressTypical")]}
                      className={'typical'}
                    />
                  </Title>
                </Row>
                <Row>
                  <Form.Item style={{ width:"100%" }}>
                    <Text>Street and Number:</Text>
                    <Input
                      size="large" 
                      name="streetNumber"
                      value={streetNumber}
                      placeholder="Street and number"
                      allowClear
                      onChange={e => onChange(e)}
                    />
                  </Form.Item>
                </Row>
                <Row gutter={{ xs: 8, sm: 16 }}>
                  <Col span={12}>
                    <Form.Item style={{ width:"100%" }}>
                      <Text>Postal Code:</Text>
                      <Input
                        size="large" 
                        name="postalCode"
                        value={postalCode}
                        placeholder="Postal Code"
                        allowClear
                        onChange={e => onChange(e)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item style={{ width:"100%" }}>
                      <Text>Country:</Text>
                      <AutoComplete
                        options={countries}
                        filterOption={true}
                      >
                        <Input
                          size="large" 
                          name="country"
                          value={country}
                          placeholder="Country"
                          autocomplete="new-password"
                          allowClear
                          onChange={e => onChange(e)}
                        />
                      </AutoComplete>
                    </Form.Item>
                  </Col>
                </Row>
                <Row >
                  <Form.Item style={{ width:"100%" }}>
                    <Text>City:</Text>
                    <Input
                      size="large" 
                      name="city"
                      value={city}
                      placeholder="City"
                      allowClear
                      onChange={e => onChange(e)}
                    />
                  </Form.Item>
                </Row>
                <Row justify="end">
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
                </Row>
              </>
            }
          </Form>
        </CenteredWrapper>
      </Container>
      { !isMd &&
        <Row justify="end" style={{ padding:"20px" }}>
          <ChangeLanugage placement="bottomRight"/>
        </Row>
      }
    </>
  );
}

export default CreateId;
