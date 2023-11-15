import React, {useEffect, useState} from 'react';
import {AdminBookingAxios, BookingsAxios, ResourcesAxios} from 'api/AxiosApi';
import {useParams} from 'react-router-dom';
import Capsule from 'components/capsule/Capsule';
import {DetailSubTitleText, NameSubTitleText} from 'components/officeBooking/SubTitleBar';
import {BookingPurposeContainer, PurposeContainer} from 'components/officeBooking/BookingPurpose';
import {BookingContentContainer} from 'components/officeBooking/BookingTimeBar';
import {StatusCircle, StatusContainer, StatusText} from 'components/booking/StatusTag';
import {findStatus} from 'constants/BookingStatus';
import {RightContainer, TitleText, WhiteContainer} from 'components/rightContainer/RightContainer';
import {BookingDateText} from './ResourceBooking';
import {getToken} from 'utils/IsLoginUtil';
import {basicError} from 'utils/ErrorHandlerUtil';
import {Bar} from 'pages/basic/myBookings/BookedList';
import ResourceDetailInfo from "components/card/ResourceDetailInfo";

function ResourceBookingCheck(props) {
    let {bookingId} = useParams();

    const [resourceInfo, setResourceInfo] = useState([]);
    const [bookingInfo, setBookingDetail] = useState([]);
    const [bookingStatus, setStatus] = useState([]);

    const getResourceInfo = (resourceId) => {
        ResourcesAxios.get(`/${resourceId}`,
            {
                headers: {
                    Authorization: getToken()
                }
            })
            .then((Response) => {
                setResourceInfo(Response.data.data)
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
            ? AdminBookingAxios.get(`/resources/${bookingId}`, {
                headers: {
                    Authorization: getToken()
                }
            })
            : BookingsAxios.get(`/resources/${bookingId}`,
                {
                    headers: {
                        Authorization: getToken()
                    }
                }))
            .then((Response) => {
                setBookingDetail(Response.data.data)
                setStatus(findStatus(Response.data.data.status))
                getResourceInfo(Response.data.data.id)
            })
            .catch((Error) => {
                basicError(Error)
                console.log(Error)
                window.alert("예약 정보를 불러올 수 없습니댜.")
                window.history.back()
            });
    };

    useEffect(() => {
        getBookingInfo();
    }, []);

    return <RightContainer>
        <TitleText>장비 예약 내역</TitleText>

        <WhiteContainer>
            <Bar space={true}>
                <div>
                    <NameSubTitleText>{resourceInfo.name}({resourceInfo.manufacturer})</NameSubTitleText>
                    <DetailSubTitleText>{resourceInfo.location}</DetailSubTitleText>
                </div>
                <StatusContainer style={{margin: '0'}} isCheck={'true'}
                                 background={bookingStatus.background}>
                    <StatusCircle color={bookingStatus.color}/>
                    <StatusText color={bookingStatus.color}>{bookingStatus.name}</StatusText>
                </StatusContainer>
            </Bar>

            <ResourceDetailInfo
                managerName={resourceInfo.responsibilityName}
                managerPhone={resourceInfo.responsibilityPhone}
                description={resourceInfo.description}
                imgUrl={resourceInfo.imgUrl}/>

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

export default ResourceBookingCheck;


function getReturnDateStr(returnDateTime) {
    return (returnDateTime == null) ? "미반납" : returnDateTime
}