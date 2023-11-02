import React from 'react';
import { AdminBookingAxios, BookingsAxios, OfficesAxios } from 'api/AxiosApi';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Capsule from 'components/capsule/Capsule';

import OfficeInfo from "components/officeInfo/OfficeInfo";
import { MainTextContainer, SubTextContainer, SelectedSubTitleText, UnselectedSubTitleText } from 'components/officeBooking/SubTitleBar';
import { StatusText, StatusCircle } from 'components/booking/StatusTag';
import { BookingContentContainer, BookingTimeContainer, renderBookingTimeBar, BookingDateTextContainer, setBookingTime } from 'components/officeBooking/BookingTimeBar';
import { BookingPurposeContainer, BookingCapsuleContainer } from 'components/officeBooking/BookingPurpose';
import { findStatus } from 'constants/BookingStatus';
import { BookingDateText } from './OfficeBooking';
import { RightContainer, WhiteContainer, TitleText } from 'components/rightContainer/RightContainer';
import { getToken } from 'utils/IsLoginUtil';
import { basicError } from 'utils/ErrorHandlerUtil';
import { Bar } from '../../myBookings/BookedList';
import { StatusContainer } from 'components/booking/StatusTag';
import { PurposeContainer } from 'components/officeBooking/BookingPurpose';

var officeId = 1;

function OfficeBookingCheck(props) {
    let { bookingId } = useParams();

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
            : BookingsAxios.get(`/offices/${bookingId}`, {
                headers: {
                    Authorization: getToken()
                }
            }))
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

    const getOfficeInfo = () => {
        OfficesAxios.get(`/${officeId}`, {
            headers: {
                Authorization: getToken()
            }
        })
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

    useEffect(() => {
        getBookingInfo();
        getOfficeInfo();
    }, []);

    return (
        <RightContainer>
            <TitleText>{props.isAdmin ? "회의실 예약 내역" : "예약 내역"}</TitleText>

            <WhiteContainer style={{display:'inline'}}>
                <Bar style={{position:'static'}}>
                    <MainTextContainer>
                        <SelectedSubTitleText>{officeInfo.name}</SelectedSubTitleText>
                    </MainTextContainer>
                    <SubTextContainer>
                        <UnselectedSubTitleText>{officeInfo.location}</UnselectedSubTitleText>
                    </SubTextContainer>
                    <StatusContainer style={{margin:'12px 12px 0 0 ', float:'right'}} isCheck={'true'} background={bookingStatus.background}>
                        <StatusCircle color={bookingStatus.color} />
                        <StatusText color={bookingStatus.color}>{bookingStatus.name}</StatusText>
                    </StatusContainer>
                </Bar>

                <OfficeInfo isDetailPage={true}
                    key={officeInfo.name}
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

                    <PurposeContainer>
                        {(bookingInfo.memo === null) 
                            ? '* 저장된 예약목적이 없습니다'
                            : bookingInfo.memo}
                    </PurposeContainer>
                </BookingPurposeContainer>

            </WhiteContainer>
        </RightContainer>
    );
}
export default OfficeBookingCheck;

function getBookingDate(info) {
    var date = info.date + " " + info.startTime + " ~ " + info.endTime;
    date = date.replaceAll('-', '.');
    return <BookingDateText>{date}</BookingDateText>
}