import { createMasterApi, IRequestConfig, Method } from "./providers/request";

interface IOriginRequest {
  request: IRequestConfig;
  signUp: IRequestConfig;
}

export const requestUsers = createMasterApi<IOriginRequest>("@Master/Origin", {
  request: {
    url: "/api/user/:userId",
    method: Method.GET,
  },
  signUp: {
    url: "/api/user/signUp",
    method: Method.POST
  }
});
