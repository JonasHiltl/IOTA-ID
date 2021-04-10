import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

import {
  Typography,
  Input,
  Form,
  Row,
  Col
} from "antd";

const { Title, Text } = Typography

const InputPersonal = props => {
  const { t } = useTranslation();
  const [isLoading, setIsloading] = useState(false)

  const { firstName, lastName, email, phoneNumber } = props.formData;

  const onChange = e => props.setFormData({ ...props.formData, [e.target.name]: e.target.value }); console.log(props.formData)

  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Col  xs={24} lg={12}>
          <Text>{t("general.firstName")}</Text>
          <Form.Item
            style={{ width:"100%" }} 
              name="firstName" 
              rules={[
                { 
                  required: true,
                  message: t("messages.firstName")
                }
            ]}
          >
            <Input
              name="firstName"
              placeholder={t("signUp.firstN")}
              allowClear
              value={firstName}
              onChange={e => onChange(e)}
            />
          </Form.Item>
        </Col>
        <Col  xs={24} lg={12}>
          <Text>{t("general.lastName")}</Text>
          <Form.Item
            style={{ width:"100%" }} 
              name="lastName" 
              rules={[
                { 
                  required: true,
                  message: t("messages.lastName")
                }
            ]}
          >
            <Input
              name="lastName"
              placeholder={t("signUp.lastN")}
              allowClear
              value={lastName}
              onChange={e => onChange(e)}
            />
          </Form.Item>
        </Col>
        <Col  xs={24} lg={12}>
          <Text>{t("general.email")}</Text>
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
                  message: t("messages.email")
                }
            ]}
          >
            <Input
              name="email"
              placeholder={t("signUp.email")}
              allowClear
              value={email}
              onChange={e => onChange(e)}
            />
          </Form.Item>
        </Col>
        <Col  xs={24} lg={12}>
          <Text>{t("general.phoneNumber")}</Text>
          <Form.Item
            style={{ width:"100%" }} 
            name="phoneNumber"
            rules={[
              { 
                required: true,
                message: t("messages.phoneNumber")
              }
            ]}
          >
            <Input
              name="phoneNumber"
              placeholder={t("general.phoneNumber")}
              allowClear
              value={phoneNumber}
              onChange={e => onChange(e)}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

export default InputPersonal;
