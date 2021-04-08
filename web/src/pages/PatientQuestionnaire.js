import React, {useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useTranslation, Trans } from "react-i18next";
import { Link as LinkRedux } from "react-router-dom";
import Localbase from "localbase";

import {  loadPatientQuestionnaire } from "../store/actions/auth";

import { 
  Button,
  Typography,
  Empty,
  List,
  Card,
  Popconfirm,
  Tag
} from "antd";
import {
  PlusOutlined,
  FileDoneOutlined,
  EllipsisOutlined,
  DeleteOutlined
} from "@ant-design/icons";

const { Link } = Typography

const PatientQuestionnaire = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const patientQuestionnaire = useSelector(state => state.patientQuestionnaire);
  const [isLoading, setIsLoading] = useState(false)

  const deleteQuestionnaire = async item => {
    setIsLoading(true)
    let db = new Localbase("db")
    await db.collection('patientQuestionnaire').doc(item).delete()
    const patientQuestionnaire = await db.collection("patientQuestionnaire").get();
    dispatch(loadPatientQuestionnaire(patientQuestionnaire))
    setIsLoading(false)
  }

  return (
    <div className="patientQuestionaire">
      { patientQuestionnaire.length < 1 &&
        <Empty description={t("patientQuestionnaire.notAdded")} image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ marginBottom:0 }} />
      }
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        locale={{emptyText: " "}}
        dataSource={patientQuestionnaire}
        renderItem={(item, i)=> (
          <List.Item>
            <Card 
              title={<Link href={item.publicFleekUrl} target="_blank" ellipsis={true}><FileDoneOutlined style={{ marginRight:8 }}/>{item.ipfs}</Link>}
              actions={[
                <Tag color="success">{item.size} Bytes</Tag>,
                <Popconfirm title={t("patientQuestionnaire.deleteQuestionnairePopover")} placement="top" onConfirm={() => deleteQuestionnaire(item.ipfs)} okText="Yes" okButtonProps={{ loading: isLoading }}>
                  <DeleteOutlined  key="delete" />
                </Popconfirm>,
                <EllipsisOutlined key="ellipsis" />
              ]}
            >
              <iframe
                style={{ width:"100%", height:"200px" }}
                frameborder="0"
                title="pdf"
                src={item.publicFleekUrl}
              />
            </Card>
          </List.Item>
        )}
      />
      <LinkRedux to="/patient-questionnaire/create">
        <Button type="primary" shape="circle" size="large" icon={<PlusOutlined />}/>
      </LinkRedux>
    </div>
  );
}

export default PatientQuestionnaire;
