import React from 'react';
import styled from "styled-components"
import axios from "axios";
import { BookingsAxios } from 'api/AxiosApi';
import { useState, useEffect } from "react";
import Capsule from 'components/capsule/Capsule';
import { SubTitleContainer, MainTextContainer, SubTextContainer, SelectedSubTitleText, UnselectedSubTitleText } from 'components/officeBooking/SubTitleBar';
import { BookingPurposeContainer, BookingCapsuleContainer, BookingPurposeTextFieldContainer } from 'components/officeBooking/BookingPurpose';
import ResourceInfo from 'components/resourceInfo/ResourceInfo';
import { BookingContentContainer, RequestButtonContainer, RequestBookingButton } from 'components/officeBooking/BookingTimeBar';
import { StatusText, StatusContainer, StatusCircle } from 'components/booking/StatusTag';

var startDate = '2023.10.01'
var endDate = '2023.10.15'

export const Container = styled.div`
    width: 87%;
    heigth: 100%;
    margin-left: 80px;
    margin-top: 70px;
    margin-bottom: -70px;
`

export const TitleText = styled.p`
    color: #4C4C4C;
    font-family: NanumSquare_ac;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    align: left;
    width: 170px;
    margin: 0;
`

export const ContentContainer = styled.div`
    width: 90%;
    height: ${props => (props.isCheck == 'true') ? '80%' : '85%'};;
    border-radius: 12px;
    background: #FFF;
    box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.25);
    margin-top: 20px;
`

export const BookingDateText = styled.p`
    margin: 5px 0 0 0;
    padding-left: 10px;
    color: #575757;
    font-family: NanumSquare_ac;
    font-size: 22px;
    font-weight: 400;
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

function ResourceBooking(props) {
    return <Container>
        <TitleText>{(props.isCheck == 'true') ? "예약 내역" : "자원 예약"}</TitleText>

        <ContentContainer isCheck={props.isCheck}>

            <SubTitleContainer>
                <MainTextContainer>
                    <SelectedSubTitleText>{props.isCheck ? "자원명" : "resourceInfo.title"}</SelectedSubTitleText>
                </MainTextContainer>
                <SubTextContainer>
                    <UnselectedSubTitleText>{props.isCheck ? "카테고리" : "resourceInfo.category"}</UnselectedSubTitleText>
                </SubTextContainer>
                <StatusContainer isCheck={props.isCheck}>
                    {/* bookingStatus */}
                    <StatusText>•사용완료</StatusText>
                </StatusContainer>
            </SubTitleContainer>


            <ResourceInfo isTItleHidden={true}
                title={"title"}
                category={"category"}
                description={"description"}
            />

            {/* 예약일시 */}
            <BookingContentContainer isCheck={'true'}>
                <BookingCapsuleContainer>
                    <Capsule color="purple" text="예약일시" />
                </BookingCapsuleContainer>
                <BookingDateText>{startDate + " ~ " + endDate}</BookingDateText>
            </BookingContentContainer>

            {/* <BookingTimeContainer>
                {renderBookingTimeBar(props.isCheck)}
            </BookingTimeContainer> */}

            <BookingContentContainer isCheck={props.isCheck}>
                <BookingCapsuleContainer>
                    <Capsule color="purple" text="반납일자" />
                </BookingCapsuleContainer>
                <BookingDateText>{"2023-10-09 09:14"}</BookingDateText>
            </BookingContentContainer>


            {/* 예약목적 */}
            <BookingPurposeContainer>
                <BookingCapsuleContainer>
                    <Capsule color="purple" text="예약목적" />
                </BookingCapsuleContainer>

                <BookingPurposeTextFieldContainer>
                    {getPurposeTextField(props.isCheck, "bookingInfo.memo")}
                </BookingPurposeTextFieldContainer>
            </BookingPurposeContainer>


            <RequestButtonContainer isCheck={props.isCheck}>
                <RequestBookingButton onClick={requestBookingOffice}>예약</RequestBookingButton>
            </RequestButtonContainer>


        </ContentContainer>
    </Container>
}
export default ResourceBooking;

function getPurposeTextField(isCheck, content) {
    if (isCheck == 'true') {
        return <PurposeTextarea id='bookingPurpose' cols='135' rows='5' maxLength='100' value={content} readOnly="readOnly" disabled></PurposeTextarea>
    } else {
        return <PurposeTextarea id='bookingPurpose' cols='135' rows='5' maxLength='100'></PurposeTextarea>
    }
}


function requestBookingOffice() {
    alert("자원을 예약하시겠습니까?")
}