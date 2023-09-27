import React from 'react';
import { useState, useEffect } from 'react'
import styled from "styled-components"

var bookingState = [
    false, false, false, false, false, false, false, false, false, false, false, false, 
    false, false, false, false, false, false, false, false, false, false, false, false, 
];
var selectedCheckList = [
    false, false, false, false, false, false, false, false, false, false, false, false, 
    false, false, false, false, false, false, false, false, false, false, false, false, 
];

export const BookingContentContainer = styled.div`
    width: 100%;
    margin-left: 40px;
    margin-bottom: 15px;
    float: left;
`

export const BookingDateTextContainer = styled.div`
    width: 250px;
    backgroun: #D9D9D9;
`

export const BookingTimeContainer = styled.div`
    width: 94%;
    hegith: 60px;
    margin-left: 35px;
`

function getTimeBarItemBackColor(index, selected) {
    if (!bookingState[index]) {
        return selected ? '#81c147' : '#D3D3D3';
    } else {
        return '#D0B1EE';
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

        const updatedIsSelected = updatedCheckList[index];

        setSelectedCheckList(updatedCheckList);
        setSelected(updatedIsSelected);

        console.log('선택된 시간대 : ', index, '~', index + 1);
        console.log('** isSelected -> ', updatedIsSelected);
        console.log('** selectedCheckList[index] -> ', updatedCheckList[index]);
    }

    useEffect(()=> {
        setBookingState();
    }, []);

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
    console.log('setBookingState called');
    for (var i=startIdx; i<endIdx; i++) {
        selectedCheckList[i] = true;
        bookingState[i] = true;
    }
}
export {setBookingState}
