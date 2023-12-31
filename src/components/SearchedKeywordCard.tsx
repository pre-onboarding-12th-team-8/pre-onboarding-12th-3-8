import React from "react";
import styled from "styled-components";
import { SearchedKeywordItem } from "./SearchedKeywordItem";
import { useSearchVals, useSearchActions } from "../context/SearchProvider";

export const SearchedKeywordCard = () => {
  const { focusedRecommendSearchItemIndex, recommendedData } = useSearchVals();
  const { submitSearchKeyword } = useSearchActions();

  return (
    <StyledSearchedKeywordCard>
      <div className="searched-keyword-label">추천 검색어</div>
      {recommendedData.searchList.length > 0 ? (
        <>
          {recommendedData.searchList.map((keyword: string, index: number) => (
            <SearchedKeywordItem
              $focused={focusedRecommendSearchItemIndex === index}
              key={keyword}
              label={keyword}
              onClickItem={() => submitSearchKeyword(keyword)}
            />
          ))}
        </>
      ) : (
        <SearchedKeywordItem label="검색어가 없습니다." />
      )}
    </StyledSearchedKeywordCard>
  );
};

const StyledSearchedKeywordCard = styled.div`
  width: 100%;
  padding-top: 24px;
  padding-bottom: 16px;
  box-shadow: rgba(30, 32, 37, 0.1) 0 2px 10px;
  background-color: #ffffff;
  border-radius: 20px;

  .searched-keyword-label {
    color: rgb(106, 115, 123);
    font-size: 13px;
    font-weight: 400;
    letter-spacing: -0.018em;
    line-height: 1.6;
    padding-left: 24px;
    padding-right: 24px;
    font-family: inherit;
  }

  .searched-keyword-line {
    background-color: rgb(237, 240, 242);
    height: 1px;
    margin-top: 24px;
    margin-bottom: 24px;
  }
`;
