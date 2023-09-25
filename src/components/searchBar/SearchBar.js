import React from "react";
import { styled } from "styled-components";
import TimeCapsule from "components/capsule/TimeCapsule";

export const Container = styled.div`
    width: 45%;
    heigth: 49px;
    display: inline-flex;
    border-radius: 8px;
    border: 1px solid #E6E6E6;
`

export const TitleText = styled.text`
    color: #717171;
    font-family: NanumSquare_ac;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 88.889% */
`

export const DateText = styled.text`
    color: #717171;
    font-family: NanumSquare_ac;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 88.889% */
`

export const DateButton = styled.image`
    width: 2.2%;
    height: 16px;
    flex-shrink: 0;
`

export const SearchButton = styled.image`
    width: 30px;
    height: 30px;
    flex-shrink: 0;
`


function SearchBar() {
    return (
       <Container>
            <TitleText>예약 가능한 회의실 검색</TitleText>
            <DateText>0000-00-00</DateText>
            <DateButton></DateButton>
            <TimeCapsule></TimeCapsule>
            <Text>~</Text>
            <TimeCapsule></TimeCapsule>
            <SearchButton></SearchButton>
       </Container>
    );
}