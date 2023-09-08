export interface ISearchState {
  isLoading: boolean;
  isError: null | string;
  searchList: string[];
}

export interface SearchSuccessDispatch {
  type: "SEARCH_LIST_SUCCESS";
  data: string[];
}

export interface SearchRequestDispatch {
  type: "SEARCH_LIST_REQUEST";
}

export interface SearchFailureDispatch {
  type: "SEARCH_LIST_FAILURE";
  error: any;
}

export interface SearchInitDispatch {
  type: "SEARCH_LIST_INIT";
  data: [];
}

export type SearchDispatchType =
  | SearchSuccessDispatch
  | SearchRequestDispatch
  | SearchFailureDispatch
  | SearchInitDispatch;
