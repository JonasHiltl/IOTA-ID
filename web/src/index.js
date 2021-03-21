import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';

import { 
  Spin 
} from 'antd';
import { 
  LoadingOutlined 
} from '@ant-design/icons';


const antIcon = <LoadingOutlined style={{ fontSize: 45 }} spin />;

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={(<Spin indicator={antIcon} style={{ position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)'}}/>)}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
