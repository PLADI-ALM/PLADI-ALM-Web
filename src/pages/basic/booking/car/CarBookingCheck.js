import React, {useEffect, useRef, useState} from 'react';
import {AdminBookingAxios, BookingsAxios, ResourcesAxios} from 'api/AxiosApi';
import {useParams} from 'react-router-dom';
import Capsule from 'components/capsule/Capsule';
import {DetailSubTitleText, NameSubTitleText} from 'components/officeBooking/SubTitleBar';
import {BookingPurposeContainer, PurposeContainer} from 'components/officeBooking/BookingPurpose';
import {BookingContentContainer} from 'components/officeBooking/BookingTimeBar';
import {StatusCircle, StatusContainer, StatusText} from 'components/booking/StatusTag';
import {findStatus} from 'constants/BookingStatus';
import {RightContainer, TitleText, WhiteContainer} from 'components/rightContainer/RightContainer';
import {BookingDateText} from './CarBooking';
import {getToken} from 'utils/IsLoginUtil';
import {basicError} from 'utils/ErrorHandlerUtil';
import {Bar} from '../../myBookings/BookedList';
import ResourceDetailInfo from "../../../../components/card/ResourceDetailInfo";

function CarBookingCheck(props) {
    let {bookingId} = useParams();

    const [carInfo, setCarInfo] = useState([]);
    const [bookingInfo, setBookingDetail] = useState([]);
    const [bookingStatus, setStatus] = useState([]);
    const carId = useRef("");

    const getCarInfo = () => {
        ResourcesAxios.get(`/${carId.current}`,
            {
                headers: {
                    Authorization: getToken()
                }
            })
            .then((Response) => {
                setCarInfo(Response.data.data)
            })
            .catch((Error) => {
                basicError(Error)
                console.log(Error)
                window.alert("장비 정보를 불러올 수 없습니댜.")
                window.history.back()
            });
    };
    const getBookingInfo = () => {
        (props.isAdmin
            ? AdminBookingAxios.get(`/cars/${bookingId}`, {
                headers: {
                    Authorization: getToken()
                }
            })
            : BookingsAxios.get(`/cars/${bookingId}`,
                {
                    headers: {
                        Authorization: getToken()
                    }
                }))
            .then((Response) => {
                setBookingDetail(Response.data.data)
                setStatus(findStatus(Response.data.data.status))
                carId.current = Response.data.data.carId
                getCarInfo(carId.current)
            })
            .catch((Error) => {
                basicError(Error)
                console.log(Error)
                window.alert("예약 정보를 불러올 수 없습니댜.")
                window.history.back()
            });
    };

    useEffect(() => {
        getCarInfo();
        getBookingInfo();
    }, []);

    return <RightContainer>
        <TitleText>차량 예약 내역</TitleText>

        <WhiteContainer>
            <Bar space={true}>
                <div>
                    <NameSubTitleText>{carInfo.name}</NameSubTitleText>
                    <DetailSubTitleText>{carInfo.category}</DetailSubTitleText>
                </div>
                <StatusContainer style={{margin: '0'}} isCheck={'true'}
                                 background={bookingStatus.background}>
                    <StatusCircle color={bookingStatus.color}/>
                    <StatusText color={bookingStatus.color}>{bookingStatus.name}</StatusText>
                </StatusContainer>
            </Bar>

            <ResourceDetailInfo
                managerName={carInfo.responsibilityName}
                managerPhone={carInfo.responsibilityPhone}
                description={carInfo.description}
                imgUrl={carInfo.imgUrl}/>

            <BookingContentContainer>
                <Capsule color="purple" text="예약일시"/>
                <div>
                    <BookingDateText>{bookingInfo.startDate || "시작일"}</BookingDateText>
                    <BookingDateText> ~ </BookingDateText>
                    <BookingDateText>{bookingInfo.endDate || "마감일"}</BookingDateText>
                </div>
            </BookingContentContainer>

            <BookingContentContainer isCheck={props.isCheck}>
                <Capsule color="purple" text="반납일자"/>
                <BookingDateText>{getReturnDateStr(bookingInfo.returnDateTime)}</BookingDateText>
            </BookingContentContainer>

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
}

export default CarBookingCheck;


function getReturnDateStr(returnDateTime) {
    return (returnDateTime == null) ? "미반납" : returnDateTime
}