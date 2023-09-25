import React from "react";
import { styled } from "styled-components";
import TimeCapsule from "components/capsule/TimeCapsule";
import DateIcon from '../../assets/images/selectOffice/date.png'
import SearchIcon from '../../assets/images/selectOffice/search.png'
import ImageButton from "components/button/ImageButton";

export const Container = styled.div`
    width: 60%;
    heigth: 49px;
    display: inline-flex;
    border-radius: 8px;
    border: 1px solid #E6E6E6;
    align-items: center;  
    margin-top: 35px;
    margin-left: 35px;
`

export const TitleText = styled.text`
    color: #717171;
    font-family: NanumSquare_ac;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 88.889% */
    margin-left: 31px;
`

export const DatePicker = styled.input`
    color: #717171;
    font-family: NanumSquare_ac;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 88.889% */
    margin-left: 21px;
    margin-right: 30px;
    border: none;
`

function test() {
    alert("123")
}

const timeList = ["00:00", "00:30", "01:00", "01:30", "02:00", 
                  "02:30", "03:00", "03:30", "04:00", "04:30", "05:00",
                  "05:30", "06:00", "06:30", "07:00", "07:30", "08:00",
                  "08:30", "09:00", "09:30", "10:00", "10:30", "11:00",
                  "11:30", "12:00", "12:30"
                ];

const timeOptionList = timeList.map((time) => (<option>{time}</option>))



function SearchBar() {
    return (
       <Container>
            <TitleText>예약 가능한 회의실 검색</TitleText>
            <DatePicker type="date"/>
            <TimeCapsule items={timeOptionList}/>
            ~
            <TimeCapsule items={timeOptionList}/>
            <ImageButton image={SearchIcon} width={"30px"} height={"30px"} click={test} marginLeft={"14px"}/>
       </Container>
    );
}


export default SearchBar;