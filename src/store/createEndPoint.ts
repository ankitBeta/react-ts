import { createMasterApi, IRequestAttribute, Method } from "./providers/request";

interface IOriginRequest {
  request: IRequestAttribute;
  signUp: IRequestAttribute;
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