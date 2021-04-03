import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import axios from "axios"
import i18n from 'i18next';

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
    try {
      setIsLoading(true)
      const res = await axios.post("http://localhost:3001/patient-questionnaire/create", {
        personalData: props.personalData,
        allergyData: props.allergyData,
        medicationData: props.medicationData,
        language: i18n.language
      })
      if (res.data.success) {
        message.success(res.data.message);
        console.log(res.data.pdf)
      } else {
        message.error(res.data.message);
      }
      setIsLoading(false)
    } catch (error) {
      message.error("Server error");
      setIsLoading(false)
    }
  }


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
