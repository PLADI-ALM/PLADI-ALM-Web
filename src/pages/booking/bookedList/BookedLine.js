import React from 'react';
import styled from "styled-components"
import { Link } from 'react-router-dom';
import SmallButton from 'components/button/SmallButton';
import { BOOKED, USING } from 'constants/BookingStatus';
import { BookingsAxios } from 'api/AxiosApi';
import { BookedLineTr } from './BookedList';

function cancelBooking(bookingId, name, info, start, end) {
    if (window.confirm(`${name}(${info}) ${start} ~ ${end}\n예약을 취소하시겠습니까?`)) {
        BookingsAxios.patch("/offices/" + bookingId)
            .catch((error) => { alert(error) })
        alert("취소되었습니다.");
        window.location.reload()
    }
}

function BookedLine(props) {
    return (
        <BookedLineTr>
            <td width="30%"><Link to={'/bookings/offices/' + props.id}>{props.name}({props.info})</Link></td>
            <td width="30%">{props.start} ~ {props.end}</td>
            <td width="10%">{props.status}</td>
            {((props.status === BOOKED) || (props.status === USING)) ?
                <td width="10%"><SmallButton click={() =>
                    cancelBooking(props.id, props.name, props.info, props.start, props.end)} name={'취소'} /></td>
                : null}
        </BookedLineTr>
    );
}

export default BookedLine;