import { SagaIterator } from 'redux-saga';
import { takeEvery, put, call } from 'redux-saga/effects';
import { REQUEST_FETCH, masterApiFetch } from './requestAction';
import { fetchRequest } from "./util";
import { IRequestAction, ServerResponse } from ".";

export function* performRequestMasterOperation(action: IRequestAction): IterableIterator<{}> {
  const { payload } = action;
  try {
    const response: any = yield call(fetchRequest, payload);
    if (action.type === REQUEST_FETCH.REQUEST) {
      yield put(masterApiFetch.success({
        ...payload,
        data: response.data,
        message: response.message || "Fetched Successfully"
      }))
    } else {
      console.log("No event found.")
    }
  } catch (error) {
    if (action.type === REQUEST_FETCH.REQUEST) {
      if (error instanceof Error) {
        yield put(masterApiFetch.failure({
          ...payload,
          hasError: true,
          message: error.message
        }));
      } else {
        yield put(masterApiFetch.failure({
          ...payload,
          hasError: true,
          message: (error as ServerResponse).message,
          data: (error as ServerResponse).data
        }));
      }
    } else {
      console.log("Error No event found.")
    }
  }
}

export function* watchMasterApiEvent(): SagaIterator {
  yield takeEvery(REQUEST_FETCH.REQUEST, performRequestMasterOperation);
}
