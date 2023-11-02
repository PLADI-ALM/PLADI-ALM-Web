import React from 'react';
import {Link} from 'react-router-dom';
import {BookedLineTr} from '../../basic/myBookings/BookedList';
import {Toggle} from "../../../components/toggle/Toggle";
import {AdminOfficesAxios} from "../../../api/AxiosApi";
import {getToken} from "../../../utils/IsLoginUtil";
import {basicError} from "../../../utils/ErrorHandlerUtil";

function OfficeManageTableCell(props) {

    const changeToggle = (isEnable) => {
        AdminOfficesAxios.patch(`/${props.id}/activation`, null, {
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
            <td width="20%"><Link to={`/admin/offices/${props.id}`}>{props.name}</Link></td>
            <td width="20%">{props.location}</td>
            <td width="10%">{props.capacity}</td>
            <td width="40%">{props.description}</td>
            <td width="10%"><Toggle click={changeToggle} isEnable={props.isEnable}/></td>
        </BookedLineTr>
    )
}

export default OfficeManageTableCell;