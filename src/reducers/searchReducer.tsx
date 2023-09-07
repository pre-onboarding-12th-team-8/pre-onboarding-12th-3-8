import { ISearchState, SearchDispatchType } from "./type";

export const initialState: ISearchState = {
  isLoading: false,
  isError: null,
  searchList: [],
};

export const reducer = (state = initialState, action: SearchDispatchType) => {
  switch (action.type) {
    case "SEARCH_LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        searchList: Array.isArray(action.data) ? [...action.data] : [],
      };
    case "SEARCH_LIST_INIT":
      return {
        ...state,
        isLoading: false,
        searchList: [],
      };
    case "SEARCH_LIST_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "SEARCH_LIST_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: action.error,
      };
    default:
      return state;
  }
};
