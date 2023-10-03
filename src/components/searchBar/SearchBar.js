import React from "react";
import styled from "styled-components";
import TimeCapsule from "components/capsule/SelectToggle";
import SearchButtonImg from '../../assets/images/button/searchButton.png'
import ImageButton from "components/button/ImageButton";
import { TimeList } from "constants/ToggleList";

const Container = styled.div`
    width: 590px;
    height: 50px;
    display: inline-flex;
    justify-content: space-between;
    border-radius: 8px;
    border: 1px solid #E6E6E6;
    align-items: center;
    padding: 0 20px;
    margin: 20px 0 0 20px;
`

const TitleText = styled.text`
    color: #717171;
    font-size: 18px;
`

export const DatePicker = styled.input`
    color: #717171;
    font-family: NanumSquare_ac;
    font-size: 18px;
    padding: 0 10px;
    border: none;
    width: 140px;
`

const timeOptionList = TimeList.map((time) => (<option>{time}</option>))

function SearchBar(props) {
    return (
        <Container>
            <TitleText>예약 가능한 회의실 검색</TitleText>
            <DatePicker type="date" onChange={props.changeDate} value={props.value} />
            <TimeCapsule items={timeOptionList} change={props.changeStart} />
            ~
            <TimeCapsule items={timeOptionList} change={props.changeEnd} />
            <ImageButton image={SearchButtonImg} width={"30px"} height={"30px"} click={props.search} />
        </Container>
    );
}

export default SearchBar;