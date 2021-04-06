import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { DateTime } from "luxon";

import { 
  Button,
  Row,
  Col,
  Tag
} from "antd";
import {
  PlusOutlined
} from "@ant-design/icons";

const PatientQuestionnaire = () => {
  const patientQuestionnaire = useSelector(state => state.patientQuestionnaire);

  return (
    <div className="patientQuestionaire">
      {patientQuestionnaire.map((item, i) => (
        <Row key={i}>
          <Col key={i}>
            <Tag key={i} color="success">{moment(item.created).format("DD MMM YYYY")}</Tag>
          </Col>
        </Row>
      ))}
      <Link to="/patient-questionnaire/create">
        <Button type="primary" shape="circle" size="large" icon={<PlusOutlined />}/>
      </Link>
    </div>
  );
}

export default PatientQuestionnaire;
