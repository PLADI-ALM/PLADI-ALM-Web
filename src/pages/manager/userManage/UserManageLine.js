import React from 'react';
import { Link } from 'react-router-dom';
import { BookedLineTr } from 'pages/booking/bookedList/BookedList';
import RoleCapsule from 'components/capsule/RoleCapsule';

function UserManageTableCell(props) {

    return (
        <BookedLineTr>
            <td width="5%"><Link to={`/manage/users/${props.id}`}>{props.name}</Link></td>
            <td width="5%">{props.position}</td>
            <td width="15%">{props.email}</td>
            <td width="10%">{props.department}</td>
            <td width="10%">{props.officeJob}</td>
            <td width="5%">
                <RoleCapsule role={props.role} />
            </td>
            <td width="5%"></td>
        </BookedLineTr>
    )
}

export default UserManageTableCell;