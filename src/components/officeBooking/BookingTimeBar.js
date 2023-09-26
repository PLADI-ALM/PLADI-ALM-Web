import React from 'react';
import styled from "styled-components"

var selectedCheckList = [
    false, true, false, false, false, false, false, false, false, false, false, false, 
    false, true, false, false, false, false, false, false, false, false, false, false, 
];

export const BookingContentContainer = styled.div`
    margin-left: 35px;
`

export const BookingTimeContainer = styled.div`
    width: 94%;
    hegith: 60px;
    margin-left: 45px;
`

export const FirstBookingTimeButton = styled.button`
    width: 47px;
    height: 30px;
    background-color: ${color => color};
    margin-left: 2px;
    margin-right: 3px;
    border: none;
    border-radius: 15px 0px 0px 15px; 
    onClick = clickTimeBarItem(0);
`

export const LastBookingTimeButton = styled.button`
    width: 47px;
    height: 30px;
    background-color: ${color => color};
    margin-left: 3px;
    margin-right: 1px;
    border: none;
    border-radius:  0px 15px 15px 0px; 
    onClick = clickTimeBarItem(0);
`

export const BookingTimeButton = styled.button`
    width: 47px;
    height: 30px;
    background-color: ${color => color};
    border: none;
    onClick = clickTimeBarItem(0);
`

export const TimeButtonContainer = styled.div`
    width: 47px;
    float: left;
    margin-left: 2px;
    margin-right: 3px;
    margin-bottom: 30px;
`

export const StartTimeTextContainer = styled.div`
    float: left;
`

export const EndTimeTextContainer = styled.div`
    float: right;
`

function isSelectedTime(time) {
    return selectedCheckList[time];
}

function renderBookingTimeButtonItem(index) {
    if (index == 0) {
        return <TimeButtonContainer>
            <FirstBookingTimeButton color={isSelectedTime(index) ? '#81c147' : '#D3D3D3'} onClick={clickTimeBarItem(index)}/>
            <StartTimeTextContainer>{index}</StartTimeTextContainer>
        </TimeButtonContainer>
    } else if (index == 23) {
        return <TimeButtonContainer>
            <LastBookingTimeButton color={isSelectedTime(index) ? '#81c147' : '#D3D3D3'} onClick={clickTimeBarItem(index)}/>
            <StartTimeTextContainer>{index}</StartTimeTextContainer>
            <EndTimeTextContainer>{index+1}</EndTimeTextContainer>
        </TimeButtonContainer>
    } else {
        return <TimeButtonContainer>
            <BookingTimeButton color={isSelectedTime(index) ? '#81c147' : '#D3D3D3'} onClick={clickTimeBarItem(index)}/>
            <StartTimeTextContainer>{index}</StartTimeTextContainer>
        </TimeButtonContainer>
    }
}

function clickTimeBarItem(index) {
    console.log('바뀌기 전 -> ', selectedCheckList[index]);
    selectedCheckList[index] = !selectedCheckList[index];
    console.log('바뀐 후 -> ', selectedCheckList[index]);
}

function renderBookingTimeBar() {
    var items = [];
    for (var i = 0; i < 24; i++) {
        items.push(renderBookingTimeButtonItem(i));
    }
    return items;
}

export {renderBookingTimeBar}