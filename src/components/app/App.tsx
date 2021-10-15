import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../reducers";
import { getMasterState } from "../../store/providers/request";

import { requestUsers } from '../../store/createEndPoint';

function App() {
  const dispatch = useDispatch();

  const [origins] = useSelector((state: AppState) => [getMasterState(state.users)])

  const onClickHandle = () => {
    dispatch(requestUsers.signUp({
      body: {
        userName: "Ankit", firstName: "Ankit", email: "ankit@gmail.com", password: "123456"
      }, params: { hi: "Hi Ankit" }
    }));
  }

  return (
    <div className="App">
      <header className="App-header">{origins.doc && origins.doc.name}</header>
      <button onClick={onClickHandle}>Get</button>
    </div>
  );
}

export default App;
