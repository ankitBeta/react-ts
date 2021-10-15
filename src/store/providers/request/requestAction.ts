import { IRequestPayload, IRequestParams } from ".";
import { defineRequestType, RequestType, StandardAction } from "../../actions/request";

export const REQUEST_FETCH: RequestType = defineRequestType("@MASTER_API");

export const masterApiFetch = {
  request: (payload: IRequestPayload): StandardAction => ({
    type: REQUEST_FETCH.REQUEST,
    payload
  }),
  success: (payload: IRequestParams): StandardAction => ({
    type: REQUEST_FETCH.SUCCESS,
    payload
  }),
  failure: (payload: IRequestParams): StandardAction => ({
    type: REQUEST_FETCH.FAILURE,
    payload
  })
};
