import React from 'react';
import { useTranslation } from "react-i18next";
import i18n from 'i18next';
import { DateTime } from "luxon";

import { 
  Row, 
  Col,
  Typography
} from 'antd';

const { Text } = Typography;

const QuestionnairePatientDetails = props => {
  const { t } = useTranslation();

  const { firstName, lastName, dateOfBirth, sex, streetNumber, city, state, postalCode, country, phoneNumber, email } = props.personalData

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
          <Row>
            <div style={{ marginRight:16 }}>
              <Col>
                <Text type="secondary" strong>{t("general.dateOfBirth")}</Text>
              </Col>
              <Text>{DateTime.fromISO(dateOfBirth).toFormat("DD")}</Text>
            </div>
            <div>
              <Col>
                <Text type="secondary" strong>{t("general.sex")}</Text>
              </Col>
              <Text>
                { sex === "male" ?
                  t("general.male")
                  :
                  t("general.female")
                }
              </Text>
            </div>
          </Row>
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
