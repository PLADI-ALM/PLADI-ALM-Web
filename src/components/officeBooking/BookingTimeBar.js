import React from 'react';
import { useState } from 'react'
import styled from "styled-components"
import { setStartTimeStr, setEndTimeStr } from 'pages/booking/officeBooking/OfficeBooking';

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
    margin: 30px 0 0 40px;
    display: flex;
`

export const BookingDateTextContainer = styled.div`
    display: inline;
    float: left;
`

export const BookingTimeContainer = styled.div`
    width: 94%;
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
    background: ${props => getTimeBarItemBackColor(props.index, props.selected, props.isCheck)};
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
        // 이미 예약된 시간 (조회화면-보라색(#D0B1EE) / 예약화면-빗금)
        return (isCheck === 'true') ? '#D0B1EE' : 'repeating-linear-gradient(-45deg, #E9E9E9, #E9E9E9 2px, skyblue 2px, skyblue 4px)';
    } else {
        // 예약 가능한 시간 (선택O-보라색(#D0B1EE) / 선택X-연회색(#E9E9E9))
        return selected ? '#D0B1EE' : '#E9E9E9';
    }
}

const BookingTimeButtonItem = (index, isCheck) => {
    const [selectedCheckList, setSelectedCheckList] = useState([]);

    const onClick = (index) => { 
        if(isCheck || bookingState[index]) { return }

        selectedState[index] = !selectedState[index]
        setSelectedCheckList(selectedState);

        getStartTime(index);
        getEndTime(index);

        if ((startT <= bookingState.indexOf(true)) && (endT >= bookingState.lastIndexOf(true))) {
            alert('예약된 시간을 포함한 시간대는 선택할 수 없습니다.')
            startT = -1
            endT = -1
            selectedState = Array.from({length: 24}, () => false)
            setSelectedCheckList(selectedState)
            return
        } 

        console.log('startT -> ', startT);
        console.log('endT -> ', endT);

        // 시작시간과 끝시간 사이를 자동선택        
        for (var i=0 ;i<24; i++) {
            selectedState[i] = (i >= startT && i < endT) ? true : false
        }
        setSelectedCheckList(selectedState);
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

 // 예약 현황 반영 관련
function setBookingState(props) {
    bookingState = Array.from({length: 24}, () => false);  
    for (var i = 0; i < props.length; i++) {
        setBookingTime(props[i].startTime, props[i].endTime)
    }
}
export { setBookingState }

function setBookingTime(startTime, endTime) {
    var start = getIndexValue(startTime)
    var end = getIndexValue(endTime)
    for (var i= start; i < end; i++) {
        bookingState[i] = true;
    }
}
export { setBookingTime }


// 예약 시간 관련
function getStartTime(index) {
    if (startT === -1) { startT = index }
    for (var i = 0; i < 24; i++) {
        if (selectedState[i] && startT > i) { startT = i }   
    }
    setStartTimeStr(startT)
}

function getEndTime(index) {
    if (endT === -1) { endT = index + 1 }
    let cnt = endT - startT
    if (cnt > 2) {
        if (startT < index && endT > index) { 
            endT = index + 1 
        }
        else {
            if (startT > index) { startT = index }
            else if (endT < index) { endT = index + 1 }
        }
    } else {
        for (var i = 23; i > -1; i--) {
            if (selectedState[i] && endT < i) { endT = i + 1; }
        }
    }
    
    setEndTimeStr(endT)
}