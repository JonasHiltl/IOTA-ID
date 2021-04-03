import { React, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { useMediaQuery } from "react-responsive"
import { useTranslation, Trans } from "react-i18next";
import { Link, Redirect } from "react-router-dom";

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
import QuestionnairePatientDetails from "../components/QuestionnairePatientDetails"
import AllergyDetailsReview from "../components/AllergyDetailsReview"
import MedicationDetailsReview from "../components/MedicationDetailsReview"
import ConfirmModal from "../components/ConfirmModal"

const { Step } = Steps;
const { Text } = Typography;

function Patientenfragebogen() {
  const isMd = useMediaQuery({ minWidth: 768 })
	const { t } = useTranslation();
  const isAuthenticated = useSelector(state => state.isAuthenticated);
	const [current, setCurrent] = useState(0);
  const [, setRerender] = useState();
  const [addedAlergyData, setAddedAlergyData] = useState([])
  const [addedMedicationData, setAddedMedicationData] = useState([])
  const [personalData] = useState({
    firstName: useSelector(state => state.personalInformation.name.first),
    lastName: useSelector(state => state.personalInformation.name.last),
    dateOfBirth: useSelector(state => state.personalInformation.birthDate),
    sex: useSelector(state => state.personalInformation.sex),
    streetNumber: useSelector(state => state.personalInformation.address.street),
    city: useSelector(state => state.personalInformation.address.city),
    state: useSelector(state => state.personalInformation.address.state),
    postalCode: useSelector(state => state.personalInformation.address.postalCode),
    country: useSelector(state => state.personalInformation.address.country),
    phoneNumber: useSelector(state => state.personalInformation.phoneNumber),
    email: useSelector(state => state.personalInformation.email),
  })

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
  const { firstName, lastName, dateOfBirth, sex, streetNumber, city, state, postalCode, country, phoneNumber, email } = personalData

  const addInputsToAllergyList = () => {
    setAddedAlergyData([...addedAlergyData, allergyFormData]);
    setAllergyFormData({
      allergy: "",
      symptoms: ""
    });
    setRerender({})
  }

  const addInputsToMedicationList = () => {
    setAddedMedicationData([...addedMedicationData, medicationFormData]);
    setMedicationFormData({
      medication: "",
      condition: "",
      frequency: "",
      dosis: ""
    });
    setRerender({})
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

  const credentialTip = <span><Trans i18nKey="patientQuestionnaire.editProfile">Edit<Link to="/profile" style={{ color:"white", textDecoration:"underline" }}>credentials</Link> to change Information</Trans></span>;

  const changeAllergyFormData = e => setAllergyFormData({ ...allergyFormData, [e.target.name]: e.target.value});
  const changeMedicationFormData = e => setMedicationFormData({ ...medicationFormData, [e.target.name]: e.target.value});

  const deleteAllergyItem = item => {
    const newAddedData = addedAlergyData;
    newAddedData.splice(item, 1);
    setAddedAlergyData(newAddedData)
    setRerender({})
  }

  const deleteMedicationItem = item => {
    const newAddedData = addedMedicationData;
    newAddedData.splice(item, 1);
    setAddedMedicationData(newAddedData)
    setRerender({})
  }

  if (!isAuthenticated) {
    return <Redirect to='/signup' />
  }

  return(
    <>
      { current < 3 ?
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
                  <Input value={firstName} disabled/>
                </Col>
                <Col className="gutter-row" xs={24} md={12} style={{ paddingBottom: 20 }}>
                  <Text>{t("general.lastName")}</Text>
                  <Input value={lastName} disabled/>
                </Col>
                <Col className="gutter-row" xs={24} md={12} style={{ paddingBottom: 20 }}>
                    <div><Text>{t("general.dateOfBirth")}</Text></div>
                    <DatePicker  defaultValue={moment(dateOfBirth)} format="DD/MM/YYYY" style={{backgroundColor:"none"}} disabled/>
                </Col>
                <Col className="gutter-row" xs={24} md={12} style={{ paddingBottom: 20 }}>
                  <div><Text>{t("general.sex")}</Text></div>
                  <Radio.Group name="radiogroup" defaultValue={sex} disabled>
                    <Radio value="male" name="male">{t("general.male")}</Radio>
                    <Radio value="female" name="female">{t("general.female")}</Radio>
                  </Radio.Group>
                </Col>
                <Col className="gutter-row" xs={24} md={12} style={{ paddingBottom: 20 }}>
                  <Text>{t("general.residence")}</Text>
                  <Input value={`${streetNumber}, ${postalCode} ${city} ${state} ${country}`} disabled/>
                </Col>
                <Col className="gutter-row" xs={24} md={12} style={{ paddingBottom: 20 }}>
                  <Text>{t("general.phoneNumber")}</Text>
                  <Input value={phoneNumber} disabled/>
                </Col>
                <Col className="gutter-row" xs={24} md={12} style={{ paddingBottom: 20 }}>
                  <Text>{t("general.email")}</Text>
                  <Input value={email} disabled/>
                </Col>
              </Row>
            </>
          }
          {current === 1 &&
            <>
              <Form name="Allergies"  autocomplete="off">
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
              {addedAlergyData.length === 0 &&
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t("patientQuestionnaire.noAllergiesAdded")}/>
              }
              {addedAlergyData.length > 0 &&
                <Row gutter={8}>
                  <Col className="gutter-row" span={24}>
                    <Card title={t("patientQuestionnaire.yourAllergies")}>
                      <Row>
                        <Col span={12}>
                          <Text type="secondary" strong>{t("patientQuestionnaire.allergy")}:</Text>
                        </Col>
                        <Col span={12}>
                          <Text type="secondary" strong>{t("patientQuestionnaire.symptoms")}:</Text>
                        </Col>
                      </Row>
                      {addedAlergyData.map((item, i) => (
                        <Row key={i} style={{ marginBottom:8 }}>
                          <Col span={12}>
                            <Text key={`allergy-${i}`}>{item.allergy}</Text>
                          </Col>
                          <Col span={12} style={{ justifyContent:"space-between", display:"flex", alignItems:"center"}}>
                            <Text key={`reaction-${i}`} ellipsis={true}>{item.symptoms}</Text>
                            <Tooltip title={t("toolTip.removeAllergy")}>
                              <MinusCircleOutlined style={{ cursor:"pointer"}} onClick={ () => deleteAllergyItem(i)}/>
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
                      <Text>{t("patientQuestionnaire.frequency")}</Text>
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
              { addedMedicationData.length === 0 &&
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t("patientQuestionnaire.noMedicationAdded")}/>
              }
              { addedMedicationData.length > 0 &&
                <Row gutter={8}>
                  <Col className="gutter-row" span={24}>
                    <Card title={t("patientQuestionnaire.yourMedication")}>
                      <Row>
                        <Col span={6}>
                          <Text type="secondary" strong>{t("patientQuestionnaire.medication")}:</Text>
                        </Col>
                        <Col span={6}>
                          <Text type="secondary" strong>{t("patientQuestionnaire.condition")}:</Text>
                        </Col>
                        <Col span={6}>
                          <Text type="secondary" strong>{t("patientQuestionnaire.frequency")}:</Text>
                        </Col>
                        <Col span={6}>
                          <Text type="secondary" strong>{t("patientQuestionnaire.dose")}:</Text>
                        </Col>
                      </Row>
                      {addedMedicationData.map((item, i) => (
                        <Row key={i} style={{ marginBottom:8 }}>
                          <Col span={6}>
                            <Text key={`allergy-${i}`}>{item.medication}</Text>
                          </Col>
                          <Col span={6}>
                            <Text key={`reaction-${i}`}>{item.condition}</Text>
                          </Col>
                          <Col span={6}>
                            <Text key={`reaction-${i}`}>{item.frequency}</Text>
                          </Col>
                          <Col span={6} style={{ justifyContent:"space-between", display:"flex", alignItems:"center"}}>
                            <Text key={`reaction-${i}`}  ellipsis={true}>{item.dosis}</Text>
                            <Tooltip title={t("toolTip.removeMedication")}>
                              <MinusCircleOutlined style={{ cursor:"pointer"}} onClick={ () => deleteMedicationItem(i)}/>
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
              <Button type="primary" onClick={increment}>{t("general.review")}</Button>
              :
              <Button type="primary" onClick={increment}>{t("general.next")}</Button>
            }
            <Button disabled={isDisabled} onClick={decrement} style={{ marginLeft:"8px" }}>{t("general.previous")}</Button>
          </div>
        </div>
      :
        <div className="patientQuestionaire">
          <div style={{ backgroundColor:"#fff", minHeight:"60vh", border:"1px dashed #D1D1D1", padding:"4px", justifyContent:"space-between" }}>
            <QuestionnairePatientDetails personalData={personalData}/>
            <AllergyDetailsReview allergyData={addedAlergyData}/>
            <MedicationDetailsReview medicationData={addedMedicationData}/>
          </div>
          <div style={{ display:"flex", marginTop:"20px" }}>
            <ConfirmModal personalData={personalData} allergyData={addedAlergyData} medicationData={addedMedicationData}/>
            <Button onClick={decrement} style={{ marginLeft:"8px" }}>{t("general.previous")}</Button>
          </div>
        </div>
      }
    </>
  );
}

export default Patientenfragebogen;