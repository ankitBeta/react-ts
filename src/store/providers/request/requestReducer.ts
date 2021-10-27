import { REQUEST_FETCH } from './requestAction';
import { RequestInfoReducer, IRequestAction, RequestItemsReducer, IRequestMeta } from "./IRequest";

export const params = (params: RequestInfoReducer, action: IRequestAction) => {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_FETCH.REQUEST:
      return {
        params: payload,
        loading: true,
        hasError: false,
        message: undefined,
      }
    case REQUEST_FETCH.SUCCESS:
      return {
        params: payload,
        loading: false,
        hasError: false,
        message: payload.message
      }
    case REQUEST_FETCH.FAILURE:
      return {
        params: payload,
        loading: false,
        hasError: true,
        message: payload.message
      }
    default:
      return params
  }
}

export const items = (items: RequestItemsReducer = {}, action: IRequestAction & IRequestMeta) => {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_FETCH.SUCCESS:
      const response = {
        ...items
      }
      delete response.errors;
      const key = Array.isArray(payload.data) ? "list" : "item";
      response[key] = payload.data;
      return response;
    case REQUEST_FETCH.FAILURE:
      return {
        ...items,
        errors: (payload.data || [])
      }
    default:
      return items
  }
}
