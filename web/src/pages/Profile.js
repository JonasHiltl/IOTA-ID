import { React, useState } from 'react';
import { useSelector } from "react-redux";

import {
  Row,
  Col,
  Form
} from "antd";
import "./profile.css"
import InputWithTopLabel from "../components/InputWithTopLabel"
import DatePickerWithTopLabel from "../components/DatePickerWithTopLabel"
import RadioGroupWithTopLabel from "../components/RadioGroupWithTopLabel"

const Profile = () => {
  const [personalData, setPersonalData] = useState({
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
  const { firstName, lastName, dateOfBirth, sex, streetNumber, city, state, postalCode, country, phoneNumber, email } = personalData

  return (
    <div className="profile">
      <div className="profileWrapper">
        <Form>
          <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
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
          <InputWithTopLabel item="streetNumber" itemData={streetNumber} personalData={personalData} setPersonalData={setPersonalData}/>
          <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
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
              <InputWithTopLabel item="country" itemData={country} personalData={personalData} setPersonalData={setPersonalData}/>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default Profile;
