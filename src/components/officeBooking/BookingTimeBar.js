import React from 'react';
import { useState } from 'react'
import styled from "styled-components"
import { requestBooking } from 'pages/booking/officeBooking/OfficeBooking';

var bookingState = [
    false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false,
];
// var selectedCheckList = [
//     false, false, false, false, false, false, false, false, false, false, false, false, 
//     false, false, false, false, false, false, false, false, false, false, false, false, 
// ];

var startT = -1;
var endT = -1;

export const BookingContentContainer = styled.div`
    width: 100%;
    margin: 25px 40px;
    padding-top: 10px;
    display: ${props => props.isCheck !== 'true' ? 'none' : 'flex'}
`

export const BookingDateTextContainer = styled.div`
    flaot: right;
    display: flex;
`

export const BookingTimeContainer = styled.div`
    width: 94%;
    margin: 0px 0px 10px 35px;
    display: flex;
`

export const RequestButtonContainer = styled.div`
    padding: 0 10px 40px 0;
    display: ${props => (props.isCheck === 'true') ? 'none' : 'flex'};
    justify-content: flex-end;
`

export const RequestBookingButton = styled.button`
    border: none;
    padding: 5px 10px;
    margin-right: 60px;
    margin-top: 15px;
    background: #8741CB;
    color: #FFF;
    width: 82px;
    height: 38px;
    border: none;
    border-radius: 20px;

    font-family: NanumSquare_ac;
    font-size: 20px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
`

export const FirstBookingTimeButton = styled.button`
    width: 100%;
    height: 30px;
    background-color: ${props => getTimeBarItemBackColor(props.index, props.selected, props.isCheck)}
    margin-left: 2px;
    margin-right: 2px;
    border: none;
    border-radius: 15px 0px 0px 15px; 
`

export const LastBookingTimeButton = styled.button`
    width: 110%;
    height: 30px;
    background-color: ${props => getTimeBarItemBackColor(props.index, props.selected, props.isCheck)};
    margin-right: 1px;
    border: none;
    border-radius: 0px 15px 15px 0px; 
`

export const BookingTimeButton = styled.button`
    width: 100%;
    height: 30px;
    background-color: ${props => getTimeBarItemBackColor(props.index, props.selected, props.isCheck)};
    border: none;
`

export const TimeButtonContainer = styled.div`
    width: 100%;
    padding: 0 2px 30px 2px;
`

export const StartTimeTextContainer = styled.div`
    float: left;
`

export const EndTimeTextContainer = styled.div`
    float: right;
`

function getTimeBarItemBackColor(index, selected, isCheck) {
    if (bookingState[index]) {
        return (isCheck === 'true') ? '#D0B1EE' : '#808080';   // TODO: #808080을 빗금으로 수정하기
    } else {
        return selected ? '#D0B1EE' : '#E9E9E9';
    }
}

const BookingTimeButtonItem = (index, isCheck) => {
    const [selectedCheckList, setSelectedCheckList] = useState([]);
    const [isSelected, setSelected] = useState(false);

    const onClick = (index) => {
        if (bookingState[index]) { alert('이미 선택된 시간입니다.'); return; }
        const updatedCheckList = [...selectedCheckList];

        updatedCheckList[index] = !updatedCheckList[index];
        selectedCheckList[index] = !selectedCheckList[index];

        const updatedIsSelected = updatedCheckList[index];

        setSelectedCheckList(updatedCheckList);
        setSelected(updatedIsSelected);

        if (startT === -1) { startT = index }
        if (endT === -1) { endT = index + 1 }
        getStartTime(selectedCheckList);
        getEndTime(selectedCheckList);

        console.log('startT -> ', startT);
        console.log('endT -> ', endT);
    }

    // useEffect(()=> {
    //     setBookingState();
    // }, []);

    if (index === 0) {
        return (
            <TimeButtonContainer>
                <FirstBookingTimeButton index={index} selected={isSelected} isCheck={isCheck} onClick={() => (isCheck === 'true') ? {} : onClick(index)} />
                <StartTimeTextContainer>{index}</StartTimeTextContainer>
            </TimeButtonContainer>
        );
    } else if (index === 23) {
        return (
            <TimeButtonContainer>
                <LastBookingTimeButton index={index} selected={isSelected} isCheck={isCheck} onClick={() => (isCheck === 'true') ? {} : onClick(index)} />
                <StartTimeTextContainer>{index}</StartTimeTextContainer>
                <EndTimeTextContainer>{index + 1}</EndTimeTextContainer>
            </TimeButtonContainer>
        );
    } else {
        return (
            <TimeButtonContainer>
                <BookingTimeButton index={index} selected={isSelected} isCheck={isCheck} onClick={() => (isCheck === 'true') ? {} : onClick(index)} />
                <StartTimeTextContainer>{index}</StartTimeTextContainer>
            </TimeButtonContainer>
        );
    }
}

function renderBookingTimeBar(isCheck) {
    var items = [];
    for (var i = 0; i < 24; i++) {
        items.push(BookingTimeButtonItem(i, isCheck));
    }
    return items;
}
export { renderBookingTimeBar }

function getIndexValue(timeStr) {
    var temp = timeStr.substr(0, 2);
    if (temp.substr(0, 1) === '0') { temp = temp.substr(1, 1); }
    return parseInt(temp);
}

function setBookingState(props) {
    for (var i = 0; i < props.length; i++) {
        var start = getIndexValue(props[i].startTime)
        var end = getIndexValue(props[i].endTime)
        for (var j = start; j < end; j++) {
            bookingState[j] = true;
        }
    }
}
export { setBookingState }

function setBookingTime(startTime, endTime) {
    var start = getIndexValue(startTime)
    var end = getIndexValue(endTime)
    for (var j = start; j < end; j++) {
        bookingState[j] = true;
    }
}
export { setBookingTime }


// 예약 버튼 관련 함수
function getStartTime(props) {
    for (var i = 0; i < 24; i++) {
        if (props[i] && startT > i) { startT = i; }
    }
}

function getEndTime(props) {
    for (var i = 23; i > -1; i--) {
        if (props[i] && endT < i) { endT = i + 1; }
    }
}

function getTimeStr(props) {
    var str = ''
    if (props < 10) { str = '0' + props + ':00' }
    else { str = props + ':00' }
    return str
}

function requestBookingOffice() {
    var bookingPurpose = document.getElementById("bookingPurpose").value;
    requestBooking(bookingPurpose, getTimeStr(startT), getTimeStr(endT));
}
export { requestBookingOffice }