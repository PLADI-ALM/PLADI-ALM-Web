import React from 'react';
import { AdminBookingAxios, ResourcesAxios, BookingsAxios } from 'api/AxiosApi';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Capsule from 'components/capsule/Capsule';
import { MainTextContainer, SubTextContainer, SelectedSubTitleText, UnselectedSubTitleText } from 'components/officeBooking/SubTitleBar';
import { BookingPurposeContainer, BookingCapsuleContainer } from 'components/officeBooking/BookingPurpose';
import ResourceInfo from 'components/resourceInfo/ResourceInfo';
import { BookingContentContainer } from 'components/officeBooking/BookingTimeBar';
import { StatusText, StatusContainer, StatusCircle } from 'components/booking/StatusTag';
import { findStatus } from 'constants/BookingStatus';
import { RightContainer, WhiteContainer,TitleText } from 'components/rightContainer/RightContainer';
import { BookingDateText } from './ResourceBooking';
import { getToken } from 'utils/IsLoginUtil';
import { basicError } from 'utils/ErrorHandlerUtil';
import { Bar } from '../bookedList/BookedList';
import { PurposeContainer } from 'components/officeBooking/BookingPurpose';

var resourceId = 1;

function ResourceBookingCheck(props) {
    let { bookingId } = useParams();

    const [resourceInfo, setResourceInfo] = useState([]);
    const [bookingInfo, setBookingDetail] = useState([]);
    const [bookingStatus, setStatus] = useState([]);

    const getResourceInfo = () => {
        ResourcesAxios.get(`/${resourceId}`)
        .then((Response)=>{ setResourceInfo(Response.data.data) })
        .catch((Error)=>{ 
            basicError(Error) 
            console.log(Error)
            window.alert("자원 정보를 불러올 수 없습니댜.")
            window.history.back()
        });
    };
    const getBookingInfo = () => {
        (props.isAdmin 
            ? AdminBookingAxios.get(`/resources/${bookingId}`, {
                headers: {
                    Authorization: getToken()
                }
            })
            : BookingsAxios.get(`/resources/${bookingId}`))
        .then((Response)=>{ 
            setBookingDetail(Response.data.data)
            setStatus(findStatus(Response.data.data.status))
            resourceId = Response.data.data.resourceId 
            getResourceInfo(resourceId)
        })
        .catch((Error)=>{ 
            basicError(Error) 
            console.log(Error)
            window.alert("예약 정보를 불러올 수 없습니댜.")
            window.history.back()
        });
    };

    useEffect(() => {
        getResourceInfo();
        getBookingInfo();
    }, []);

    return <RightContainer>
        <TitleText>{props.isAdmin ? "자원 예약 내역" : "예약 내역"}</TitleText>

        <WhiteContainer style={{display:'inline'}}>
            <Bar style={{position:'static'}}>
                <MainTextContainer>
                    <SelectedSubTitleText>{resourceInfo.name}</SelectedSubTitleText>
                </MainTextContainer>
                <SubTextContainer>
                    <UnselectedSubTitleText>{resourceInfo.category}</UnselectedSubTitleText>
                </SubTextContainer>
                <StatusContainer style={{margin:'10px 12px 0 0', float:'right'}} isCheck={'true'} background={bookingStatus.background}>
                    <StatusCircle color={bookingStatus.color} />
                    <StatusText color={bookingStatus.color}>{bookingStatus.name}</StatusText>
                </StatusContainer>
            </Bar>

            <ResourceInfo description={resourceInfo.description} 
                        imgUrl = {resourceInfo.imgUrl} />

            <BookingContentContainer>
                <BookingCapsuleContainer>
                    <Capsule color="purple" text="예약일시" />
                </BookingCapsuleContainer>
                <div>
                    <BookingDateText>{bookingInfo.startDate || "시작일"}</BookingDateText>
                    <BookingDateText> ~ </BookingDateText>
                    <BookingDateText>{bookingInfo.endDate || "마감일"}</BookingDateText>
                </div>
            </BookingContentContainer>

            <BookingContentContainer isCheck={props.isCheck}>
                <BookingCapsuleContainer>
                    <Capsule color="purple" text="반납일자" />
                </BookingCapsuleContainer>
                <BookingDateText>{getReturnDateStr(bookingInfo.returnDateTime)}</BookingDateText>
            </BookingContentContainer>

            <BookingPurposeContainer>
                <BookingCapsuleContainer>
                    <Capsule color="purple" text="예약목적" />
                </BookingCapsuleContainer>

                <PurposeContainer>
                    {(bookingInfo.memo === null) 
                        ? '* 저장된 예약목적이 없습니다'
                        : bookingInfo.memo}
                </PurposeContainer>
            </BookingPurposeContainer>
            

        </WhiteContainer>
    </RightContainer>
}
export default ResourceBookingCheck;


function getReturnDateStr(returnDateTime) {
    return (returnDateTime == null) ? "미반납" : returnDateTime
}