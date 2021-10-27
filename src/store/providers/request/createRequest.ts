import { combineReducers, Reducer } from 'redux';
import { reduce } from 'lodash';
import { params as paramsReducer, items as itemsReducer } from './requestReducer';
import { masterApiFetch } from './requestAction';

import {
  IRequestReducers, RequestItemsReducer, IRequestAction,
  RequestInfoReducer, IRequestAttributes, IActionCreator, IRequestConfig
} from ".";

export const onlyForEndpoint = (uniqueKey: string, reducer: any) => (state = {}, action: any = {}) => {
  return ((action.payload || {}).meta || {}).uniqueKey === uniqueKey ? reducer(state, action) : state;
}

export const getMasterActionCreators = <Type>(uniqueKey: string, listObj: Type): IActionCreator<Type> => {
  // const actionCreator: IActionCreator<Type> = {}
  // for(let key in listObj) {
  //   actionCreator[key] = (payload: IMasterApiAttributes) => masterApiFetch.request(uniqueKey, listObj[key], payload);
  // }
  // return actionCreator;
  // @ts-ignore
  return reduce(listObj, (result, attributes: IRequestConfig, key: keyof Type) => {
    result[key] = (payload: IRequestAttributes) => masterApiFetch.request({
      meta: {
        uniqueKey,
        keys: attributes
      },
      attributes: payload
    });
    return result;
  }, {} as IActionCreator<Type>);
}

export const master = <Type>(
  items: Reducer<RequestItemsReducer, any>,
  info: Reducer<RequestInfoReducer, IRequestAction>,
  requestMasterActionCreators: IActionCreator<Type>): IActionCreator<Type> & IRequestReducers => ({
    reducers: combineReducers({
      info,
      items,
    }),
    ...requestMasterActionCreators
  })

export const createMasterApi = <Type>(uniqueKey: string, keys: Type) => {
  const params = onlyForEndpoint(uniqueKey, paramsReducer);
  const items = onlyForEndpoint(uniqueKey, itemsReducer);
  const masterActionCreators = getMasterActionCreators<Type>(uniqueKey, keys)

  return master<Type>(items, params, masterActionCreators);
}
