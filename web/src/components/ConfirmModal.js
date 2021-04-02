import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import axios from "axios"

import { 
  Modal,
  Button,
  message
} from 'antd';
import {
  ExclamationCircleOutlined 
} from '@ant-design/icons';


const { confirm } = Modal;


const ConfirmModal = props => {
  const { t } = useTranslation();
  const [ isLoading, setIsLoading ] = useState(false)

  const send = async () => {
    setIsLoading(true)
    const res = await axios.post("http://localhost:3001/patient-questionnaire/create", {
      personalData: props.personalData,
      allergyData: props.allergyData,
      medicationData: props.medicationData
    })
    if (res.data.success) {
      message.success(res.data.message);
    } else {
      message.error(res.data.message);
    }
    setIsLoading(false)
  }

  console.log(isLoading)

  function showConfirm() {
    confirm({
      title: t("patientQuestionnaire.modalTitle"),
      icon: <ExclamationCircleOutlined />,
      content: t("patientQuestionnaire.modalDisc"),
      okText: t("general.confirm"),
      okButtonProps: {loading:isLoading},
      onOk() {send()},
      onCancel() {
        console.log('Cancel');
      },
      
    });
  }

  return (
    <Button type="primary" onClick={showConfirm}>{t("general.done")}</Button>
  );
}

export default ConfirmModal;
