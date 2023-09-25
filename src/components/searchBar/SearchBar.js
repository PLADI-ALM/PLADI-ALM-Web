import React from "react";
import { styled } from "styled-components";
import TimeCapsule from "components/capsule/TimeCapsule";
import DateIcon from '../../assets/images/selectOffice/date.png'
import SearchIcon from '../../assets/images/selectOffice/search.png'
import ImageButton from "components/button/ImageButton";

export const Container = styled.div`
    width: 100%;
    heigth: 49px;
    display: inline-flex;
    border-radius: 8px;
    border: 1px solid #E6E6E6;
    align-items: center;  
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

function test() {
    alert("123")
}


function SearchBar() {
    return (
       <Container>
            <TitleText>예약 가능한 회의실 검색</TitleText>
            <DateText>0000-00-00</DateText>
            <ImageButton image={DateIcon} width={"14px"} height={"16px"} click={test}/>
            <TimeCapsule></TimeCapsule>
            ~
            {/* <Text>~</Text> */}
            <TimeCapsule></TimeCapsule>
            <ImageButton image={SearchIcon} width={"30px"} height={"30px"} click={test}/>
       </Container>
    );
}


export default SearchBar;