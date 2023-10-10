import React from 'react';
import styled from "styled-components"
import { AdminBookingAxios, ResourcesAxios, BookingsAxios } from 'api/AxiosApi';
import { useState, useEffect } from "react";
import Capsule from 'components/capsule/Capsule';
import { SubTitleContainer, MainTextContainer, SubTextContainer, SelectedSubTitleText, UnselectedSubTitleText } from 'components/officeBooking/SubTitleBar';
import { BookingPurposeContainer, BookingCapsuleContainer, BookingPurposeTextFieldContainer } from 'components/officeBooking/BookingPurpose';
import ResourceInfo from 'components/resourceInfo/ResourceInfo';
import { BookingContentContainer, RequestButtonContainer, RequestBookingButton } from 'components/officeBooking/BookingTimeBar';
import { StatusText, StatusContainer, StatusCircle } from 'components/booking/StatusTag';
import { findStatus } from 'constants/BookingStatus';
import { RightContainer } from 'components/rightContainer/RightContainer';
import { TitleText, ContentContainer, BookingDateText, PurposeTextarea, DateContainer } from './ResourceBooking';

const MyStatusContainer = styled(StatusContainer)`
    margin-top: 12px;
    margin-right: 12px;
    float: right;
`

var bookingId = 1;
var resourceId = 1;

var startDate = '';
var endDate = '';

function ResourceBookingCheck(props) {
    bookingId = props.isAdmin 
                ? window.location.href.substring(45,) 
                : window.location.href.substring(41,)

    const [resourceInfo, setResourceInfo] = useState([]);
    const [bookingInfo, setBookingDetail] = useState([]);
    const [bookingStatus, setStatus] = useState([]);

    const getResourceInfo = () => {
        ResourcesAxios.get(`/${resourceId}`)
        .then((Response)=>{ setResourceInfo(Response.data.data) })
        .catch((Error)=>{ 
            console.log(Error)
            window.alert("자원 정보를 불러올 수 없습니댜.") 
            // window.history.back()
        });        
    };
    const getBookingInfo = () => {
        (props.isAdmin 
            ? AdminBookingAxios.get(`/resources/${bookingId}`)
            : BookingsAxios.get(`/resources/${bookingId}`))
        .then((Response)=>{ 
            setBookingDetail(Response.data.data)
            setStatus(findStatus(Response.data.data.status))
            resourceId = Response.data.data.resourceId 
            startDate = bookingInfo.startDate
            endDate = bookingInfo.endDate
            getResourceInfo(resourceId)
        })
        .catch((Error)=>{ 
            console.log('Error -> ', Error)
            window.alert("자원 예약 정보를 불러올 수 없습니댜.") 
            // window.history.back()
        });
    };

    useEffect(() => {
        getResourceInfo();
        getBookingInfo();
    }, []);

    return <RightContainer>
        <TitleText>{props.isAdmin ? "자원 예약 내역" : "예약 내역"}</TitleText>

        <ContentContainer isCheck={props.isCheck}>

            <SubTitleContainer>
                <MainTextContainer>
                    <SelectedSubTitleText>{resourceInfo.name}</SelectedSubTitleText>
                </MainTextContainer>
                <SubTextContainer>
                    <UnselectedSubTitleText>{resourceInfo.category}</UnselectedSubTitleText>
                </SubTextContainer>
                <MyStatusContainer isCheck={props.isCheck} background={bookingStatus.background}>
                    <StatusCircle color={bookingStatus.color} />
                    <StatusText color={bookingStatus.color}>{bookingStatus.name}</StatusText>
                </MyStatusContainer>
            </SubTitleContainer>


            <ResourceInfo isTItleHidden={true}
                title={"title"}
                category={"category"}
                description={"description"}
            />

            {/* 예약일시 */}
            <BookingContentContainer>
                <BookingCapsuleContainer>
                    <Capsule color="purple" text="예약일시" />
                </BookingCapsuleContainer>
                <DateContainer>
                    <BookingDateText>{startDate || "시작일"}</BookingDateText>
                    <BookingDateText> ~ </BookingDateText>
                    <BookingDateText>{endDate || "마감일"}</BookingDateText>

                </DateContainer>
            </BookingContentContainer>

            <BookingContentContainer isCheck={props.isCheck}>
                <BookingCapsuleContainer>
                    <Capsule color="purple" text="반납일자" />
                </BookingCapsuleContainer>
                <BookingDateText>{getReturnDateStr(bookingInfo.returnDateTime)}</BookingDateText>
            </BookingContentContainer>


            {/* 예약목적 */}
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
                        disabled />
                </BookingPurposeTextFieldContainer>
            </BookingPurposeContainer>


        </ContentContainer>
    </RightContainer>
}
export default ResourceBookingCheck;


function getReturnDateStr(returnDateTime) {
    return (returnDateTime == null) ? "미반납" : returnDateTime
}