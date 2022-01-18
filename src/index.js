// build 完之後使用 serve 套件開啟伺服器
// npm start 與 npm build 皆為 bundle, start => bundle development 模式 / build => bundle production 模式
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import "./index.css";

ReactDOM.render(<App />, document.getElementById("root"));
