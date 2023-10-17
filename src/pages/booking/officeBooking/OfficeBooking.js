import React from 'react';
import styled from "styled-components"
import { OfficesAxios, BookingsAxios } from 'api/AxiosApi';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Capsule from 'components/capsule/Capsule';

import OfficeInfo from "components/officeInfo/OfficeInfo";
import { MainTextContainer, SubTextContainer, SelectedSubTitleText, UnselectedSubTitleText } from 'components/officeBooking/SubTitleBar';
import { DatePicker } from 'components/searchBar/SearchBar';
import {
    BookingContentContainer, BookingTimeContainer, renderBookingTimeBar, BookingDateTextContainer, setBookingState, RequestButtonContainer, requestBookingOffice
} from 'components/officeBooking/BookingTimeBar';
import { BookingPurposeContainer, BookingCapsuleContainer, BookingPurposeTextFieldContainer } from 'components/officeBooking/BookingPurpose';
import { RightContainer, WhiteContainer, TitleText } from 'components/rightContainer/RightContainer';
import { basicError } from 'utils/ErrorHandlerUtil';
import SmallButton from 'components/button/SmallButton';
import { Bar } from '../bookedList/BookedList';
import { getToken } from 'utils/IsLoginUtil';
import moment from 'moment';

var bookingDate = '';
var startTimeStr = '';
var endTimeStr = '';

export const BookingDateText = styled.p`
    margin: 6px 0 0 0;
    color: #575757;
    font-family: NanumSquare_ac;
    font-size: 22px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
`

export const PurposeTextarea = styled.textarea`
    width: 100%; 
    padding: 6px 0 0 18px;
    border-radius: 12px;
    border-width:1;
    border-style:solid;
    border-color:black;
    background-color: #ffffff;
    font-family: NanumSquare_ac;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
    margin: 0 10px 0 10px;
`


function OfficeBooking(props) {
    let { officeId } = useParams();

    const [officeInfo, setOfficeInfo] = useState([]);   // 회의실 정보
    const [bookingInfo, setBookingDetail] = useState([]);   // 
    var [date, setDate] = useState(""); // 예약날짜 변경

    if (date.length === 0) {
        date = moment(new Date()).format("YYYY-MM-DD")
        bookingDate = date;
    }

    // 달력 내 날짜가 바뀌는 경우 -> 예약일 변수 값 변경
    const changeDate = (e) => {
        if (bookingDate === '') { bookingDate = new Date().toISOString().slice(0, 10) }
        setDate(e.target.value)
        bookingDate = e.target.value;
        getBookingTimeState()
    }

    // 일자별 예약 현황 받아오기
    const getBookingTimeState = () => {
        OfficesAxios.get(`/${officeId}/booking-state?date=${bookingDate}`)
            .then((Response) => {
                setBookingDetail(Response.data.data.bookedTimes)
                setBookingState(Response.data.data.bookedTimes)
            })
            .catch((Error)=>{ 
                basicError(Error) 
                console.log(Error)
                window.alert("예약 현황을 불러오는데 실패하였습니다.")
                window.history.back()
            });
    };

    // 회의실 정보 받아오기
    const getOfficeInfoForBooking = (id) => {
        OfficesAxios.get(`/${officeId}`)
            .then((Response) => {
                setOfficeInfo(Response.data.data)
            })
            .catch((Error)=>{ 
                basicError(Error) 
                console.log(Error)
                window.alert("회의실 정보를 불러올 수 없습니댜.")
                window.history.back()
            });
    };

    const requestBooking = () => {
        var bookingPurpose = document.getElementById("bookingPurpose").value;
        if (endTimeStr === 24) { endTimeStr = 0 }
    
        if (window.confirm("예약하시겠습니까?")) {
            OfficesAxios.post(`/${officeId}/booking`,
                {
                    date: bookingDate,
                    startTime: getTimeStr(startTimeStr),
                    endTime: getTimeStr(endTimeStr),
                    memo: bookingPurpose
                },
                {
                    headers: { Authorization: getToken() }
                },
            )
                .then(function (response) {
                    if (response.data.status === '200') { alert('예약에 성공하였습니다!') }
                    else { alert(response.data.message); }
                    getBookingTimeState()
                })
                .catch((Error)=>{ 
                    basicError(Error) 
                    console.log(Error)
                    window.alert("예약에 실패하였습니다.")
                });
        }
    }

    useEffect(() => {
        getBookingTimeState();
        getOfficeInfoForBooking();
    }, []);

    return (
        <RightContainer>
            <TitleText>회의실 예약</TitleText>

            <WhiteContainer>
                <Bar />
                <div style={{zIndex:1}}>
                    <MainTextContainer>
                        <SelectedSubTitleText>{officeInfo.name}</SelectedSubTitleText>
                    </MainTextContainer>
                    <SubTextContainer>
                        <UnselectedSubTitleText>{officeInfo.location}</UnselectedSubTitleText>
                    </SubTextContainer>
                </div>

                <OfficeInfo isDetailPage={true}
                    hidden={props.isCheck}
                    key={officeInfo.name}
                    name={officeInfo.name}
                    location={officeInfo.location}
                    capacity={officeInfo.capacity}
                    facilityList={officeInfo.facilityList}
                    description={officeInfo.description}
                    imgUrl={officeInfo.imgUrl}
                />
                

                <BookingContentContainer isCheck={'true'}>
                    <BookingCapsuleContainer>
                        <Capsule color="purple" text="예약일시" />
                    </BookingCapsuleContainer>
                    <BookingDateTextContainer>
                        <DatePicker style={{padding: '5px 0 0 10px', fontSize: '21px', width: '160px'}} type="date" onChange={changeDate} value={bookingDate} />
                    </BookingDateTextContainer>
                </BookingContentContainer>

                <BookingTimeContainer>
                    {renderBookingTimeBar(false)}
                </BookingTimeContainer>

                <BookingPurposeContainer>
                    <BookingCapsuleContainer>
                        <Capsule color="purple" text="예약목적" />
                    </BookingCapsuleContainer>

                    <BookingPurposeTextFieldContainer>
                        <PurposeTextarea id='bookingPurpose'
                            cols='135'
                            rows='4'
                            maxLength='100' />
                    </BookingPurposeTextFieldContainer>
                </BookingPurposeContainer>


                <RequestButtonContainer isCheck={props.isCheck}>
                    <SmallButton name={'예약'} click={requestBooking}></SmallButton>
                </RequestButtonContainer>


            </WhiteContainer>
        </RightContainer>
    );
}
export default OfficeBooking;

function setStartTimeStr(startTime) { startTimeStr = startTime }
export { setStartTimeStr };

function setEndTimeStr(endTime) { endTimeStr = endTime }
export { setEndTimeStr };

function getTimeStr(props) {
    var str = ''
    if (props < 10) { str = '0' + props + ':00' }
    else { str = props + ':00' }
    return str
}