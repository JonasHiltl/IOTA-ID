import { React, useState } from "react";
import moment from "moment";
import { useMediaQuery } from "react-responsive"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { 
  Steps, 
  Button, 
  message,
  Typography,
  Row,
  Col,
  DatePicker,
  Input,
  Tooltip,
  Radio,
  Form,
  Empty,
  Card
} from "antd";
import {
  QuestionCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined
} from "@ant-design/icons";
import "./Patientenfragebogen.css"

const { Step } = Steps;
const { Text } = Typography;

function Patientenfragebogen() {
	const { t } = useTranslation();
	const [current, setCurrent] = useState(0);
  const [index, setIndex] = useState(0)
  const [, setRerender] = useState();
  const isXs = useMediaQuery({ minWidth: 480 })
  const isSm = useMediaQuery({ minWidth: 576 })
  const isMd = useMediaQuery({ minWidth: 768 })
  const isLg = useMediaQuery({ minWidth: 992 })
  const isXl = useMediaQuery({ minWidth: 1200 })
  const isXxl = useMediaQuery({ minWidth: 1600 })
  const [addedData, setAddedData] = useState({})
  const [formData, setFormData] = useState({
    allergy: "",
    reaction: ""
  })
  
  const { allergy, reaction } = formData;

  const addInputsToList = () => {
    setIndex(index + 1)
    setAddedData({ ...addedData, [index]:formData});
    setFormData({
      allergy: "",
      reaction: ""
    })
  }
	
	const onStepChange = current => {
		setCurrent(current);
	};

	const increment = () => {
		setCurrent(current + 1)
	};

	const decrement = () => {
		setCurrent(current - 1)
	};

  const addIsEnabled = allergy.length > 0 && reaction.length > 0;

	const isDisabled = current === 0;

  const credentialTip = <span>Edit <Link to="/#" style={{ color:"white", textDecoration:"underline" }}>credentials</Link> to change Information</span>;

  const changeFormData = e => setFormData({ ...formData, [e.target.name]: e.target.value})

  const deleteItem = item => {
    console.log(item)
    const newAddedData = addedData;
    console.log(newAddedData)
    delete newAddedData[item];
    console.log("deleted")
    setAddedData(newAddedData)
    console.log("Added Data", addedData)
    setRerender({})
  }

  return(
		<div className="patientQuestionaire" style={{ padding:"20px", minHeight:"calc(100vh - 54px)", position:"relative" }}>
			<Steps current={current} onChange={onStepChange} direction="horizontal">
        <Step
          title={t("patientenfragebogen.Step1Header")}
          description={isMd && t("patientenfragebogen.Step1Description")}>
        </Step>
        <Step
          title={t("patientenfragebogen.Step2Header")}
          description={isMd && t("patientenfragebogen.Step2Description")}>
        </Step>
        <Step
          title={t("patientenfragebogen.Step3Header")}
          description={isMd && t("patientenfragebogen.Step3Description")}>
        </Step>
			</Steps>
			<div style={{ backgroundColor:"#fff", minHeight:"50vh", border:"1px dashed #D1D1D1", marginTop:"20px", padding:"4px", justifyContent:"space-between" }}>
			{current === 0 &&
			  <>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" xs={24} md={12} style={{ paddingBottom: 20 }}>
              <Text>{t("general.firstName")}</Text>
              <Tooltip placement="top" title={credentialTip}>
                <QuestionCircleOutlined style={{ fontSize:12 }}/>
              </Tooltip>
              <Input value="Jonas" disabled/>
            </Col>
            <Col className="gutter-row" xs={24} md={12} style={{ paddingBottom: 20 }}>
              <Text>{t("general.lastName")}</Text>
              <Input value="Hiltl" disabled/>
            </Col>
            <Col className="gutter-row" xs={24} md={12} style={{ paddingBottom: 20 }}>
                <div><Text>{t("general.birthday")}</Text></div>
                <DatePicker defaultValue={moment("19/03/2003", "DD/MM/YYYY")} format="DD/MM/YYYY" style={{backgroundColor:"none"}} disabled/>
            </Col>
            <Col className="gutter-row" xs={24} md={12} style={{ paddingBottom: 20 }}>
              <div><Text>{t("general.gender")}</Text></div>
              <Radio.Group name="radiogroup" defaultValue="männlich" disabled>
                <Radio value="männlich" name="männlich">männlich</Radio>
                <Radio value="weiblich" name="weiblich">weiblich</Radio>
              </Radio.Group>
            </Col>
            <Col className="gutter-row" xs={24} md={12} style={{ paddingBottom: 20 }}>
              <Text>{t("general.residence")}</Text>
              <Input value="Schuldorffstraße 10, 21029 Hamburg Deutschland" disabled/>
            </Col>
            <Col className="gutter-row" xs={24} md={12} style={{ paddingBottom: 20 }}>
              <Text>{t("general.phoneNumber")}</Text>
              <Input value="0176 36949666" disabled/>
            </Col>
            <Col className="gutter-row" xs={24} md={12} style={{ paddingBottom: 20 }}>
              <Text>{t("general.email")}</Text>
              <Input value="jonashiltl@gmx.net" disabled/>
            </Col>
          </Row>
        </>
			}
			{current === 1 &&
        <>
          <Form name="Allergies">
            <Row gutter={{ xs: 8, sm: 16 }}>
              <Col className="gutter-row" xs={24} md={12}>
                <Form.Item>
                  <Input
                    name="allergy"
                    value={allergy}
                    placeholder={t("patientQuestionnaire.Allergy")}
                    onChange={e => changeFormData(e)}
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" xs={24} md={12}>
                <Form.Item>
                  <Input
                    name="reaction"
                    value={reaction}
                    placeholder={t("patientQuestionnaire.Reaction")}
                    onChange={e => changeFormData(e)}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button type="dashed" disabled={!addIsEnabled} block htmlType="submit" onClick={addInputsToList} icon={<PlusOutlined/>}>
                    Add field
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          { Object.keys(addedData).length === 0 &&
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No allergies added"/>
          }
          { Object.keys(addedData).length > 0 &&
            <Row gutter={8}>
              <Col className="gutter-row" span={24}>
                <Card title={t("patientQuestionnaire.yourAllergies")}>
                  {Object.keys(addedData).map(item => (
                    <Row key={item} style={{ marginBottom:8 }}>
                      <Col span={12}>
                        <Text key={`allergy-${item}`}>{addedData[item].allergy}</Text>
                      </Col>
                      <Col span={12} style={{ justifyContent:"space-between", display:"flex", alignItems:"center"}}>
                        <Text key={`reaction-${item}`}>{addedData[item].reaction}</Text>
                        <MinusCircleOutlined style={{ cursor:"pointer"}} onClick={ () => deleteItem(item)}/>
                      </Col>
                    </Row>
                  ))}
                </Card>
              </Col>
            </Row>
          }
        </>
			}
			{current === 2 &&
				<p>Test 3</p>
			}
			</div>
			<div style={{ display:"flex", marginTop:"20px" }}>
				{current === 2 ?
					<Button type="primary">{t("patientenfragebogen.done")}</Button>
					:
					<Button type="primary" onClick={increment}>{t("patientenfragebogen.next")}</Button>
				}
				<Button disabled={isDisabled} onClick={decrement} style={{ marginLeft:"8px" }}>{t("patientenfragebogen.previous")}</Button>
			</div>
		</div>
  );
}
 
export default Patientenfragebogen;