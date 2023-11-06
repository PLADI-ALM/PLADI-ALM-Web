import React from "react";
import styled from "styled-components";
import {TimeList} from "constants/ToggleList";

//예약 검색 컨테이너
export const SearchBarContainer = styled.div`
    background: none;
    width: 100%;
    height: 50px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`

export const SearchTitleContainer = styled.div`
  width: 170px;
  height: 40px;
  display: flex;
  border-radius: 8px;
  background: #FFF;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`

export const SearchTitleText = styled.text`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
`

export const SearchTextInput = styled.input.attrs({type: 'text'})`
  flex: 1;
  height: 40px;
  flex-shrink: 0;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: #FFF;
  padding-left: 10px;
  margin: 0 10px;
  box-sizing: border-box;
`

export const SearchDateContainer = styled.div`
  height: 40px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  margin-right: 10px;
`
export const SearchDateInput = styled.input.attrs({type: 'date'})`
  background: none;
  font-size: 18px;
  padding: 0 10px;
  border: none;
`

export const DatePicker = styled.input`
    color: #717171;
    font-size: 18px;
    padding: 0 10px;
    border: none;
    width: 140px;
`


function SearchBar(props) {
    return (
        <SearchBarContainer>
        {/*//     <TitleText>예약 가능한 회의실 검색</TitleText>*/}
        {/*//     <DatePicker type="date" onChange={props.changeDate} value={props.value} />*/}
        {/*//     <DropBox items={timeOptionList} change={props.changeStart} />*/}
        {/*//     ~*/}
        {/*//     <DropBox items={timeOptionList} change={props.changeEnd} />*/}
        {/*//     <ImagePaddingButton image={SearchButtonImg} width={"30px"} height={"30px"} click={props.search} />*/}
        </SearchBarContainer>
    );
}

export default SearchBar;