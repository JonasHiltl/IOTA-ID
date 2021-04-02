import React from 'react';
import { useTranslation } from "react-i18next";

import {
  Input,
  Typography,
  Form,
  Image
} from "antd";

const { Text } = Typography;

const InputWithTopLabel = props => {
  const onChange = e => props.setPersonalData({ ...props.personalData, [e.target.name]: e.target.value })

  const { t } = useTranslation();
  return (
    <div>
      <Text>{t(`general.${props.item}`)}</Text>
      <Form.Item
        name={`formitem.${props.item}`}
        rules={[
          { 
            required: true,
            message: t(`messages.${props.item}`)
          },
          props.item === "email" &&
            {
              type: "email",
              message: t("messages.invalidEmail")
            }
        ]}
      >
        <Input
          name={props.item}
          defaultValue={props.itemData}
          placeholder={t(`general.${props.item}`)}
          onChange={e => onChange(e)}
        />
      </Form.Item>
    </div>
  );
}

export default InputWithTopLabel;
