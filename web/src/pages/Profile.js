import { React, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Localbase from "localbase";

import {
  Row,
  Col,
  Form,
  Button,
  message,
  Typography
} from "antd";
import "./profile.css"
import InputWithTopLabel from "../components/InputWithTopLabel"
import DatePickerWithTopLabel from "../components/DatePickerWithTopLabel"
import RadioGroupWithTopLabel from "../components/RadioGroupWithTopLabel"
import AutocompleteWithTopLabel from "../components/AutocompleteWithTopLabel"
import { loadPersonalInformation } from "../store/actions/auth";

const { Title } = Typography

const Profile = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false)
  const [personalData, setPersonalData] = useState({
    id: useSelector(state => state.personalInformation.id),
    firstName: useSelector(state => state.personalInformation.name.first),
    lastName: useSelector(state => state.personalInformation.name.last),
    dateOfBirth: useSelector(state => state.personalInformation.birthDate),
    sex: useSelector(state => state.personalInformation.sex),
    streetNumber: useSelector(state => state.personalInformation.address.street),
    city: useSelector(state => state.personalInformation.address.city),
    state: useSelector(state => state.personalInformation.address.state),
    postalCode: useSelector(state => state.personalInformation.address.postalCode),
    country: useSelector(state => state.personalInformation.address.country),
    phoneNumber: useSelector(state => state.personalInformation.phoneNumber),
    email: useSelector(state => state.personalInformation.email),
  })
  const { id, firstName, lastName, dateOfBirth, sex, streetNumber, city, state, postalCode, country, phoneNumber, email } = personalData

  const isFormComplete = id && firstName && lastName && dateOfBirth && sex && email && phoneNumber && streetNumber && city && state && postalCode && country

  const update = async () => {
    setIsloading(true)
    if (!isFormComplete) return message.error("You are missing personal information.");
    const res = await axios.post("http://localhost:3001/update-personal-credential", {
      id:id,
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
      let db = new Localbase("db")
      await db.collection("identity").add({
        credential: res.data.credential
      }, "personalInformation")

      message.success(res.data.message);
      dispatch(loadPersonalInformation())
    } else {
      message.error(res.data.message);
    }
    setIsloading(false)
  }

  return (
    <div className="profile">
      <Title>{useSelector(state => state.personalInformation.name.first)} {useSelector(state => state.personalInformation.name.last)}</Title>
      <Form onFinish={update}>
        <div className="profileWrapper">
          <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{ marginBottom:0 }}>
            <Col span={12}>
              <InputWithTopLabel item="firstName" itemData={firstName} personalData={personalData} setPersonalData={setPersonalData}/>
            </Col>
            <Col span={12}>
              <InputWithTopLabel item="lastName" itemData={lastName} personalData={personalData} setPersonalData={setPersonalData}/>
            </Col>
          </Row>
          <InputWithTopLabel item="email" itemData={email} personalData={personalData} setPersonalData={setPersonalData}/>
          <InputWithTopLabel item="phoneNumber" itemData={phoneNumber} personalData={personalData} setPersonalData={setPersonalData}/>
          <DatePickerWithTopLabel item="dateOfBirth" itemData={dateOfBirth} personalData={personalData} setPersonalData={setPersonalData}/>
          <RadioGroupWithTopLabel item="sex" itemData={sex} personalData={personalData} setPersonalData={setPersonalData}/>
        </div>
        <div className="profileWrapper">
          <InputWithTopLabel item="streetNumber" itemData={streetNumber} personalData={personalData} setPersonalData={setPersonalData}/>
          <Row gutter={{ xs: 8, sm: 16, md: 24 }}  style={{ marginBottom:0 }}>
            <Col span={12}>
              <InputWithTopLabel item="city" itemData={city} personalData={personalData} setPersonalData={setPersonalData}/>
            </Col>
            <Col span={12}>
              <InputWithTopLabel item="state" itemData={state} personalData={personalData} setPersonalData={setPersonalData}/>
            </Col>
            <Col span={12}>
              <InputWithTopLabel item="postalCode" itemData={postalCode} personalData={personalData} setPersonalData={setPersonalData}/>
            </Col>
            <Col span={12}>
              <AutocompleteWithTopLabel item="country" itemData={country} personalData={personalData} setPersonalData={setPersonalData}/>
            </Col>
          </Row>
        </div>
        <Row>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Save changes
            </Button>
          </Row>
      </Form>
    </div>
  );
}

export default Profile;
