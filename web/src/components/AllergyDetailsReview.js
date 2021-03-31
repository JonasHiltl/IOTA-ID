import React from 'react';
import { useTranslation } from "react-i18next";
import { 
  Typography,
  Empty,
  Table
} from 'antd';

const { Title } = Typography;
const { Column } = Table;

const AllergyDetailsReview = props => {
  const { t } = useTranslation();
  console.log(props.allergyData)
  return (
    <div style={{ padding:8 }}>
      <Title level={3}>{t("patientQuestionnaire.yourAllergies")}</Title>
      {props.allergyData.length === 0 ?
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t("patientQuestionnaire.noAllergiesAdded")}/>
      :
        <Table dataSource={props.allergyData} pagination={{ pageSize: 4 }}>
          <Column ellipsis title={t("patientQuestionnaire.allergy")} dataIndex="allergy" key="allergy" />
          <Column ellipsis title={t("patientQuestionnaire.symptoms")} dataIndex="symptoms" key="symptoms" />
        </Table>
      }
    </div>
  );
}

export default AllergyDetailsReview;
