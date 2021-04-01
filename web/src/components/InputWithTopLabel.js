import React from 'react';
import { useTranslation } from "react-i18next";

import {
  Input,
  Typography,
  Form
} from "antd";

const { Text } = Typography;

const InputWithTopLabel = props => {
  const onChange = e => props.setPersonalData({ ...props.personalData, [e.target.name]: e.target.value }); console.log(props.personalData)

  const { t } = useTranslation();
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
        <Input
          name={props.item}
          value={props.itemData}
          placeholder={t(`general.${props.item}`)}
          onChange={e => onChange(e)}
        />
      </Form.Item>
    </div>
  );
}

export default InputWithTopLabel;
