
import { History } from "history";
import { combineReducers } from "redux";
import { reducer as reduxFormReducer, FormStateMap } from "redux-form";
import { connectRouter, RouterState } from "connected-react-router";
import { IRequestReducer } from "../store/providers/request/IRequest";
import { requestUsers } from "../store/createEndPoint";

export interface AppState {
  router: RouterState;
  form: FormStateMap;
  users: IRequestReducer;
}

function reducers(history: History) {
  return combineReducers<AppState>({
    router: connectRouter(history),
    form: reduxFormReducer,
    users: requestUsers.reducers,
  })
}

export default reducers;