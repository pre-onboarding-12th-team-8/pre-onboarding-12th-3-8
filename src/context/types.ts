import { ISearchState } from "../reducers/type";
import React from "react";

export type SearchType = "sick";

export interface ISearchVals {
  searchText: string;
  recommendedData: ISearchState;
  isFocusSearchForm: boolean;
  searchFormRef: React.Ref<HTMLDivElement>;
  focusedRecommendSearchItemIndex: number | null;
}

export interface ISearchActions {
  typeSearchedKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  initSearchedKeyword: (callback: Function) => void;
  submitSearchKeyword: (searchedData: string) => void;
  openSearchedKeywordCard: () => void;
}

export interface ISearchProviderProps {
  searchType: SearchType;
  children: React.ReactElement;
}
