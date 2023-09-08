import { Dispatch } from "react";
import { SearchDispatchType } from "../reducers/type";
import { cacheApi } from "./http";
import { API } from "./config";

export interface IResponseSick {
  sickCd: string;
  sickNm: string;
}
export const getSick = async (
  dispatch: Dispatch<SearchDispatchType>,
  searchKey: string,
) => {
  try {
    dispatch({ type: "SEARCH_LIST_REQUEST" });
    const response: IResponseSick[] = await cacheApi.get(
      `${API.SICK}?q=${searchKey}`,
    );
    if (response) {
      dispatch({
        type: "SEARCH_LIST_SUCCESS",
        data: response.map((item) => item.sickNm),
      });
    }
  } catch (error) {
    dispatch({ type: "SEARCH_LIST_FAILURE", error });
  }
};
