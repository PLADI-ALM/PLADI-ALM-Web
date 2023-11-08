import React, {useRef} from 'react';
import {AdminBookingAxios, BookingsAxios, OfficesAxios} from 'api/AxiosApi';
import {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import Capsule from 'components/capsule/Capsule';

import OfficeInfo from "components/card/OfficeInfo";
import {
    MainTextContainer,
    SubTextContainer,
    NameSubTitleText,
    DetailSubTitleText
} from 'components/officeBooking/SubTitleBar';
import {StatusText, StatusCircle} from 'components/booking/StatusTag';
import {
    BookingContentContainer,
    BookingTimeContainer,
    renderBookingTimeBar,
    BookingDateTextContainer,
    setBookingTime
} from 'components/officeBooking/BookingTimeBar';
import {BookingPurposeContainer, BookingCapsuleContainer} from 'components/officeBooking/BookingPurpose';
import {findStatus} from 'constants/BookingStatus';
import {BookingDateText} from './OfficeBooking';
import {RightContainer, WhiteContainer, TitleText} from 'components/rightContainer/RightContainer';
import {getToken} from 'utils/IsLoginUtil';
import {basicError} from 'utils/ErrorHandlerUtil';
import {Bar} from '../../myBookings/BookedList';
import {StatusContainer} from 'components/booking/StatusTag';
import {PurposeContainer} from 'components/officeBooking/BookingPurpose';

function OfficeBookingCheck(props) {
    let {bookingId} = useParams();

    const [officeInfo, setOfficeInfo] = useState([]);
    const [bookingInfo, setBookingDetail] = useState([]);
    const [bookingStatus, setStatus] = useState([]);
    const date = useRef("");
    const officeId = useRef("");

    const getBookingInfo = () => {
        if (date.current.length === 0) {
            const dateNow = new Date();
            date.current = dateNow.toISOString().slice(0, 10);
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
                officeId.current = Response.data.data.officeId
                getOfficeInfo(officeId.current)
                setBookingTime(Response.data.data.startTime, Response.data.data.endTime)
            })
            .catch((Error) => {
                basicError(Error)
                console.log(Error)
                window.alert("예약 정보를 불러올 수 없습니댜.")
                window.history.back()
            });
    };

    const getOfficeInfo = () => {
        OfficesAxios.get(`/${officeId.current}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                setOfficeInfo(Response.data.data)
            })
            .catch((Error) => {
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
            <TitleText>회의실 예약 내역</TitleText>

            <WhiteContainer>
                <Bar space={true}>
                    <div>
                        <NameSubTitleText>{officeInfo.name}</NameSubTitleText>
                        <DetailSubTitleText>{officeInfo.location}</DetailSubTitleText>
                    </div>
                    <StatusContainer style={{margin: '0'}} isCheck={'true'}
                                     background={bookingStatus.background}>
                        <StatusCircle color={bookingStatus.color}/>
                        <StatusText color={bookingStatus.color}>{bookingStatus.name}</StatusText>
                    </StatusContainer>
                </Bar>

                <OfficeInfo
                    isDetailPage={true}
                    isHidden={true}
                    key={officeInfo.name}
                    capacity={officeInfo.capacity}
                    facilityList={officeInfo.facilityList}
                    description={officeInfo.description}
                    imgUrl={officeInfo.imgUrl}
                />

                <BookingContentContainer isCheck={'true'}>
                        <Capsule color="purple" text="예약일시"/>
                        {getBookingDate(bookingInfo)}
                </BookingContentContainer>

                <BookingTimeContainer>
                    {renderBookingTimeBar('true')}
                </BookingTimeContainer>

                <BookingPurposeContainer>
                    <Capsule color="purple" text="예약목적"/>
                    <PurposeContainer>
                        {(bookingInfo.memo === null || bookingInfo.memo === "")
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