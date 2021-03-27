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
  const isXs = useMediaQuery({ minWidth: 480 })
  const isSm = useMediaQuery({ minWidth: 576 })
  const isMd = useMediaQuery({ minWidth: 768 })
  const isLg = useMediaQuery({ minWidth: 992 })
  const isXl = useMediaQuery({ minWidth: 1200 })
  const isXxl = useMediaQuery({ minWidth: 1600 })
	const { t } = useTranslation();
	const [current, setCurrent] = useState(0);
  const [index, setIndex] = useState(0)
  const [, setRerender] = useState();
  const [addedAlergyData, setAddedAlergyData] = useState({})
  const [addedMedicationData, setAddedMedicationData] = useState({})

  const [allergyFormData, setAllergyFormData] = useState({
    allergy: "",
    symptoms: ""
  })
  const [medicationFormData, setMedicationFormData] = useState({
    medication: "",
    condition: "",
    frequency: "",
    dosis: ""
  })

  const { allergy, symptoms } = allergyFormData;
  const { medication, condition, frequency, dosis } = medicationFormData;

  const addInputsToAllergyList = () => {
    setIndex(index + 1)
    setAddedAlergyData({ ...addedAlergyData, [index]:allergyFormData});
    setAllergyFormData({
      allergy: "",
      symptoms: ""
    })
  }

  const addInputsToMedicationList = () => {
    setIndex(index + 1)
    setAddedMedicationData({ ...addedMedicationData, [index]:medicationFormData});
    setMedicationFormData({
      medication: "",
      condition: "",
      frequency: "",
      dosis: ""
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

  const addAllergyIsEnabled = allergy.length > 0 && symptoms.length > 0;
  const addMedicationIsEnabled = medication.length > 0 && condition.length > 0 && frequency.length > 0 && dosis.length > 0;

	const isDisabled = current === 0;

  const credentialTip = <span>Edit <Link to="/#" style={{ color:"white", textDecoration:"underline" }}>credentials</Link> to change Information</span>;

  const changeAllergyFormData = e => setAllergyFormData({ ...allergyFormData, [e.target.name]: e.target.value})
  const changeMedicationFormData = e => setMedicationFormData({ ...medicationFormData, [e.target.name]: e.target.value})

  const deleteAllergyItem = item => {
    const newAddedData = addedAlergyData;
    delete newAddedData[item];
    setAddedAlergyData(newAddedData)
    setRerender({})
  }

  const deleteMedicationItem = item => {
    const newAddedData = addedMedicationData;
    delete newAddedData[item];
    setAddedMedicationData(newAddedData)
    setRerender({})
  }

  return(
		<div className="patientQuestionaire">
			<Steps current={current} onChange={onStepChange} direction="horizontal">
        <Step
          title={t("patientQuestionnaire.Step1Header")}
          description={isMd && t("patientQuestionnaire.Step1Description")}>
        </Step>
        <Step
          title={t("patientQuestionnaire.Step2Header")}
          description={isMd && t("patientQuestionnaire.Step2Description")}>
        </Step>
        <Step
          title={t("patientQuestionnaire.Step3Header")}
          description={isMd && t("patientQuestionnaire.Step3Description")}>
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
                  <Text>{t("patientQuestionnaire.allergy")}</Text>
                  <Input
                    name="allergy"
                    value={allergy}
                    placeholder={t("patientQuestionnaire.examplePollen")}
                    onChange={e => changeAllergyFormData(e)}
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" xs={24} md={12}>
                <Form.Item>
                  <Text>{t("patientQuestionnaire.symptoms")}</Text>
                  <Input
                    name="symptoms"
                    value={symptoms}
                    placeholder={t("patientQuestionnaire.exampleSneezing")}
                    onChange={e => changeAllergyFormData(e)}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button type="dashed" disabled={!addAllergyIsEnabled} block htmlType="submit" onClick={addInputsToAllergyList} icon={<PlusOutlined/>}>
                    {t("patientQuestionnaire.addAllergy")}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          { Object.keys(addedAlergyData).length === 0 &&
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t("patientQuestionnaire.noAllergiesAdded")}/>
          }
          { Object.keys(addedAlergyData).length > 0 &&
            <Row gutter={8}>
              <Col className="gutter-row" span={24}>
                <Card title={t("patientQuestionnaire.yourAllergies")}>
                  <Row>
                    <Col span={12}>
                      <Text strong>{t("patientQuestionnaire.allergy")}:</Text>
                    </Col>
                    <Col span={12}>
                      <Text strong>{t("patientQuestionnaire.symptoms")}:</Text>
                    </Col>
                  </Row>
                  {Object.keys(addedAlergyData).map(item => (
                    <Row key={item} style={{ marginBottom:8 }}>
                      <Col span={12}>
                        <Text key={`allergy-${item}`}>{addedAlergyData[item].allergy}</Text>
                      </Col>
                      <Col span={12} style={{ justifyContent:"space-between", display:"flex", alignItems:"center"}}>
                        <Text key={`reaction-${item}`} ellipsis={true}>{addedAlergyData[item].symptoms}</Text>
                        <Tooltip title={t("toolTip.removeAllergy")}>
                          <MinusCircleOutlined style={{ cursor:"pointer"}} onClick={ () => deleteAllergyItem(item)}/>
                        </Tooltip>
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
				<>
          <Form name="Medication">
            <Row gutter={{ xs: 8, sm: 16 }}>
              <Col className="gutter-row" xs={24} md={6}>
                <Form.Item>
                  <Text>{t("patientQuestionnaire.Step3Header")}</Text>
                  <Input
                    name="medication"  
                    value={medication}
                    placeholder={t("patientQuestionnaire.exampleAspirin")}
                    onChange={e => changeMedicationFormData(e)}
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" xs={24} md={6}>
                <Form.Item>
                  <Text>{t("patientQuestionnaire.condition")}</Text>
                  <Input
                    name="condition"
                    value={condition}
                    placeholder={t("patientQuestionnaire.exampleHeadaches")}
                    onChange={e => changeMedicationFormData(e)}
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" xs={24} md={6}>
                <Form.Item>
                  <Text>{t("patientQuestionnaire.frequency")}y</Text>
                  <Input
                    name="frequency"
                    value={frequency}
                    placeholder={t("patientQuestionnaire.exampleOnceDaily")}
                    onChange={e => changeMedicationFormData(e)}
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" xs={24} md={6}>
                <Form.Item>
                  <Text>{t("patientQuestionnaire.dose")}</Text>
                  <Input
                    name="dosis"
                    value={dosis}
                    placeholder={t("patientQuestionnaire.example75mg")}
                    onChange={e => changeMedicationFormData(e)}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button type="dashed" disabled={!addMedicationIsEnabled} block htmlType="submit" onClick={addInputsToMedicationList} icon={<PlusOutlined/>}>
                    {t("patientQuestionnaire.addMedication")}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          { Object.keys(addedMedicationData).length === 0 &&
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t("patientQuestionnaire.noMedicationAdded")}/>
          }
          { Object.keys(addedMedicationData).length > 0 &&
            <Row gutter={8}>
              <Col className="gutter-row" span={24}>
                <Card title={t("patientQuestionnaire.yourMedication")}>
                  <Row>
                    <Col span={6}>
                      <Text strong>{t("patientQuestionnaire.medication")}:</Text>
                    </Col>
                    <Col span={6}>
                      <Text strong>{t("patientQuestionnaire.condition")}:</Text>
                    </Col>
                    <Col span={6}>
                      <Text strong>{t("patientQuestionnaire.frequency")}:</Text>
                    </Col>
                    <Col span={6}>
                      <Text strong>{t("patientQuestionnaire.dose")}:</Text>
                    </Col>
                  </Row>
                  {Object.keys(addedMedicationData).map(item => (
                    <Row key={item} style={{ marginBottom:8 }}>
                      <Col span={6}>
                        <Text key={`allergy-${item}`}>{addedMedicationData[item].medication}</Text>
                      </Col>
                      <Col span={6}>
                        <Text key={`reaction-${item}`}>{addedMedicationData[item].condition}</Text>
                      </Col>
                      <Col span={6}>
                        <Text key={`reaction-${item}`}>{addedMedicationData[item].frequency}</Text>
                      </Col>
                      <Col span={6} style={{ justifyContent:"space-between", display:"flex", alignItems:"center"}}>
                        <Text key={`reaction-${item}`}  ellipsis={true}>{addedMedicationData[item].dosis}</Text>
                        <Tooltip title={t("toolTip.removeMedication")}>
                          <MinusCircleOutlined style={{ cursor:"pointer"}} onClick={ () => deleteMedicationItem(item)}/>
                        </Tooltip>
                      </Col>
                    </Row>
                  ))}
                </Card>
              </Col>
            </Row>
          }
        </>
			}
			</div>
			<div style={{ display:"flex", marginTop:"20px" }}>
				{current === 2 ?
					<Button type="primary" onClick={() => {console.log("Allergies", addedAlergyData); console.log("Medication", addedMedicationData)}}>{t("patientQuestionnaire.done")}</Button>
					:
					<Button type="primary" onClick={increment}>{t("patientQuestionnaire.next")}</Button>
				}
				<Button disabled={isDisabled} onClick={decrement} style={{ marginLeft:"8px" }}>{t("patientQuestionnaire.previous")}</Button>
			</div>
		</div>
  );
}
 
export default Patientenfragebogen;