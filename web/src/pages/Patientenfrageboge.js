import { React, useState } from "react";

import { Steps, Button, message } from "antd";
import { useTranslation } from "react-i18next";

const { Step } = Steps;

function Patientenfragebogen() {
	const { t } = useTranslation();
	const [current, setCurrent] = useState(0);
	
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

  return(
		<div  style={{ padding:"20px", minHeight:"calc(100vh - 54px)", position:"relative" }}>
			<Steps current={current} onChange={onChange} direction="horizontal">
        <Step
          title={t("patientenfragebogen.Step1Header")}
          description={t("patientenfragebogen.Step1Description")}>
        </Step>
        <Step
          title={t("patientenfragebogen.Step2Header")}
          description={t("patientenfragebogen.Step2Description")}>
        </Step>
        <Step
          title={t("patientenfragebogen.Step3Header")}
          description={t("patientenfragebogen.Step3Description")}>
        </Step>
			</Steps>
			<div style={{ backgroundColor:"#F6F8FC", minHeight:"50vh", border:"1px dashed #D1D1D1", marginTop:"20px" }}>
			{current === 0 ? 
				<p>Test 1</p>
			:
			null
			}
			{current === 1 ? 
				<p>Test 2</p>
			:
			null
			}
			{current === 2 ? 
				<p>Test 3</p>
			:
			null
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