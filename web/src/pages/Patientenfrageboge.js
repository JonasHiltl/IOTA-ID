import { React, useState, useEffect } from "react";
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
  Card,
  Space
} from "antd";
import {
  QuestionCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined
} from "@ant-design/icons";
import "./Patientenfragebogen.css"

const { Step } = Steps;
const { Text, Title } = Typography;

function Patientenfragebogen() {
	const { t } = useTranslation();
	const [current, setCurrent] = useState(0);
  const [allergyData, setAllergyData] = useState({});
  const [reactionData, setReactionData] = useState({});
  const [, setRerender] = useState();
  const isXs = useMediaQuery({ minWidth: 480 })
  const isSm = useMediaQuery({ minWidth: 576 })
  const isMd = useMediaQuery({ minWidth: 768 })
  const isLg = useMediaQuery({ minWidth: 992 })
  const isXl = useMediaQuery({ minWidth: 1200 })
  const isXxl = useMediaQuery({ minWidth: 1600 })
	
	const onChange = current => {
		console.log("onChange:", current);
		setCurrent(current);
	};

	const increment = () => {
		setCurrent(current + 1)
		console.log("onChange:", current);
	};

	const decrement = () => {
		setCurrent(current - 1)
		console.log("onChange:", current);
	};

	const isDisabled = current === 0

  const credentialTip = <span>Edit <Link to="/#" style={{ color:"white", textDecoration:"underline" }}>credentials</Link> to change Information</span>;

  const onFinish = values  => {
    console.log(values);
  };

  const allergyInput = e => setAllergyData({ ...allergyData, [e.target.name]: e.target.value})

  const reactionInput = e => setReactionData({ ...reactionData, [e.target.name]: e.target.value})
 
  const setAllergyAndReactions = (field) => {
    const newAllergyData = allergyData;
    delete newAllergyData[field.fieldKey];
    setAllergyData(newAllergyData);
    const newReactionData = reactionData;
    delete newReactionData[field.fieldKey];
    setReactionData(newReactionData);
    console.log("New Reaction data", reactionData)
    setRerender({});
    console.log("Re-render")
  }

  return(
		<div  style={{ padding:"20px", minHeight:"calc(100vh - 54px)", position:"relative" }}>
			<Steps current={current} onChange={onChange} direction="horizontal">
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
            <Col className="gutter-row" xs={24} md={12}>
              <Text>{t("general.firstName")}</Text>
              <Tooltip placement="top" title={credentialTip}>
                <QuestionCircleOutlined style={{ fontSize:12 }}/>
              </Tooltip>
              <Input value="Jonas" disabled/>
            </Col>
            <Col className="gutter-row" xs={24} md={12}>
              <Text>{t("general.lastName")}</Text>
              <Input value="Hiltl" disabled/>
            </Col>
            <Col className="gutter-row" xs={24} md={12}>
                <div><Text>{t("general.birthday")}</Text></div>
                <DatePicker defaultValue={moment("19/03/2003", "DD/MM/YYYY")} format="DD/MM/YYYY" style={{backgroundColor:"none"}} disabled/>
            </Col>
            <Col className="gutter-row" xs={24} md={12}>
              <div><Text>{t("general.gender")}</Text></div>
              <Radio.Group name="radiogroup" defaultValue="männlich" disabled>
                <Radio value="männlich" name="männlich">männlich</Radio>
                <Radio value="weiblich" name="weiblich">weiblich</Radio>
              </Radio.Group>
            </Col>
            <Col className="gutter-row" xs={24} md={12}>
              <Text>{t("general.residence")}</Text>
              <Input value="Schuldorffstraße 10, 21029 Hamburg Deutschland" disabled/>
            </Col>
            <Col className="gutter-row" xs={24} md={12}>
              <Text>{t("general.phoneNumber")}</Text>
              <Input value="0176 36949666" disabled/>
            </Col>
            <Col className="gutter-row" xs={24} md={12}>
              <Text>{t("general.email")}</Text>
              <Input value="jonashiltl@gmx.net" disabled/>
            </Col>
          </Row>
        </>
			}
			{current === 1 &&
        <>
          <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Form.List name="allergies">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Space key={field.key} style={{ display: 'flex' }} align="baseline">
                      <Form.Item
                        {...field}
                        name={[field.name, 'allergy']}
                        fieldKey={[field.fieldKey, 'allergy']}
                        rules={[{ required: true, message: 'Missing allergy' }]}
                        style={{ width: "100%" }}
                      >
                        <Input
                          placeholder="Allergy" 
                          onChange={e => allergyInput(e)}
                          // set name as fieldKey so that state and visual fields don't get out of context after deleting a field visually
                          name={[field.fieldKey]}
                        />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'reaction']}
                        fieldKey={[field.fieldKey, 'reaction']}
                        rules={[{ required: true, message: 'Missing reaction' }]}
                        style={{ width: "100%" }}
                      >
                        <Input 
                          placeholder="Reaction" 
                          onChange={e => reactionInput(e)}
                          name={[field.fieldKey]}
                        />
                      </Form.Item>
                      <MinusCircleOutlined onClick={async () => {remove(field.name); await setAllergyAndReactions(field)}}/>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          { Object.keys(allergyData).length === 0 &&
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No allergies added"/>
          }
          { Object.keys(allergyData).length > 0 &&
            <>
              <Card title="Allergies">
                {Object.keys(allergyData).map(allergy => (
                  <p key={allergy}>{allergyData[allergy]}</p>
                ))}
              </Card>
              <Card title="Reactions">
                {Object.keys(reactionData).map(reaction => (
                  <p key={reaction}>{reactionData[reaction]}</p>
                ))}
              </Card>
            </>
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
				<Button disabled={isDisabled} onClick={decrement} style={{ marginLeft:"8px" }} >{t("patientenfragebogen.previous")}</Button>
			</div>
		</div>
  );
}
 
export default Patientenfragebogen;