import React from 'react';
import { useTranslation } from "react-i18next";
import { 
  Typography,
  Row,
  Col,
  Empty,
  Table
} from 'antd';
import "./MedicationDetailsReview.css"

const { Title } = Typography;
const { Column } = Table;


const MedicationDetailsReview = props => {
  const { t } = useTranslation();
  return (
    <div style={{ padding:8 }}>
      <Title level={3}>{t("patientQuestionnaire.yourMedication")}</Title>
      {props.medicationData.length === 0 ?
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t("patientQuestionnaire.noMedicationAdded")}/>
      :
        <Table dataSource={props.medicationData} pagination={{ pageSize: 4 }}>
          <Column ellipsis title={t("patientQuestionnaire.medication")} dataIndex="medication" key="medication" />
          <Column ellipsis title={t("patientQuestionnaire.condition")} dataIndex="condition" key="condition" />
          <Column ellipsis title={t("patientQuestionnaire.frequency")} dataIndex="frequency" key="frequency" />
          <Column ellipsis title={t("patientQuestionnaire.dose")} dataIndex="dosis" key="dosis" />
        </Table>
      }
    </div>
  );
}

export default MedicationDetailsReview;