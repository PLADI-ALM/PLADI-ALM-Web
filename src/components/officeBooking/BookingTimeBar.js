import React from 'react';
import { useState } from 'react'
import styled from "styled-components"

var selectedCheckList = [
    false, false, false, false, false, false, false, false, false, false, false, false, 
    false, false, false, false, false, false, false, false, false, false, false, false, 
];

export const BookingContentContainer = styled.div`
    width: 100%;
    margin-left: 40px;
    float: left;
`

export const BookingDateTextContainer = styled.div`
    width: 300px;
    backgroun: #D9D9D9;
`

export const BookingTimeContainer = styled.div`
    width: 94%;
    hegith: 60px;
    margin-left: 35px;
`

export const FirstBookingTimeButton = styled.button`
    width: 47px;
    height: 30px;
    background-color: ${selected => selected ? '#81c147' : '#D3D3D3'};
    margin-left: 2px;
    margin-right: 3px;
    border: none;
    border-radius: 15px 0px 0px 15px; 
    onClick = clickTimeBarItem(0);
`

export const LastBookingTimeButton = styled.button`
    width: 47px;
    height: 30px;
    background-color: ${selected => selected ? '#81c147' : '#D3D3D3'};
    margin-left: 3px;
    margin-right: 1px;
    border: none;
    border-radius:  0px 15px 15px 0px; 
    onClick = clickTimeBarItem(0);
`

export const BookingTimeButton = styled.button`
    width: 47px;
    height: 30px;
    background-color: ${selected => selected ? '#81c147' : '#D3D3D3'};
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

function RenderBookingTimeButtonItem(index) {
    var [isSelected, setSelected] = useState(selectedCheckList[index]);
    

    const onClick = (index) => { 
        selectedCheckList[index] = !selectedCheckList[index];
        isSelected = selectedCheckList[index];
        setSelected(isSelected); 
        console.log('선택된 시간대 : ', index, '~', index+1);
        console.log('** isSelected -> ', isSelected);
        console.log('** selectedCheckList[index] -> ', selectedCheckList[index]);
    }

    if (index == 0) {
        return <TimeButtonContainer>
            <FirstBookingTimeButton selected={isSelected} onClick={() => onClick(index)}/>
            <StartTimeTextContainer>{index}</StartTimeTextContainer>
        </TimeButtonContainer>
    } else if (index == 23) {
        return <TimeButtonContainer>
            <LastBookingTimeButton selected={isSelected} onClick={() => onClick(index)}/>
            <StartTimeTextContainer>{index}</StartTimeTextContainer>
            <EndTimeTextContainer>{index+1}</EndTimeTextContainer>
        </TimeButtonContainer>
    } else {
        return <TimeButtonContainer>
            <BookingTimeButton selected={isSelected} onClick={() => onClick(index)}/>
            <StartTimeTextContainer>{index}</StartTimeTextContainer>
        </TimeButtonContainer>
    }
}
export default RenderBookingTimeButtonItem;

function renderBookingTimeBar() {
    var items = [];
    for (var i = 0; i < 24; i++) {
        items.push(RenderBookingTimeButtonItem(i));
    }
    return items;
}
export {renderBookingTimeBar}