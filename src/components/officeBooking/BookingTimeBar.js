import React from 'react';
import { useState, useEffect } from 'react'
import styled from "styled-components"
import { setBookingInfo } from 'pages/booking/officeBooking/OfficeInfo';

var bookingState = [
    false, false, false, false, false, false, false, false, false, false, false, false, 
    false, false, false, false, false, false, false, false, false, false, false, false, 
];
var selectedCheckList = [
    false, false, false, false, false, false, false, false, false, false, false, false, 
    false, false, false, false, false, false, false, false, false, false, false, false, 
];

var startT = -1;
var endT = -1;

export const BookingContentContainer = styled.div`
    width: 100%;
    margin: 25px 40px;
`

export const BookingDateTextContainer = styled.div`
    flaot: right;
    display: flex;
`

export const BookingTimeContainer = styled.div`
    width: 94%;
    hegith: 60px;
    margin: 0px 35px;
    display: flex;
`

// 예약 버튼 관련
export const RequestButtonContainer = styled.div`
    width: 100%
    height: 50px;
    float: right;
    margin-top: 15px;
    display: flex;
`

export const RequestBookingButton = styled.button`
    borger: none;
    padding: 5px 10px;
    margin-right: 60px;
    margin-top: 15px;
    background-color: #A263DE;
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


function getTimeBarItemBackColor(index, selected) {
    if (!bookingState[index]) {
        return selected ? '#D0B1EE' : '#E9E9E9';
    } else {
        return '#008000';
    }
}

export const FirstBookingTimeButton = styled.button`
    width: 47px;
    height: 30px;
    background-color: ${props => getTimeBarItemBackColor(props.index, props.selected)}
    margin-left: 2px;
    margin-right: 2px;
    border: none;
    border-radius: 15px 0px 0px 15px; 
    onClick = clickTimeBarItem(0);
`

export const LastBookingTimeButton = styled.button`
    width: 47px;
    height: 30px;
    background-color: ${props => getTimeBarItemBackColor(props.index, props.selected)};
    margin-left: 2px;
    margin-right: 1px;
    border: none;
    border-radius:  0px 15px 15px 0px; 
    onClick = clickTimeBarItem(0);
`

export const BookingTimeButton = styled.button`
    width: 47px;
    height: 30px;
    background-color: ${props => getTimeBarItemBackColor(props.index, props.selected)};
    border: none;
    onClick = clickTimeBarItem(0);
`

export const TimeButtonContainer = styled.div`
    width: 47px;
    float: left;
    margin-left: 2px;
    margin-right: 2px;
    margin-bottom: 30px;
`

export const StartTimeTextContainer = styled.div`
    float: left;
`

export const EndTimeTextContainer = styled.div`
    float: right;
`

const BookingTimeButtonItem = (index) => {
    const [selectedCheckList, setSelectedCheckList] = useState([]);
    const [isSelected, setSelected] = useState(false);

    const onClick = (index) => { 
        if (bookingState[index]) {
            alert('이미 선택된 시간입니다.')
            return
        }
        const updatedCheckList = [...selectedCheckList];

        updatedCheckList[index] = !updatedCheckList[index];
        selectedCheckList[index] = !selectedCheckList[index];

        const updatedIsSelected = updatedCheckList[index];

        setSelectedCheckList(updatedCheckList);
        setSelected(updatedIsSelected);

        // console.log('선택된 시간대 : ', index, '~', index + 1);
        // console.log('** isSelected -> ', updatedIsSelected);
        // console.log('** updatedCheckList[index] -> ', updatedCheckList[index]);
        // console.log('** selectedCheckList[index] -> ', selectedCheckList[index]);

        if(startT == -1) { startT = index }
        if(endT == -1) { endT = index + 1 }
        getStartTime(selectedCheckList);
        getEndTime(selectedCheckList);

        console.log('startT -> ', startT);
        console.log('endT -> ', endT);
    }

    // useEffect(()=> {
    //     setBookingState();
    // }, []);

    if (index == 0) {
        return (
            <TimeButtonContainer>
                <FirstBookingTimeButton index={index} selected={isSelected} onClick={() => onClick(index)}/>
                <StartTimeTextContainer>{index}</StartTimeTextContainer>
            </TimeButtonContainer>
        );
    } else if (index == 23) {
        return (
            <TimeButtonContainer>
                <LastBookingTimeButton index={index} selected={isSelected} onClick={() => onClick(index)}/>
                <StartTimeTextContainer>{index}</StartTimeTextContainer>
                <EndTimeTextContainer>{index+1}</EndTimeTextContainer>
            </TimeButtonContainer>
        );
    } else {
        return (
            <TimeButtonContainer>
                <BookingTimeButton index={index} selected={isSelected} onClick={() => onClick(index)}/>
                <StartTimeTextContainer>{index}</StartTimeTextContainer>
            </TimeButtonContainer>
        );
    }
}

function renderBookingTimeBar() {
    var items = [];
    for (var i = 0; i < 24; i++) {
        items.push(BookingTimeButtonItem(i));
    }
    return items;
}
export {renderBookingTimeBar}


function setBookingState(startIdx, endIdx) {
    console.log('setBookingState called : startIdx -> ', startIdx);
    for (var i=startIdx; i<endIdx; i++) {
        selectedCheckList[i] = true;
        bookingState[i] = true;
    }
}
export {setBookingState}


// 예약 버튼 관련 함수
function getStartTime(props) {
    for(var i=0; i<24; i++) {
        if (props[i] && startT > i) { startT = i; }
    }
}

function getEndTime(props) {
    for(var i=23; i>-1; i--) {
        if (props[i] && startT < i) { endT = i+1; }
    }
}

function getTimeStr(props) {
    var str = ''
    if (props < 10) { str = '0'+props+':00' } 
    else { str = props+':00' }
    return str
}

function requestBookingOffice() {
    var bookingPurpose = document.getElementById("bookingPurpose").value;

    // console.log("예약목적 : ", bookingPurpose);
    // console.log("시작시간 : ", getTimeStr(startT));
    // console.log("마감시간 : ", getTimeStr(endT));

    setBookingInfo(bookingPurpose, getTimeStr(startT), getTimeStr(endT));

}
export {requestBookingOffice}