import React from 'react';
import { useTranslation } from "react-i18next";

import countries from "../../pages/countries.json"
import {
  Form,
  Input,
  Row,
  Col,
  AutoComplete,
  Typography
} from "antd";

const { Text } = Typography

const InputAddress = props => {
  const { t } = useTranslation();

  const { streetNumber, city, state, postalCode, country } = props.formData;

  const onChange = e => props.setFormData({ ...props.formData, [e.target.name]: e.target.value }); console.log(props.formData)
  const onCountryChange = (value) => props.setFormData({ ...props.formData, "country": value})

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16 }}>
        <Col span={24}>
          <Text>{[t("general.streetNumber")]}</Text>
          <Form.Item 
            style={{ width:"100%" }}
            name="streetNumber"
            rules={[
              { 
                required: true,
                message: t("messages.streetNumber")
              }
            ]}
          >
            <Input
              name="streetNumber"
              value={streetNumber}
              placeholder={[t("general.streetNumber")]}
              allowClear
              onChange={e => onChange(e)}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Text>{[t("general.city")]}</Text>
          <Form.Item 
            style={{ width:"100%" }}
            name="city"
            rules={[
              { 
                required: true,
                message: t("messages.city")
              }
            ]}
          >
            <Input
              name="city"
              value={city}
              placeholder={[t("general.city")]}
              allowClear
              onChange={e => onChange(e)}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Text>{[t("general.state")]}</Text>
          <Form.Item 
            style={{ width:"100%" }}
            name="state"
            rules={[
              { 
                required: true,
                message: t("messages.state")
              }
            ]}
          >
            <Input
              name="state"
              value={state}
              placeholder={[t("general.state")]}
              allowClear
              onChange={e => onChange(e)}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Text>{[t("general.postalCode")]}</Text>
          <Form.Item
            name="postalCode"
            rules={[
              { 
                required: true,
                message: t("messages.postalCode")
              }
            ]}
          >
            <Input
              name="postalCode"
              value={postalCode}
              placeholder={[t("general.postalCode")]}
              allowClear
              onChange={e => onChange(e)}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Text>{[t("general.country")]}</Text>
          <Form.Item
            name="country"
            rules={[
              { 
                required: true,
                message: t("messages.country")
              }
            ]}
          >
            <AutoComplete
              options={countries}
              filterOption={true}
              onChange={onCountryChange}
              name="country"
              value={country}
              autoComplete="new-password"
            >
              <Input
                name="country"
                value={country}
                placeholder={[t("general.country")]}
                allowClear
              />
            </AutoComplete>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default InputAddress;
