import qs from "qs";
// import { IRequestAttributes, IRequestPayload, Method } from ".";

// export function fetchRequest(payload: IRequestPayload): Promise<any> {
//   const initial: RequestInit = {
//     method: payload.meta.keys.method
//   }
//   const url = generateUrl(payload.meta.keys.url, payload.attributes)
//   handleHeaders(payload, initial)
//   handleBody(payload, initial);

//   return fetch(url, initial).then(handleResponse);
// }

// function handleHeaders(payload: IRequestPayload, initial: RequestInit) {
//   if (payload.attributes.headers && !payload.attributes.headers.get("Content-Type")) {
//     payload.attributes.headers.set("Content-Type", "application/json")
//   } else {
//     const headers = new Headers();
//     headers.set("Content-Type", "application/json")
//     initial.headers = headers;
//   }
// }

// function handleBody(payload: IRequestPayload, initial: RequestInit) {
//   if (payload.meta.keys.method !== Method.GET && payload.attributes.body) {
//     initial.body = payload.attributes.body instanceof FormData
//       ? payload.attributes.body
//       : isJsonContent((initial.headers instanceof Headers && initial.headers.get("content-type")) || null)
//         ? JSON.stringify(payload.attributes.body)
//         : qs.stringify(payload.attributes.body)
//   }
// }

// function handleResponse(response: Response) {
//   return new Promise((resolve, reject) => {
//     if (isJsonContent(response.headers.get("content-type"))) {
//       response.json().then(json => {
//         if ((response.status >= 200 && response.status < 300) || response.status === 400 || response.status === 409) {
//           resolve(json);
//         } else {
//           reject(new Error(json.message));
//         }
//       })
//     } else {
//       let err = new Error("Error while parsing result");
//       reject(err);
//     }
//   }
//   )
// }

// function isJsonContent(type: string | null) {
//   return (!!type && type.indexOf("application/json") !== -1)
// }

// function generateUrl(url: string, attributes: IRequestAttributes): string {
//   const queryString = qs.stringify((attributes || {}).params || {});
//   const fullUrl = [process.env.REACT_APP_API_URL, replaceRequestParams(url, attributes)];
//   if (queryString) {
//     fullUrl.push("?", queryString)
//   }
//   return fullUrl.join("");
// }

// function replaceRequestParams(url: string, attributes: IRequestAttributes) {
//   const requestParams: any = ((attributes || {}).requestParams || {});
//   for (const key in requestParams) {
//     url = url.replaceAll(`:${key}`, requestParams[key])
//   }
//   return url;
// }
