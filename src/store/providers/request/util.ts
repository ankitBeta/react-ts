import qs from "qs";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { IRequestAttributes, IRequestPayload, Method, ServerResponse } from ".";
import config from "../../../config/config";

export function fetchRequest(payload: IRequestPayload): Promise<any> {
  const initial: AxiosRequestConfig = {
    url: replaceRequestParams(payload.meta.keys.url, payload.attributes),
    baseURL: config.baseUrl,
    method: payload.meta.keys.method,
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'brackets' })
    },
    headers: handleHeaders(payload)
  }

  const data = handleBody(payload, initial)
  if (data) {
    initial.data = data;
  }
  return axios(initial).then(handleSuccessResponse).catch(handleErrorResponse);
}

function handleHeaders(payload: IRequestPayload): Record<string, string> {
  if (payload.attributes.headers && !isJsonContent(payload.attributes.headers["content-type"])) {
    return { ...payload.attributes.headers, "content-type": "application/json" }
  } else {
    return { "content-Type": "application/json" };
  }
}

function handleBody(payload: IRequestPayload, initial: AxiosRequestConfig) {
  if (payload.meta.keys.method !== Method.GET && payload.attributes.body) {
    return payload.attributes.body instanceof FormData
      ? payload.attributes.body
      : isJsonContent(initial.headers && initial.headers["content-type"])
        ? qs.stringify(payload.attributes.body)
        : JSON.stringify(payload.attributes.body)
  } else {
    return;
  }
}

function handleSuccessResponse(response: AxiosResponse) {
  console.log("HEAD", response, response.data)
  return response.data;
}

function handleErrorResponse(error: AxiosError<ServerResponse>) {
  const data = (error.response && error.response.data);
  if (data && (data.statusCode === 400 || data.statusCode === 409)) {
    throw data;
  } else {
    throw new Error(error.message);
  }
}

function isJsonContent(type: string | undefined) {
  return (!!type && type.indexOf("application/json") !== -1)
}

function replaceRequestParams(url: string, attributes: IRequestAttributes) {
  const requestParams: any = ((attributes || {}).requestParams || {});
  for (const key in requestParams) {
    url = url.replaceAll(`:${key}`, requestParams[key])
  }
  return url;
}
