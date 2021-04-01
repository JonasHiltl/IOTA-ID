import React from 'react';
import { useTranslation } from "react-i18next";
import moment from 'moment';

import {
  Radio,
  Typography,
  Form
} from "antd";

const { Text } = Typography;

const DatePickerWithTopLabel = props => {
  const { t } = useTranslation();
  const onSexChange = e => props.setPersonalData({ ...props.personalData, "sex": e.target.value})

  return (
    <div>
      <Text>{t(`general.${props.item}`)}</Text>
      <Form.Item
        //name={`formitem.${props.item}`}
        rules={[
          { 
            required: true,
            message: t(`messages.${props.item}`)
          }
        ]}
      >
        <Radio.Group onChange={onSexChange} value={props.itemData}>
          <Radio value="female">{t("general.female")}</Radio>
          <Radio value="male">{t("general.male")}</Radio>
        </Radio.Group>
      </Form.Item>
    </div>
  );
}

export default DatePickerWithTopLabel;
