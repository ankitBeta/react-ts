import { IRequestReducer, IRequestState } from "./IRequest";

export const isMasterLoading = (master: IRequestReducer) => (master.info.loading || false);

export const getMasterResult = (master: IRequestReducer) => {
  return (master.items && master.items.item);
}

export const getMasterListResult = (master: IRequestReducer) => {
  return (master.items && master.items.list) || [];
}

export const getValidation = (master: IRequestReducer) => {
  return (master.items && master.items.errors) || [];
}

export const hasErrorInMaster = (master: IRequestReducer) => {
  return master && master.info && master.info.hasError;
}

export function getMasterState(masterApi: IRequestReducer, defaultValue?: any): IRequestState {
  return {
    loading: isMasterLoading(masterApi!),
    errors: getValidation(masterApi),
    error: hasErrorInMaster(masterApi)!,
    message: masterApi && masterApi.info && masterApi.info.message,
    item: getMasterResult(masterApi) || defaultValue,
    list: getMasterListResult(masterApi),
  }
}
