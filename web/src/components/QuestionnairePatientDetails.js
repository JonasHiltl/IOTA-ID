import React from 'react';
import { useTranslation } from "react-i18next";
import { 
  Row, 
  Col,
  Typography
} from 'antd';

const { Text } = Typography;

const QuestionnairePatientDetails = props => {
  const { t } = useTranslation();

  const { firstName, lastName, dateOfBirth, sex, streetNumber, city, state, postalCode, country, phoneNumber, email } = props.personalData
  const splittedBirthDate = dateOfBirth.split("T")
  const formattedBirthData = splittedBirthDate[0].split("-")

  return (
    <div style={{ backgroundColor:"#F6F8FC", padding:8, borderRadius:8, border:"1px dashed #D1D1D1" }}>
      <Row style={{ marginBottom:8 }}>
        <Col span={12}>
          <Col>
            <Text type="secondary" strong>{t("general.name")}</Text>
          </Col>
          <Text>{firstName} {lastName}</Text>
        </Col>
        <Col span={12}>
          <Col>
            <Text type="secondary" strong>{t("general.dateOfBirth")}</Text>
          </Col>
          <Text>{`${formattedBirthData[2]}/${formattedBirthData[1]}/${formattedBirthData[0]}`}</Text>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Row>
            <div style={{ marginRight:16 }}>
              <Col>
                <Text type="secondary" strong>{t("general.phoneNumber")}</Text>
              </Col>
              <Text>{phoneNumber}</Text>
            </div>
            <div>
              <Col>
                <Text type="secondary" strong>{t("general.email")}</Text>
              </Col>
              <Text>{email}</Text>
            </div>
          </Row>
        </Col>
        <Col span={12}>
          <Col>
            <Text type="secondary" strong>{t("general.residence")}</Text>
          </Col>
          <Text>{`${streetNumber}, ${postalCode} ${city} ${state} ${country}`}</Text>
        </Col>
      </Row>
    </div>
  );
}

export default QuestionnairePatientDetails;
