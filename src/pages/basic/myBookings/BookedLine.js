import React from 'react';
import { Link } from 'react-router-dom';
import SmallButton from 'components/button/SmallButton';
import { BOOKED, USING, WAITING, findStatus } from 'constants/BookingStatus';
import { BookingsAxios } from 'api/AxiosApi';
import { BookedLineTr } from './BookedList';
import { BookingCategoryPathList } from 'constants/Path';
import { StatusText, StatusContainer, StatusCircle } from 'components/booking/StatusTag';
import { basicError } from 'utils/ErrorHandlerUtil';
import {getToken} from "../../../utils/IsLoginUtil";

function cancelBooking(bookingId, name, info, start, end, type) {
    if (window.confirm(`${name}(${info}) ${start} ~ ${end}\n예약을 취소하시겠습니까?`)) {
        BookingsAxios.patch(`/${type}/${bookingId}/cancel`,
            {
                headers: {
                    Authorization: getToken()
                }
            })
            .catch((error) => {
                basicError(error)
            })
        alert("취소되었습니다.")
        window.location.reload()
    }
}

function returnBooking(bookingId, name, info, start, end) {
    if (window.confirm(`${name}(${info}) ${start} ~ ${end}\n장비를 반납하시겠습니까?`)) {
        BookingsAxios.patch(`/resources/${bookingId}/return`,
            {
                headers: {
                    Authorization: getToken()
                }
            })
            .catch((error) => {
                basicError(error)
            })
        alert("반납되었습니다.")
        window.location.reload()
    }
}

function BookedLine(props) {
    var status = findStatus(props.status)

    return (
        <>
            <BookedLineTr>
                <td width="30%"><Link to={`/my/bookings/${props.type}/${props.id}`}>{props.name}({props.info})</Link></td>
                <td width="30%">{props.start} ~ {props.end}</td>
                <td width="10%"><StatusContainer isCheck={'true'} background={status.background}>
                    <StatusCircle color={status.color} />
                    <StatusText color={status.color}>{props.status}</StatusText>
                </StatusContainer></td>
                {
                    (props.type === BookingCategoryPathList[0]) ?
                        // 회의실
                        ((status === BOOKED) || (props.status === USING)) ?
                            <td width="10%"><SmallButton click={() =>
                                cancelBooking(props.id, props.name, props.info, props.start, props.end, props.type)} name={'취소'} /></td>
                            : null
                        :
                        // 장비
                        ((status === WAITING) || (status === BOOKED)) ?
                            <td width="10%"><SmallButton click={() =>
                                cancelBooking(props.id, props.name, props.info, props.start, props.end, props.type)} name={'취소'} /></td>
                            : (status === USING) ?
                                <td width="10%"><SmallButton click={() =>
                                    returnBooking(props.id, props.name, props.info, props.start, props.end)} name={'반납'} /></td>
                                : null
                }
            </BookedLineTr>
        </>
    )
}

export default BookedLine;