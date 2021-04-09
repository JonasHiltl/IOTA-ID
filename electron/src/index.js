import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import './i18n';
import "./index.css";
import reducer from "./store/reducers/auth";
import { 
  Spin 
} from "antd";
import { 
  LoadingOutlined 
} from "@ant-design/icons";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhances(applyMiddleware(thunk)));

const antIcon = <LoadingOutlined style={{ fontSize: 45 }} spin />;

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={(<Spin indicator={antIcon} style={{ position:"absolute", top:"50%", left:"50%", transform: "translate(-50%, -50%)"}}/>)}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById("root")
);