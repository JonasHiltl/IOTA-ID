import React from 'react';
import { useTranslation } from "react-i18next";

import {
  Input,
  AutoComplete,
  Typography,
  Form,
  Image
} from "antd";
import countries from "../pages/countries.json"

const { Text } = Typography;

const AutocompleteWithTopLabel = props => {
  const { t } = useTranslation();
  
  const onCountryChange = (value) => props.setPersonalData({ ...props.personalData, "country": value})

  const image = props.itemData.split(" ")
  const imageSrc = image.join("")
  return (
    <div>
      <Text>{t(`general.${props.item}`)}</Text>
      <Form.Item
        name={`formitem.${props.item}`}
        initialValue={props.itemData}
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
        <AutoComplete
          options={countries}
          filterOption={true}
          onChange={onCountryChange}
          //value={props.itemData}
          defaultValue={props.itemData}
        >
          <Input
            name={props.item}
            value={props.itemData}
            prefix={<Image width={22} preview={false} src={`country-flags/svg/${imageSrc}.svg`}/>}
            autocomplete="new-password"
            allowClear={true}
          />
        </AutoComplete>
      </Form.Item>
    </div>
  );
}

export default AutocompleteWithTopLabel;
