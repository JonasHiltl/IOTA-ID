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

  const send = async () => {
    try {
      props.setIsLoading(true)
      const res = await axios.post("http://localhost:3001/patient-questionnaire/create", {
        personalData: props.personalData,
        allergyData: props.allergyData,
        medicationData: props.medicationData,
        language: i18n.language
      })
      if (res.data.success) {
        message.success(res.data.message);
        props.setSuccessfullyCreated(true)
      } else {
        message.error(res.data.message);
        props.setSuccessfullyCreated(false)
      }
      props.setIsLoading(false)
    } catch (error) {
      message.error("Server error");
      props.setIsLoading(false)
    }
  }


  function showConfirm() {
    confirm({
      title: t("patientQuestionnaire.modalTitle"),
      icon: <ExclamationCircleOutlined />,
      content: t("patientQuestionnaire.modalDisc"),
      okText: t("general.confirm"),
      okButtonProps: {loading:props.isLoading},
      onOk() {send()},
      onCancel() {
        console.log('Cancel');
      },
      
    });
  }

  return (
    <Button type="primary" onClick={showConfirm} loading={props.isLoading}>{t("general.done")}</Button>
  );
}

export default ConfirmModal;
