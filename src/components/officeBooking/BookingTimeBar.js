import React, {useRef} from 'react';
import {useState} from 'react'
import styled from "styled-components"
import {setStartTimeStr, setEndTimeStr, getBookingInfo} from 'pages/basic/booking/office/OfficeBooking';
import {BookingInfoModal, BookingInfoModalView, BookingInfoText, BookingLastInfoText} from "../modal/BookingInfoModal";
import {TimeList} from "../../constants/ToggleList";
import {OfficesAxios} from "../../api/AxiosApi";
import {getToken} from "../../utils/IsLoginUtil";
import {basicError} from "../../utils/ErrorHandlerUtil";
import {useParams} from "react-router-dom";
import {UserModal} from "../../pages/admin/user/UserModal";
import moment from "moment/moment";

let bookingState = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,];

let selectedState = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,];

let startT = -1;
let endT = -1;
let bookedTimeList = [];
let date = moment(new Date()).format("YYYY-MM-DD");

export const BookingContentContainer = styled.div`
  margin: 30px 0 30px 20px;
  display: flex;
  align-items: baseline;
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
  margin: 20px;
  display: flex;
  justify-content: flex-end;
`

export const BookingTimeButton = styled.button`
  width: 100%;
  height: 30px;
  background: ${props => getTimeBarItemBackColor(props.index, props.selected, props.isCheck)};
  background-size: 10px 10px;
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
  display: flex;
`

function getTimeBarItemBackColor(index, selected, isCheck) {
    if (bookingState[index]) {
        // 이미 예약된 시간 (조회화면-보라색(#D0B1EE) / 예약화면-빗금)
        return isCheck ? '#D0B1EE' : 'linear-gradient(-45deg, #E9E9E9 25%, transparent 25%, transparent 50%, #E9E9E9 50%, #E9E9E9 75%, transparent 75%, transparent)';
    } else {
        // 예약 가능한 시간 (선택O-보라색(#D0B1EE) / 선택X-연회색(#E9E9E9))
        return selected ? '#D0B1EE' : '#E9E9E9';
    }
}

const BookingTimeButtonItem = (index, isCheck) => {
    const [selectedCheckList, setSelectedCheckList] = useState([]);
    const [isSelected, setSelected] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [bookingInfo, setBookingInfo] = useState(false)
    const {officeId} = useParams();

    const handleMouseEnter = (index) => {
        OfficesAxios.get(`/${officeId}/booking?date=${date}&time=${TimeList[index]}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                const info = Response.data.data;
                if (info === undefined) {
                    setBookingInfo(null)
                } else {
                    setBookingInfo(Response.data.data)
                    setIsOpen(true)
                }
            })
            .catch((Error) => {
                basicError(Error)
                window.alert("예약 정보를 불러오는데 실패하였습니다.")
            });
    }

    const handleMouseLeave = () => {
        setIsOpen(false)
    }

    const handleModalMouseEnter = () => {
        setIsOpen(true)
    }

    const handleModalMouseLeave = () => {
        setIsOpen(false)
    }

    const onClick = (index) => {
        if (isCheck || bookingState[index]) {
            return
        }

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

        for (var i = 0; i < bookedTimeList.length; i++) {
            console.log(bookedTimeList[i])
            if (startT <= getIndexValue(bookedTimeList[i][0]) && endT >= getIndexValue(bookedTimeList[i][1])) {
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
        for (var i = 0; i < 24; i++) {
            selectedState[i] = (i >= startT && i < endT)

            setSelectedCheckList(selectedState);
            const updatedCheckList = [...selectedCheckList];

            updatedCheckList[i] = (i >= startT && i < endT)
            selectedCheckList[i] = (i >= startT && i < endT)
            selectedState[i] = (i >= startT && i < endT)

            const updatedIsSelected = updatedCheckList[i];
            setSelectedCheckList(selectedState);

            setSelectedCheckList(updatedCheckList);
            setSelected(updatedIsSelected);
        }
    }

    return (
        <TimeButtonContainer>
            <BookingTimeButton index={index} startTime={TimeList[index]} endTime={TimeList[index + 1]}
                               selected={selectedState[index]} isCheck={isCheck}
                               onClick={() => isCheck ? {} : onClick(index)}
                               onMouseOver={() => isCheck ? {} : handleMouseEnter(index)}
                               onMouseOut={() => isCheck ? {} : handleMouseLeave()}/>
            {isOpen && (
                <BookingInfoModal info={bookingInfo}
                                  onMouseOver={() => isCheck ? {} : handleModalMouseEnter()}
                                  onMouseOut={() => isCheck ? {} : handleModalMouseLeave()}/>
            )}
            <StartTimeTextContainer>{index}</StartTimeTextContainer>
            {index === 23 ? <EndTimeTextContainer>{index + 1}</EndTimeTextContainer> : null}
        </TimeButtonContainer>
    )
}

export function renderBookingTimeBar(isCheck) {
    const items = [];
    for (let i = 0; i < 24; i++) {
        items.push(BookingTimeButtonItem(i, isCheck));
    }
    return items;
}

function getIndexValue(timeStr) {
    var temp = timeStr.substr(0, 2);
    if (temp.substr(0, 1) === '0') {
        temp = temp.substr(1, 1);
    }
    return parseInt(temp);
}

// 예약 현황 반영 관련
export function setBarBookingState(props) {
    bookingState = Array.from({length: 24}, () => false);
    selectedState = Array.from({length: 24}, () => false);
    bookedTimeList = []
    startT = -1;
    endT = -1;
    for (var i = 0; i < props.length; i++) {
        setBookingTime(props[i].startTime, props[i].endTime)
    }
}

export function setBarDate(getDate) {
    date = getDate;
}

export function setBookingTime(startTime, endTime) {
    bookedTimeList.push([startTime, endTime])
    var start = getIndexValue(startTime)
    var end = getIndexValue(endTime)
    for (var i = start; i < end; i++) {
        bookingState[i] = true;
    }
}

// 예약 시간 관련
function setStartEndTime(index) {
    if (startT === -1) {
        startT = index
    }

    if ((endT - startT) > 2) {   // 3칸 이상 선택된 경우
        if (startT <= index && endT >= index) {
            endT = index + 1
        } else {
            if (startT > index) {
                startT = index
            } else if (endT < index) {
                endT = index + 1
            }
        }
    } else {

        if (endT === -1) {
            endT = index + 1
        }
        if ((endT - startT) === 1 && selectedState[index]) {  // 선택된 유일한 한 칸을 해제하기 위해 클릭한 경우
            startT = -1;
            endT = -1;
            return;
        }
        if (startT >= index) {
            startT = index
        }
        if (startT <= index) {
            endT = index + 1
        }
    }
    setStartTimeStr(startT)
    setEndTimeStr(endT)
}