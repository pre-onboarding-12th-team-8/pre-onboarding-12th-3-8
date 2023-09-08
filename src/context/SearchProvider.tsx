import React, {
  useReducer,
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { initialState, reducer } from "../reducers/searchReducer";
import { debounce } from "../utils";
import { getSick } from "../api/sick";
import { handleError } from "../api/http";
import {
  ISearchVals,
  ISearchActions,
  SearchType,
  ISearchProviderProps,
} from "./types";

const SearchValsCtx = createContext<ISearchVals>({
  searchText: "",
  recommendedData: {
    isLoading: false,
    isError: null,
    searchList: [],
  },
  isFocusSearchForm: false,
  searchFormRef: null,
  focusedRecommendSearchItemIndex: null,
});

const SearchActionsCtx = createContext<ISearchActions>({
  typeSearchedKeyword: () => {},
  initSearchedKeyword: () => {},
  submitSearchKeyword: () => {},
  openSearchedKeywordCard: () => {},
});

export const useSearchVals = () => {
  const val = useContext(SearchValsCtx);
  if (val === undefined) {
    throw new Error("useSearchVals should be used within SearchProvider");
  }
  return val;
};

export const useSearchActions = () => {
  const val = useContext(SearchActionsCtx);
  if (val === undefined) {
    throw new Error("useSearchActions should be used within SearchProvider");
  }
  return val;
};

export const SearchProvider = ({
  searchType,
  children,
}: ISearchProviderProps) => {
  const [recommendedData, dispatch] = useReducer(reducer, initialState);

  const [searchText, setSearchText] = useState<string>("");
  const [isFocusSearchForm, setIsFocusSearchForm] = useState<boolean>(false);
  const searchFormRef = useRef<HTMLDivElement>(null);
  const [focusedRecommendSearchItemIndex, setFocusedRecommendSearchItemIndex] =
    useState<number | null>(null);
  const navigate = useNavigate();

  const submitSearchKeyword = (searchedData: string): void => {
    if (searchedData.length > 0) {
      navigate(`/search?q=${searchedData}`);
    }
  };

  const openSearchedKeywordCard = () => {
    if (!isFocusSearchForm) setIsFocusSearchForm(true);
  };

  const updateSearchList = async (
    searchText: string,
    searchType: SearchType,
  ): Promise<void> => {
    try {
      switch (searchType) {
        case "sick":
          await getSick(dispatch, searchText);
          break;
        default:
          break;
      }
    } catch (e) {
      handleError(e);
    }
  };

  const debouncedUpdateSearchList = debounce((searchText: string): void => {
    updateSearchList(searchText, searchType);
  }, 200);

  const typeSearchedKeyword = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setFocusedRecommendSearchItemIndex(null);
    setSearchText(e.target.value);
    debouncedUpdateSearchList(e.target.value);
  };

  const initSearchedKeyword = (callback: Function): void => {
    dispatch({ type: "SEARCH_LIST_INIT", data: [] });
    setSearchText("");
    setFocusedRecommendSearchItemIndex(null);
    callback();
  };

  useEffect(() => {
    const onOutsideClickedSearchForm = (event: MouseEvent): void => {
      if (
        searchFormRef.current &&
        !searchFormRef.current.contains(event.target as Node)
      ) {
        setIsFocusSearchForm(false);
      }
    };
    document.addEventListener("mousedown", onOutsideClickedSearchForm);
    return () => {
      document.removeEventListener("mousedown", onOutsideClickedSearchForm);
    };
  }, [searchFormRef]);

  useEffect(() => {
    const getUpdatedRecommendedSearchKeywordFocusIndex = (
      event: KeyboardEvent,
    ): number | null => {
      let updateIndex: number | null = focusedRecommendSearchItemIndex;
      if (event.key === "ArrowUp") {
        updateIndex =
          updateIndex === 0 || updateIndex === null
            ? recommendedData.searchList.length - 1
            : --updateIndex;
      }
      if (event.key === "ArrowDown") {
        updateIndex =
          (typeof updateIndex === "number" &&
            updateIndex + 1 === recommendedData.searchList.length) ||
          updateIndex === null
            ? 0
            : ++updateIndex;
      }
      return updateIndex;
    };
    const onKeyboardFocusedRecommendSearchItemIndex = (
      event: KeyboardEvent,
    ): void => {
      if (event.isComposing) return;
      if (event.key === "Enter") return submitSearchKeyword(searchText);
      if (recommendedData.searchList.length === 0) return;

      const updateIndex = getUpdatedRecommendedSearchKeywordFocusIndex(event);
      if (updateIndex === focusedRecommendSearchItemIndex) return;

      setFocusedRecommendSearchItemIndex(updateIndex);
      setSearchText(
        recommendedData.searchList.find(
          (_, index: number) => index === updateIndex,
        ) ?? "",
      );
    };
    document.addEventListener(
      "keydown",
      onKeyboardFocusedRecommendSearchItemIndex,
    );
    return () => {
      document.removeEventListener(
        "keydown",
        onKeyboardFocusedRecommendSearchItemIndex,
      );
    };
  }, [recommendedData, focusedRecommendSearchItemIndex, searchText]);

  const searchVals = useMemo<ISearchVals>(
    () => ({
      searchText,
      recommendedData,
      isFocusSearchForm,
      searchFormRef,
      focusedRecommendSearchItemIndex,
    }),
    [
      searchText,
      recommendedData,
      isFocusSearchForm,
      searchFormRef,
      focusedRecommendSearchItemIndex,
    ],
  );

  const searchActions = useMemo<ISearchActions>(
    () => ({
      typeSearchedKeyword,
      initSearchedKeyword,
      submitSearchKeyword,
      openSearchedKeywordCard,
    }),
    [],
  );

  return (
    <SearchActionsCtx.Provider value={searchActions}>
      <SearchValsCtx.Provider value={searchVals}>
        {children}
      </SearchValsCtx.Provider>
    </SearchActionsCtx.Provider>
  );
};
