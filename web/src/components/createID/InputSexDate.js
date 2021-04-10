import React from 'react';
import { useTranslation } from "react-i18next";

import {
  Form,
  Row,
  Col,
  Radio,
  Typography,
  DatePicker
} from "antd";
import { 

} from "@ant-design/icons";

const { Text } = Typography

const InputSexDate = props => {
  const { t } = useTranslation();

  const { dateOfBirth } = props.formData;

  const onSexChange = e => props.setFormData({ ...props.formData, "sex": e.target.value})
  const onBirthDateChange = (dateString) => props.setFormData({ ...props.formData, "dateOfBirth": dateString })

  return (
    <>
      <Row>
        <Text>{t("general.dateOfBirth")}</Text>
        <Form.Item
          style={{ width:"100%" }}
          name="birthDate" 
          rules={[
            {
              required: true,
              message: t("messages.dateOfBirth")
            }
          ]}
        >
          <DatePicker
            name="dateOfBirth"
            placeholder={t("general.dateOfBirth")}
            format="DD/MM/YYYY"
            style={{ width:"100%" }}
            value={dateOfBirth}
            showToday={false}
            onChange={value => onBirthDateChange(value)}
            inputReadOnly={true}
          />
        </Form.Item>
      </Row>
      <Row>
        <Col span={24}>
          <Text>{t("general.sex")}</Text>
        </Col>
        <Form.Item>
          <Radio.Group onChange={onSexChange} value={props.formData.sex}>
            <Radio value="female">{t("general.female")}</Radio>
            <Radio value="male">{t("general.male")}</Radio>
          </Radio.Group>
        </Form.Item>
      </Row>
    </>
  );
}

export default InputSexDate;
