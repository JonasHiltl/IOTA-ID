import React from 'react';
import { useSelector } from "react-redux";
import { DateTime } from "luxon";
import i18n from 'i18next';
import { Link as LinkRedux } from "react-router-dom";

import { 
  Button,
  Row,
  Col,
  Tag,
  Typography,
  Empty
} from "antd";
import {
  PlusOutlined,
  FileDoneOutlined
} from "@ant-design/icons";

const { Text, Link } = Typography

const PatientQuestionnaire = () => {
  const patientQuestionnaire = useSelector(state => state.patientQuestionnaire);

  console.log(patientQuestionnaire)

  return (
    <div className="patientQuestionaire">
      { patientQuestionnaire.lenght < 0 &&
        <Empty/>
      }
      {patientQuestionnaire.map((item, i) => (
        <Row key={i} style={{ backgroundColor:"white", padding:8 }}>
          <Col  key={i} xs={24} md={8}>
            <Link href={item.publicFleekUrl} target="_blank" ellipsis={true}><FileDoneOutlined style={{ marginRight:8 }}/>{item.ipfs}</Link>
          </Col>
          <Col key={i} xs={12} md={8}>
            <Tag color="success">{JSON.stringify(item.size).charAt(0)} KB</Tag>
          </Col>
          <Col key={i} xs={12} md={8}>
            <Text>{DateTime.fromISO(item.created).setLocale(i18n.language).toFormat("DD")}</Text>
          </Col>
        </Row>
      ))}
      <LinkRedux to="/patient-questionnaire/create">
        <Button type="primary" shape="circle" size="large" icon={<PlusOutlined />}/>
      </LinkRedux>
    </div>
  );
}

export default PatientQuestionnaire;
