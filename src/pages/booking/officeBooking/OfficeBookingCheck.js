import React from 'react';
import styled from "styled-components"
import { AdminBookingAxios, BookingsAxios, OfficesAxios } from 'api/AxiosApi';
import { useState, useEffect } from "react";
import Capsule from 'components/capsule/Capsule';

import OfficeInfo from "components/officeInfo/OfficeInfo";
import { SubTitleContainer, MainTextContainer, SubTextContainer, SelectedSubTitleText, UnselectedSubTitleText } from 'components/officeBooking/SubTitleBar';
import { StatusText, StatusCircle } from 'components/booking/StatusTag';
import { BookingContentContainer, BookingTimeContainer, renderBookingTimeBar, BookingDateTextContainer, setBookingTime } from 'components/officeBooking/BookingTimeBar';
import { BookingPurposeContainer, BookingCapsuleContainer, BookingPurposeTextFieldContainer } from 'components/officeBooking/BookingPurpose';
import { findStatus } from 'constants/BookingStatus';
import { MyStatusContainer, BookingDateText, PurposeTextarea } from './OfficeBooking';
import { RightContainer, WhiteContainer, TitleText } from 'components/rightContainer/RightContainer';
import { getToken } from 'utils/IsLoginUtil';
import { basicError } from 'utils/ErrorHandlerUtil';

var bookingId = 1;
var officeId = 1;

const CustomWhiteContainer = styled(WhiteContainer)`
    display: block;
`

function OfficeBookingCheck(props) {
    bookingId = props.isAdmin
        ? window.location.href.substring(43,)
        : window.location.href.substring(39,)

    const [officeInfo, setOfficeInfo] = useState([]);
    const [bookingInfo, setBookingDetail] = useState([]);
    const [bookingStatus, setStatus] = useState([]);
    var [date, setDate] = useState("");

    const getBookingInfo = () => {
        if (date.length == 0) {
            const dateNow = new Date();
            date = dateNow.toISOString().slice(0, 10);
        }

        (props.isAdmin
            ? AdminBookingAxios.get(`/offices/${bookingId}`, {
                headers: {
                    Authorization: getToken()
                }
            })
            : BookingsAxios.get(`/offices/${bookingId}`))
            .then((Response) => {
                setBookingDetail(Response.data.data)
                setStatus(findStatus(Response.data.data.bookingStatus))
                officeId = Response.data.data.officeId
                getOfficeInfo(officeId)
                setBookingTime(Response.data.data.startTime, Response.data.data.endTime)
            })
            .catch((Error)=>{ 
                basicError(Error) 
                console.log(Error)
                window.alert("예약 정보를 불러올 수 없습니댜.")
                window.history.back()
            });
    };

    const getOfficeInfo = (id) => {
        OfficesAxios.get(`/${officeId}`)
            .then((Response) => {
                console.log(Response.data.data)
                setOfficeInfo(Response.data.data)
            })
            .catch((Error)=>{ 
                basicError(Error) 
                console.log(Error)
                window.alert("회의실 정보를 불러올 수 없습니댜.")
                window.history.back()
            });
    };

    useEffect(() => {
        getBookingInfo();
        getOfficeInfo();
    }, []);

    return (
        <RightContainer>
            <TitleText>{props.isAdmin ? "회의실 예약 내역" : "예약 내역"}</TitleText>

            <CustomWhiteContainer>

                <SubTitleContainer>
                    <MainTextContainer>
                        <SelectedSubTitleText>{officeInfo.name}</SelectedSubTitleText>
                    </MainTextContainer>
                    <SubTextContainer>
                        <UnselectedSubTitleText>{officeInfo.location}</UnselectedSubTitleText>
                    </SubTextContainer>
                    <MyStatusContainer isCheck={'true'} background={bookingStatus.background}>
                        <StatusCircle color={bookingStatus.color} />
                        <StatusText color={bookingStatus.color}>{bookingStatus.name}</StatusText>
                    </MyStatusContainer>
                </SubTitleContainer>

                <OfficeInfo isDetailPage={true}
                    key={officeInfo.name}
                    capacity={officeInfo.capacity}
                    facilityList={officeInfo.facilityList}
                    description={officeInfo.description}
                />

                <BookingContentContainer isCheck={'true'}>
                    <BookingCapsuleContainer>
                        <Capsule color="purple" text="예약일시" />
                    </BookingCapsuleContainer>
                    <BookingDateTextContainer>
                        {getBookingDate(bookingInfo)}
                    </BookingDateTextContainer>
                </BookingContentContainer>

                <BookingTimeContainer>
                    {renderBookingTimeBar('true')}
                </BookingTimeContainer>


                <BookingPurposeContainer>
                    <BookingCapsuleContainer>
                        <Capsule color="purple" text="예약목적" />
                    </BookingCapsuleContainer>

                    <BookingPurposeTextFieldContainer>
                        <PurposeTextarea id='bookingPurpose'
                            cols='135' rows='5'
                            maxLength='100'
                            value={bookingInfo.memo}
                            readOnly="readOnly"
                            disabled></PurposeTextarea>
                    </BookingPurposeTextFieldContainer>
                </BookingPurposeContainer>

            </CustomWhiteContainer>
        </RightContainer>
    );
}
export default OfficeBookingCheck;

function getBookingDate(info) {
    var date = info.date + " " + info.startTime + " ~ " + info.endTime;
    date = date.replaceAll('-', '.');
    return <BookingDateText>{date}</BookingDateText>
}