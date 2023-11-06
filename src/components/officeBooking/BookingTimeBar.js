import React from 'react';
import { useState } from 'react'
import styled from "styled-components"
import { setStartTimeStr, setEndTimeStr } from 'pages/basic/booking/office/OfficeBooking';

let bookingState = [
    false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false,
];

let selectedState = [
    false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false,
];

let startT = -1;
let endT = -1;
let bookedTimeList = [];

export const BookingContentContainer = styled.div`
    margin: 30px 0 20px 20px;
    display: flex;
`

export const BookingDateTextContainer = styled.div`
    display: inline;
    float: left;
`

export const BookingTimeContainer = styled.div`
    margin: 10px 30px;
    display: flex;
`

export const RequestButtonContainer = styled.div`
    margin: 0 20px 20px 0;
    display: flex;
    justify-content: flex-end;
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
  position: relative;
  left: -8px;
  text-align: left;
`

export const EndTimeTextContainer = styled.div`
  float: right;
  position: relative;
  left: 8px;
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
    const [isSelected, setSelected] = useState(false);

    const onClick = (index) => { 
        if(isCheck || bookingState[index]) { return }

        selectedState[index] = !selectedState[index]
        setSelectedCheckList(selectedState);
        const updatedCheckList = [...selectedCheckList];

        updatedCheckList[index] = !updatedCheckList[index];
        selectedCheckList[index] = !selectedCheckList[index];
        selectedState[index] = !selectedState[index]

        const updatedIsSelected = updatedCheckList[index];
        setSelectedCheckList(selectedState);

        setSelectedCheckList(updatedCheckList);
        setSelected(updatedIsSelected);

        setStartEndTime(index);

        for(var i=0; i<bookedTimeList.length; i++) {
            console.log(bookedTimeList[i])
            if (startT <= getIndexValue(bookedTimeList[i][0]) 
                && endT >= getIndexValue(bookedTimeList[i][1])) {
                alert('예약된 시간을 포함한 시간대는 선택할 수 없습니다.')
                startT = -1
                endT = -1
                selectedState = Array.from({length: 24}, () => false)
                setSelectedCheckList(selectedState)
                return
            }
        }

        console.log('startT -> ', startT);
        console.log('endT -> ', endT);

        // 시작시간과 끝시간 사이를 자동선택
        for (var i=0 ;i<24; i++) {
            selectedState[i] = (i >= startT && i < endT) ? true : false

            setSelectedCheckList(selectedState);
            const updatedCheckList = [...selectedCheckList];

            updatedCheckList[i] = (i >= startT && i < endT) ? true : false
            selectedCheckList[i] = (i >= startT && i < endT) ? true : false
            selectedState[i] = (i >= startT && i < endT) ? true : false

            const updatedIsSelected = updatedCheckList[i];
            setSelectedCheckList(selectedState);

            setSelectedCheckList(updatedCheckList);
            setSelected(updatedIsSelected);
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

 // 예약 현황 반영 관련
function setBookingState(props) {
    bookingState = Array.from({length: 24}, () => false); 
    selectedState = Array.from({length: 24}, () => false);
    bookedTimeList = []
    startT = -1; endT = -1;
    for (var i = 0; i < props.length; i++) {
        setBookingTime(props[i].startTime, props[i].endTime)
    }
}
export { setBookingState }

function setBookingTime(startTime, endTime) {
    bookedTimeList.push([startTime,endTime])
    var start = getIndexValue(startTime)
    var end = getIndexValue(endTime)
    for (var i= start; i < end; i++) {
        bookingState[i] = true;
    }
}
export { setBookingTime }


// 예약 시간 관련
function setStartEndTime(index) {
    if (startT === -1) { startT = index }

    if ((endT - startT) > 2) {   // 3칸 이상 선택된 경우
        if (startT <= index && endT >= index) {  endT = index + 1 }
        else {
            if (startT > index) { startT = index }
            else if (endT < index) { endT = index + 1 }
        }
    } else {
        
        if (endT === -1) { endT = index + 1 }
        if ((endT-startT) === 1 && selectedState[index]) {  // 선택된 유일한 한 칸을 해제하기 위해 클릭한 경우
            startT = -1; endT = -1; return;
        }
        if (startT >= index) { startT = index }
        if (startT <= index) { endT = index + 1 }
    }
    setStartTimeStr(startT)
    setEndTimeStr(endT)
}