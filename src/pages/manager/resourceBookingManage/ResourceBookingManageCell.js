import React from 'react';
import { Link } from 'react-router-dom';
import { BookedLineTr } from '../../booking/bookedList/BookedList';




function ResourceBookingManageCell(props) {

    return (
        <BookedLineTr>
            <td width="15%">{props.name}</td>
            <td width="10%">{props.detailInfo}</td>
            <td width="20%">{props.startDateTime} ~ {props.endDateTime}</td>
            <td width="10%">{props.human}</td>
            <td width="15%">{props.status}</td>
            <td width="20%">{props.description}</td>
        </BookedLineTr>
    )
}

export default ResourceBookingManageCell;