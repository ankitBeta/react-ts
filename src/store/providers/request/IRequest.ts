import { Reducer, Action } from "redux";
import { StandardAction } from "../../actions/request";

export enum Method {
  GET = "get",
  POST = "post",
  PUT = "put"
}

export type IMasterAction = (payload: IRequestAttributes) => StandardAction;

export type IActionCreator<Type> = {
  [Property in keyof Type]: IMasterAction
}

export type IUniversal = {
  [key: string]: any
}

export interface IRequestAttributes {
  requestParams?: { [key: string]: string | number | boolean };
  body?: Object;
  params?: IUniversal;
  headers?: Record<string, string>;
  message?: string;
  items?: any;
}

export interface IRequestConfig {
  url: string;
  method: Method;
  transformation?: any;
}

export interface IRequestKeys {
  uniqueKey: string;
  keys: IRequestConfig;
}

export type IRequestMeta = {
  meta: IRequestKeys;
}

export interface IRequestPayload {
  meta: IRequestKeys;
  attributes: IRequestAttributes;
}

export interface IRequestParams extends IRequestPayload {
  data?: any;
  message?: string;
  hasError: Boolean;
  loading: Boolean;
}

export interface IRequestAction extends IRequestPayload, Action {
  payload: IRequestParams;
}

export interface IRequest {
  meta: IRequestMeta;
  attributes: IRequestAttributes;
}

export interface RequestInfoReducer {
  params?: IRequestAttributes;
  loading?: boolean;
  hasError?: boolean;
  message?: string;
}

export interface RequestItemsReducer {
  item?: any;
  list?: Array<any>;
  errors?: Array<any>
}

export interface IRequestReducer {
  info: RequestInfoReducer;
  items: RequestItemsReducer;
}

export interface IRequestReducers {
  reducers: Reducer<IRequestReducer>;
}

export type IMaster = {
  reducers: Reducer<IRequestReducer>;
} & Record<string, IRequestAction>

export interface IRequestState {
  loading: Boolean;
  error: boolean;
  message: string | undefined;
  item: any;
  list: Array<any>;
  errors: Array<ServerValidationError>;
}

export interface ServerValidationError {
  attribute: string;
  message: string;
}

export interface ServerResponse {
  data: any,
  error: string,
  message: string,
  statusCode: number
}
