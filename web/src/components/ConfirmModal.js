import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import axios from "axios";
import i18n from 'i18next';
import Localbase from "localbase";

import {  loadPatientQuestionnaire } from "../store/actions/auth";

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
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const send = async () => {
    try {
      props.setIsLoading(false)
      props.setSuccessfullyCreated(undefined)
      props.setIsLoading(true)
      const res = await axios.post("http://localhost:3001/patient-questionnaire/create", {
        personalData: props.personalData,
        allergyData: props.allergyData,
        medicationData: props.medicationData,
        language: i18n.language
      })
      if (res.data.success) {
        message.success(res.data.message);
        let db = new Localbase("db")
        await db.collection("patientQuestionnaire").add({
          tangleHash: res.data.tangleHash
        })
        const patientQuestionnaire = await db.collection("patientQuestionnaire").get();
        dispatch(loadPatientQuestionnaire(patientQuestionnaire))
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
