import React from 'react';
import { useState } from 'react'
import styled from "styled-components"
import { requestBooking } from 'pages/booking/officeBooking/OfficeBooking';

var bookingState = [
    false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false,
];

var selectedState = [
    false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false,
];

var startT = -1;
var endT = -1;

export const BookingContentContainer = styled.div`
    margin-left: 40px;
    padding-top: 40px;
    display: flex;
`

export const BookingDateTextContainer = styled.div`
    display: inline;
    float: left;
`

export const BookingTimeContainer = styled.div`
    width: 93%;
    margin: 0 0 10px 35px;
    display: flex;
`

export const RequestButtonContainer = styled.div`
    padding-bottom: 25px;
    margin: 15px 50px 0 0;
    display: ${props => (props.isCheck === 'true') ? 'none' : 'flex'};
    justify-content: flex-end;
`

export const RequestBookingButton = styled.button`
    border: none;
    padding: 5px 10px;
    margin-right: 55px;
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

export const BookingTimeButton = styled.button`
    width: 100%;
    height: 30px;
    background-color: ${props => getTimeBarItemBackColor(props.index, props.selected, props.isCheck)};
    border: none;
    border-top-left-radius: ${props => (props.index === 0) ? '15px' : '0'};
    border-bottom-left-radius: ${props => (props.index === 0) ? '15px' : '0'};
    border-top-right-radius: ${props => (props.index === 23) ? '15px' : '0'};
    border-bottom-right-radius: ${props => (props.index === 23) ? '15px' : '0'};
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
    display: ${props => (props.index === 23) ? 'flex' : 'none'};
`

function getTimeBarItemBackColor(index, selected, isCheck) {
    if (bookingState[index]) {
        return (isCheck === 'true') ? '#D0B1EE' : '#808080'     // TODO: #808080을 빗금으로 수정하기 
    } else {
        return selected ? '#D0B1EE' : '#E9E9E9';
    }
}

const BookingTimeButtonItem = (index, isCheck) => {
    const [selectedCheckList, setSelectedCheckList] = useState([]);

    const onClick = (index) => { 
        if(isCheck || bookingState[index]) { return }
        const updatedCheckList = [...selectedCheckList];

        updatedCheckList[index] = !updatedCheckList[index];
        selectedCheckList[index] = !selectedCheckList[index];
        selectedState[index] = !selectedState[index]

        setSelectedCheckList(selectedState);

        getStartTime(index);
        getEndTime(index);

        console.log('startT -> ', startT);
        console.log('endT -> ', endT);

        for(var i=startT+1; i<endT-1; i++) {
            updatedCheckList[i] = true
            selectedCheckList[i] = true
            selectedState[i] = true

            setSelectedCheckList(updatedCheckList);
        }
    }

    return (
        <TimeButtonContainer>
                <BookingTimeButton index={index} selected={selectedState[index]} isCheck={isCheck} onClick={() => (isCheck === 'true') ? {} : onClick(index)} />
                <StartTimeTextContainer>{index}</StartTimeTextContainer>
                <EndTimeTextContainer index={index}>{index + 1}</EndTimeTextContainer>
        </TimeButtonContainer>
    )
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
function getStartTime(index) {
    if (startT === -1) { startT = index }
    for (var i = 0; i < 24; i++) {
        if (selectedState[i] && startT > i) { startT = i; }
    }
}

function getEndTime(index) {
    if (endT === -1) { endT = index + 1 }
    for (var i = 23; i > -1; i--) {
        if (selectedState[i] && endT < i) { endT = i + 1; }
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
    if (endT === 24) { endT = 0 }
    requestBooking(bookingPurpose, getTimeStr(startT), getTimeStr(endT));
}
export { requestBookingOffice }