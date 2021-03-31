import React from 'react';
import { useTranslation } from "react-i18next";

import { 
  Modal,
  Button
} from 'antd';
import {
  ExclamationCircleOutlined 
} from '@ant-design/icons';


const { confirm } = Modal;


const ConfirmModal = props => {
  const { t } = useTranslation();

  //const { firstName, lastName, dateOfBirth, sex, streetNumber, city, state, postalCode, country, phoneNumber, email } = props.personalData

  function showConfirm() {
    confirm({
      title: t("patientQuestionnaire.modalTitle"),
      icon: <ExclamationCircleOutlined />,
      content: t("patientQuestionnaire.modalDisc"),
      okText: t("general.confirm"),
      onOk() {
        console.log("Personal Data", props.personalData);
        console.log("Allergy Data", props.allergyData);
        console.log("Medication Data", props.medicationData);
      },
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
