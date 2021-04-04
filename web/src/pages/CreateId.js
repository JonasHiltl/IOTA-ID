import {React, useState, useEffect} from "react";
import { Redirect } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";
import Typical from "react-typical";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import Localbase from "localbase";
import { useMediaQuery } from "react-responsive";
import moment from 'moment';

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
  DatePicker,
  Radio
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
import ChangeLanugage from "../components/changeLanguage"
import { verify, loadPersonalInformation } from "../store/actions/auth";

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
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const isMd = useMediaQuery({ minWidth: 768 })
  const [isLoading, setIsloading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    sex: "",
		email: "",
    phoneNumber: "",
    streetNumber: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
	});
  const [current, setCurrent] = useState(0)

  const { firstName, lastName, birthDate, sex, email, phoneNumber, streetNumber, city, state, postalCode, country } = formData;

	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value }); console.log(formData)
  const onBirthDateChange = (dateString) => setFormData({ ...formData, "birthDate": dateString })
  const onSexChange = e => setFormData({ ...formData, "sex": e.target.value})
  const onCountryChange = (value) => setFormData({ ...formData, "country": value})

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isDisabled = current === 0
  const isFormComplete = firstName && lastName && birthDate && sex && email && phoneNumber && streetNumber && city && state && postalCode && country
  const secondIsfilled = birthDate && sex
  const thirdIsValid = email && re.test(email) && phoneNumber

  const incrementUntil4 = () => {
    if (current === 4) return
		setCurrent(current + 1)
	};

	const decrement = () => {
		setCurrent(current - 1)
	};

  const create = async () => {
    setIsloading(true)
    if (!isFormComplete) return message.error("You are missing personal information.");

    const res = await axios.post("http://localhost:3001/create", {
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
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
      let db = new Localbase("db")
      await db.collection("identity").add({
        id: res.data.id,
        docHash: res.data.docHash,
        pubKey: res.data.pubKey,
        privKey: res.data.privKey
      }, "did")
      await db.collection("identity").add({
        credential: res.data.credential
      }, "personalInformation")

      message.success(res.data.message);
      dispatch(verify(res.data.id))
      dispatch(loadPersonalInformation())
    } else {
      message.error(res.data.message);
    }
    setIsloading(false)
  }

  if (isAuthenticated) {
    return <Redirect to='/' />
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
                      className={"typical"}
                    />
                  </Title>
                </Row>
                <Row>
                  <Form.Item 
                    style={{ width:"100%" }} 
                    name="firstName" 
                    rules={[
                      { 
                        required: true,
                        message: t("messages.inputFN")
                      }
                    ]}
                  >
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
              </>
            }
            { current === 1 &&
              <>
                <Row>
                  <Title>
                    <Typical
                      steps={[t("signUp.lastName")]}
                      className={"typical"}
                    />
                  </Title>
                </Row>
                <Row>
                  <Form.Item 
                    style={{ width:"100%" }}
                    name="lastName" 
                    rules={[
                      { 
                        required: true,
                        message: t("messages.inputLN")
                      }
                    ]}
                  >
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
              </>
            }
            { current === 2 &&
              <>
                <Row>
                  <Title>
                    <Typical
                      steps={[t("signUp.typicalBirth")]}
                      className={"typical"}
                    />
                  </Title>
                </Row>
                <Row>
                  <Form.Item 
                    style={{ width:"100%" }}
                    name="birthDate" 
                    rules={[
                      { 
                        required: true,
                        message: t("messages.inputBirth")
                      }
                    ]}
                  >
                    <Text>{t("general.dateOfBirth")}:</Text>
                    <DatePicker
                      name="birthDate"
                      placeholder={t("general.dateOfBirth")}
                      format="DD/MM/YYYY"
                      style={{ width:"100%" }}
                      value={birthDate}
                      showToday={false}
                      onChange={value => onBirthDateChange(value)}
                      inputReadOnly={true}
                    />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item>
                    <Text>{t("general.sex")}:</Text>
                    <div>
                      <Radio.Group onChange={onSexChange} value={formData.sex}>
                        <Radio value="female">{t("general.female")}</Radio>
                        <Radio value="male">{t("general.male")}</Radio>
                      </Radio.Group>
                    </div>
                  </Form.Item>
                </Row>
              </>
            }
            { current === 3 &&
              <>
                <Row>
                  <Title>
                    <Typical
                      steps={[t("signUp.contactTypical")]}
                      className={"typical"}
                    />
                  </Title>
                </Row>
                <Row>
                  <Text>{t("general.email")}:</Text>
                  <Form.Item
                    style={{ width:"100%" }}
                    name="email" 
                    rules={[
                      { 
                        type: "email",
                        message: t("messages.invalidEmail")
                      },
                      { 
                        required: true,
                        message: t("messages.inputEmail")
                      }
                    ]}
                  >
                    <Input
                      size="large" 
                      name="email"
                      value={email}
                      placeholder={t("general.email")}
                      allowClear
                      onChange={e => onChange(e)}
                    />
                  </Form.Item>
                </Row>
                <Row>
                  <Text>{t("general.phoneNumber")}:</Text>
                  <Form.Item 
                    style={{ width:"100%" }}
                    name="phoneNumber"
                    rules={[
                      { 
                        required: true,
                        message: t("messages.inputPhone")
                      }
                    ]}
                  >
                    <Input
                      size="large"
                      name="phoneNumber"
                      value={phoneNumber}
                      placeholder={t("general.phoneNumber")}
                      allowClear
                      onChange={e => onChange(e)}
                    />
                  </Form.Item>
                </Row>
              </>
            }
            { current === 4 &&
              <>
                <Row>
                  <Title>
                    <Typical
                      steps={[t("signUp.addressTypical")]}
                      className={"typical"}
                    />
                  </Title>
                </Row>
                <Row>
                  <Text>{[t("general.streetNumber")]}:</Text>
                  <Form.Item 
                    style={{ width:"100%" }}
                    name="streetNumber"
                    rules={[
                      { 
                        required: true,
                        message: t("messages.inputStreet")
                      }
                    ]}
                  >
                    <Input
                      size="large" 
                      name="streetNumber"
                      value={streetNumber}
                      placeholder={[t("general.streetNumber")]}
                      allowClear
                      onChange={e => onChange(e)}
                    />
                  </Form.Item>
                </Row>
                <Row gutter={{ xs: 8, sm: 16 }}>
                  <Col span={12}>
                    <Text>{[t("general.city")]}:</Text>
                    <Form.Item 
                      style={{ width:"100%" }}
                      name="city"
                      rules={[
                        { 
                          required: true,
                          message: t("messages.inputCity")
                        }
                      ]}
                    >
                      <Input
                        size="large" 
                        name="city"
                        value={city}
                        placeholder={[t("general.city")]}
                        allowClear
                        onChange={e => onChange(e)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Text>{[t("general.state")]}:</Text>
                    <Form.Item 
                      style={{ width:"100%" }}
                      name="state"
                      rules={[
                        { 
                          required: true,
                          message: t("messages.inputState")
                        }
                      ]}
                    >
                      <Input
                        size="large" 
                        name="state"
                        value={state}
                        placeholder={[t("general.state")]}
                        allowClear
                        onChange={e => onChange(e)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Text>{[t("general.postalCode")]}:</Text>
                    <Form.Item
                      name="postalCode"
                      rules={[
                        { 
                          required: true,
                          message: t("messages.inputPostalCode")
                        }
                      ]}
                    >
                      <Input
                        size="large" 
                        name="postalCode"
                        value={postalCode}
                        placeholder={[t("general.postalCode")]}
                        allowClear
                        onChange={e => onChange(e)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Text>{[t("general.country")]}:</Text>
                    <Form.Item
                      name="country"
                      rules={[
                        { 
                          required: true,
                          message: t("messages.inputCountry")
                        }
                      ]}
                    >
                      <AutoComplete
                        options={countries}
                        filterOption={true}
                        onChange={onCountryChange}
                        name="country"
                        value={country}
                      >
                        <Input
                          size="large" 
                          name="country"
                          value={country}
                          placeholder={[t("general.country")]}
                          allowClear
                          autocomplete="new-password"
                        />
                      </AutoComplete>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            }
            <Row  justify="end">
              <Tooltip title={t("toolTip.back")}>
                <Button
                  size="large"
                  type="text"
                  onClick={decrement}
                  disabled={isDisabled}
                  icon={<SendOutlined rotate={180}/>}
                />
              </Tooltip>
              <Tooltip title={t("toolTip.next")}>
                <Button
                  size="large"
                  type={ current === 4 ? "primary" : "text"}
                  onClick={incrementUntil4}
                  htmlType={ current === 4 ? "submit" : "button"}
                  disabled={!isFormComplete && current === 4 || current === 0 && !firstName || current === 1 && !lastName || current === 2 && !secondIsfilled || current === 3 && !thirdIsValid}
                  loading={isLoading}
                  icon={<SendOutlined/>}
                />
              </Tooltip>
            </Row>
          </Form>
        </CenteredWrapper>
      </Container>
      { !isMd &&
        <Row justify="end" style={{ padding:"20px" }}>
          <ChangeLanugage placement="topRight"/>
        </Row>
      }
    </>
  );
}

export default CreateId;
