import React from 'react';
import { BookedLineTr } from '../../booking/bookedList/BookedList';
import {Toggle} from "../../../components/toggle/Toggle";
import {Link} from "react-router-dom";

function ResourceManageTableCell(props) {

    const changeToggle = (isEnable) => {
        // todo: 활성/비활성 API 호출
        console.log(isEnable)
    }

    return (
        <BookedLineTr >
            <td width="20%"><Link to={`/manage/resources/${props.id}`}>{props.name}</Link></td>
            <td width="15%">{props.location}</td>
            <td width="15%">{props.user}({props.userPhone})</td>
            <td width="40%">{props.description}</td>
            <td width="8%"><Toggle click={changeToggle} isEnable={props.isEnable}/></td>
        </BookedLineTr>
    )
}

export default ResourceManageTableCell;