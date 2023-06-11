import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { Provider } from "react-redux"
import reducerStore from "./ReducerStore";
// import reducerStore from "./ReducerStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={reducerStore}>
    {" "}
    <App />
  </Provider>
);
