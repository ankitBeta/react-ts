import { SagaIterator } from "redux-saga";
import { fork, all } from "redux-saga/effects";

import { watchMasterApiEvent } from "../providers/request";

export default function* root(): SagaIterator {
  yield all([
    fork(watchMasterApiEvent),
  ]);
};
