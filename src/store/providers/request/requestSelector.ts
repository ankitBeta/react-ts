import { IRequestReducer, IRequestState } from "./IRequest";

export const isMasterLoading = (master: IRequestReducer) => (master.info.loading || false);

export const getMasterResult = (master: IRequestReducer) => {
  return (master.items && master.items.doc);
}

export const getMasterListResult = (master: IRequestReducer) => {
  return (master.items && master.items.docs) || [];
}

export const hasErrorInMaster = (master: IRequestReducer) => {
  return master && master.info && master.info.hasError;
}

export function getMasterState(masterApi: IRequestReducer, defaultValue?: any): IRequestState {
  return {
    loading: isMasterLoading(masterApi!),
    doc: getMasterResult(masterApi) || defaultValue,
    docs: getMasterListResult(masterApi),
    error: hasErrorInMaster(masterApi)!,
    message: masterApi && masterApi.info && masterApi.info.message
  }
}
