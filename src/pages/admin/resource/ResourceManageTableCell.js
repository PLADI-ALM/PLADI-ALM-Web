import React from 'react';
import { BookedLineTr } from '../../basic/myBookings/BookedList';
import {Toggle} from "../../../components/toggle/Toggle";
import {Link} from "react-router-dom";
import {AdminBookingResourceAxios} from "../../../api/AxiosApi";
import {getToken} from "../../../utils/IsLoginUtil";
import {basicError} from "../../../utils/ErrorHandlerUtil";

function ResourceManageTableCell(props) {

    const changeToggle = (isEnable) => {
        AdminBookingResourceAxios.patch(`/${props.id}/activation`, null, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {  })
            .catch((error) => {basicError(error)})
        console.log(isEnable)
    }

    return (
        <BookedLineTr>
            <td width="20%"><Link to={`/admin/resources/${props.id}`}>{props.name}</Link></td>
            <td width="15%">{props.location}</td>
            <td width="20%">{props.user}({props.userPhone})</td>
            <td width="30%">{props.description}</td>
            <td width="8%"><Toggle click={changeToggle} isEnable={props.isEnable}/></td>
        </BookedLineTr>
    )
}

export default ResourceManageTableCell;