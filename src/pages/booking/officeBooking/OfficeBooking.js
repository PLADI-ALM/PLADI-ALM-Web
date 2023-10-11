import React from 'react';
import styled from "styled-components"
import { OfficesAxios, BookingsAxios } from 'api/AxiosApi';
import { useState, useEffect } from "react";
import Capsule from 'components/capsule/Capsule';

import OfficeInfo from "components/officeInfo/OfficeInfo";
import { SubTitleContainer, MainTextContainer, SubTextContainer, SelectedSubTitleText, UnselectedSubTitleText } from 'components/officeBooking/SubTitleBar';
import { StatusText, StatusContainer, StatusCircle } from 'components/booking/StatusTag';
import { DatePicker } from 'components/searchBar/SearchBar';
import {
    BookingContentContainer, BookingTimeContainer, renderBookingTimeBar, BookingDateTextContainer, setBookingState, setBookingTime,
    RequestBookingButton, requestBookingOffice, RequestButtonContainer
} from 'components/officeBooking/BookingTimeBar';
import { BookingPurposeContainer, BookingCapsuleContainer, BookingPurposeTextFieldContainer } from 'components/officeBooking/BookingPurpose';
import { RightContainer, WhiteContainer } from 'components/rightContainer/RightContainer';

var bookingDate = '';
var bookingId = 1;
var officeId = 1;

const CustomWhiteContainer = styled(WhiteContainer)`
    display: block;
`

export const TitleText = styled.p`
    color: #4C4C4C;
    font-family: NanumSquare_ac;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    align: left;
    display: flex;
    margin-bottom: 10px;
`

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

export const MyStatusContainer = styled(StatusContainer)`
    margin-top: 12px;
    margin-right: 12px;
    float: right;
`


function OfficeBooking(props) {
    officeId = window.location.href.substring(36,)

    const [officeInfo, setOfficeInfo] = useState([]);
    const [bookingInfo, setBookingDetail] = useState([]);
    const [bookingStatus, setStatus] = useState([]);
    var [date, setDate] = useState("");

    const changeDate = (e) => {
        if (bookingDate === '') { bookingDate = new Date().toISOString().slice(0, 10) }
        setDate(e.target.value)
        bookingDate = e.target.value;
    }

    const getBookingTimeState = () => {
        if (date.length === 0) {
            const dateNow = new Date();
            date = dateNow.toISOString().slice(0, 10);
            bookingDate = date;
        }

        OfficesAxios.get(`/${officeId}/booking-state?date=${bookingDate}`)
            .then((Response) => {
                setBookingState(Response.data.data.bookedTimes)
            })
            .catch((Error)=>{ basicError(Error) });
    };

    const getOfficeInfoForBooking = (id) => {
        OfficesAxios.get(`/${officeId}`)
            .then((Response) => {
                console.log(Response.data.data)
                setOfficeInfo(Response.data.data)
            })
            .catch((Error)=>{ basicError(Error) });
    };

    useEffect(() => {
        getBookingTimeState();
        getOfficeInfoForBooking();
    }, []);

    return (
        <RightContainer>
            <TitleText>회의실 예약</TitleText>

            <CustomWhiteContainer>

                <SubTitleContainer>
                    <MainTextContainer>
                        <SelectedSubTitleText>{officeInfo.name}</SelectedSubTitleText>
                    </MainTextContainer>
                    <SubTextContainer>
                        <UnselectedSubTitleText>{officeInfo.location}</UnselectedSubTitleText>
                    </SubTextContainer>
                    <MyStatusContainer isCheck={props.isCheck} background={bookingStatus.background}>
                        <StatusCircle color={bookingStatus.color} />
                        <StatusText color={bookingStatus.color}>{bookingStatus.name}</StatusText>
                    </MyStatusContainer>
                </SubTitleContainer>

                <OfficeInfo isDetailPage={true}
                    hidden={props.isCheck}
                    key={officeInfo.name}
                    name={officeInfo.name}
                    location={officeInfo.location}
                    capacity={officeInfo.capacity}
                    facilityList={officeInfo.facilityList}
                    description={officeInfo.description}
                />

                <BookingContentContainer isCheck={'true'}>
                    <BookingCapsuleContainer>
                        <Capsule color="purple" text="예약일시" />
                    </BookingCapsuleContainer>
                    <BookingDateTextContainer>
                        {getBookingDate(false, bookingInfo, changeDate)}
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
                        <PurposeTextarea id='bookingPurpose' cols='135' rows='5' maxLength='100'></PurposeTextarea>
                    </BookingPurposeTextFieldContainer>
                </BookingPurposeContainer>


                <RequestButtonContainer isCheck={props.isCheck}>
                    <RequestBookingButton onClick={requestBookingOffice}>예약</RequestBookingButton>
                </RequestButtonContainer>


            </CustomWhiteContainer>
        </RightContainer>
    );
}
export default OfficeBooking;

function getBookingDate(info, changeDate) {
    var date = info.date + " " + info.startTime + " ~ " + info.endTime;
    date = date.replaceAll('-', '.');
    return <DatePicker type="date" onChange={changeDate} value={bookingDate} />
}


function requestBooking(bookingPurpose, startT, endT) {
    // console.log("예약일시 : ", bookingDate);
    // console.log("예약목적 : ", bookingPurpose);
    // console.log("시작시간 : ", startT);
    // console.log("마감시간 : ", endT);

    if (window.confirm("예약하시겠습니까?")) {
        OfficesAxios.post(`/${officeId}/booking`,
            {
                date: bookingDate,
                startTime: startT,
                endTime: endT,
                memo: bookingPurpose
            }
        )
            .then(function (response) {
                if (response.data.status === '200') { alert('예약에 성공하였습니다!') }
                else { alert(response.data.message); }
            })
            .catch((Error)=>{ basicError(Error) });
    }
}
export { requestBooking };