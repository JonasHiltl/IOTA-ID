import React from 'react';
import { useTranslation } from "react-i18next";
import moment from 'moment';

import {
  DatePicker,
  Typography,
  Form
} from "antd";

const { Text } = Typography;

const DatePickerWithTopLabel = props => {
  const { t } = useTranslation();
  
  const onBirthDateChange = (value) => props.setPersonalData({ ...props.personalData, "dateOfBirth": value})

  return (
    <div>
      <Text>{t(`general.${props.item}`)}</Text>
      <Form.Item
        name={`formitem.${props.item}`}
        initialValue={moment(props.itemData)}
        rules={[
          { 
            required: true,
            message: t(`messages.${props.item}`)
          }
        ]}
      >
        <DatePicker
          name="dateOfBirth"
          placeholder={t("general.dateOfBirth")}
          format="DD/MM/YYYY"
          style={{ width:"100%" }}
          value={moment(props.itemData)}
          //showToday={false}
          onChange={(value) => onBirthDateChange(value)}
          showToday={false}
          allowClear={false}
          inputReadOnly={true}
        />
      </Form.Item>
    </div>
  );
}

export default DatePickerWithTopLabel;
