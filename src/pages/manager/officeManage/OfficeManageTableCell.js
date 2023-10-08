import React from 'react';
import { Link } from 'react-router-dom';
import { BookedLineTr } from '../../booking/bookedList/BookedList';




function OfficeManageTableCell(props) {

    return (
        <BookedLineTr>
            <td width="20%"><Link to={`/manage/office/${props.id}`}>{props.name}</Link></td>
            <td width="20%">{props.location}</td>
            <td width="20%">{props.capacity}</td>
            <td width="40%">{props.description}</td>
        </BookedLineTr>
    )
}

export default OfficeManageTableCell;