import React from 'react';
import styled from "styled-components"
import axios from "axios";
import { OfficesAxios, BookingsAxios } from 'api/AxiosApi';
import { useState, useEffect } from "react";
import Capsule from 'components/capsule/Capsule';

import OfficeInfo from "components/officeInfo/OfficeInfo";
import { SubTitleContainer, MainTextContainer, SubTextContainer, SelectedSubTitleText, UnselectedSubTitleText } from 'components/officeBooking/SubTitleBar';
import { StatusText, StatusCircle } from 'components/booking/StatusTag';
import { BookingContentContainer, BookingTimeContainer, renderBookingTimeBar, BookingDateTextContainer, setBookingTime } from 'components/officeBooking/BookingTimeBar';
import { BookingPurposeContainer, BookingCapsuleContainer, BookingPurposeTextFieldContainer } from 'components/officeBooking/BookingPurpose';
import { findStatus } from 'constants/BookingStatus';
import { Container, TitleText, ContentContainer, MyStatusContainer, BookingDateText, PurposeTextarea } from './OfficeBooking';

var bookingDate = '';
var bookingId = 1;
var officeId = 1;

function OfficeBookingCheck(props) {
    bookingId = window.location.href.substring(39,)

    const [officeInfo, setOfficeInfo] = useState([]);
    const [bookingInfo, setBookingDetail] = useState([]);
    const [bookingStatus, setStatus] = useState([]);
    var [date, setDate] = useState("");

    const getBookingTimeState = () => {
        if (date.length == 0) {
            const dateNow = new Date();
            date = dateNow.toISOString().slice(0, 10);
            bookingDate = date;
        }

        BookingsAxios.get("offices/" + bookingId)
        .then((Response) => {
            setBookingDetail(Response.data.data)
            setStatus(findStatus(Response.data.data.bookingStatus))
            bookingDate = Response.data.data.date
            officeId = Response.data.data.officeId
            getOfficeInfoForBooking(officeId)
            setBookingTime(Response.data.data.startTime, Response.data.data.endTime)
        })
        .catch((Error) => {
            console.log('Error -> ', Error)
            window.alert("예약 정보를 불러올 수 없습니댜.")
            window.history.back()
        });
    };

    const getOfficeInfoForBooking = (id) => {
        console.log("officeId -> ", officeId)
        OfficesAxios.get("" + officeId)
            .then((Response) => {
                console.log(Response.data.data)
                setOfficeInfo(Response.data.data)
            })
            .catch((Error) => {
                console.log(Error)
                window.alert("정보를 불러올 수 없습니댜.")
                // window.history.back()
            });
    };

    useEffect(() => {
        getBookingTimeState();
        getOfficeInfoForBooking();
    }, []);

    return (
        <Container>
            <TitleText>{props.title}</TitleText>

            <ContentContainer>

                <SubTitleContainer>
                    <MainTextContainer>
                        <SelectedSubTitleText>{officeInfo.name}</SelectedSubTitleText>
                    </MainTextContainer>
                    <SubTextContainer>
                        <UnselectedSubTitleText>{officeInfo.location}</UnselectedSubTitleText>
                    </SubTextContainer>
                    <MyStatusContainer isCheck={true} background={bookingStatus.background}>
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

                {/* 예약일시 */}
                <BookingContentContainer isCheck={'true'}>
                    <BookingCapsuleContainer>
                        <Capsule color="purple" text="예약일시" />
                    </BookingCapsuleContainer>
                    <BookingDateTextContainer>
                        {getBookingDate(bookingInfo)}
                    </BookingDateTextContainer>
                </BookingContentContainer>

                <BookingTimeContainer>
                    {renderBookingTimeBar(props.isCheck)}
                </BookingTimeContainer>


                {/* 예약목적 */}
                <BookingPurposeContainer>
                    <BookingCapsuleContainer>
                        <Capsule color="purple" text="예약목적" />
                    </BookingCapsuleContainer>

                    <BookingPurposeTextFieldContainer>
                        <PurposeTextarea id='bookingPurpose' cols='135' rows='5' maxLength='100' value={bookingInfo.memo} readOnly="readOnly" disabled></PurposeTextarea>
                    </BookingPurposeTextFieldContainer>
                </BookingPurposeContainer> 

            </ContentContainer>
        </Container>
    );
}
export default OfficeBookingCheck;

function getBookingDate(info) {
    var date = info.date + " " + info.startTime + " ~ " + info.endTime;
    date = date.replaceAll('-', '.');
    return <BookingDateText>{date}</BookingDateText>
}