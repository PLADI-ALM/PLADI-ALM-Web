import React from 'react';
import { BookedLineTr } from '../../booking/bookedList/BookedList';




function ResourceManageTableCell(props) {
    const moveToDetail = () => {
        window.location.href = `/manage/office/${props.id}`
    }

    return (
        <BookedLineTr onClick={moveToDetail} >
            <td width="20%">{props.name}</td>
            <td width="20%">{props.category}</td>
            <td width="60%">{props.description}</td>
        </BookedLineTr>
    )
}

export default ResourceManageTableCell;