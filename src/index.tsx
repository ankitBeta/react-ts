import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import Loader from "./components/common/Loader";
const App = React.lazy(() => import("./components/app/App"));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
