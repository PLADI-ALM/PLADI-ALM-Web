import React from 'react';
import {BookedLineTr} from 'pages/basic/myBookings/BookedList';
import {Toggle} from "components/toggle/Toggle";
import {Link} from "react-router-dom";
import {AdminCarsAxios} from "api/AxiosApi";
import {getToken} from "utils/IsLoginUtil";
import {basicError} from "utils/ErrorHandlerUtil";

function CarManageTableCell(props) {

    const changeToggle = (isEnable) => {
        AdminCarsAxios.patch(`/${props.id}/activation`, null, {
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
            <td width="15%"><Link to={`/admin/cars/${props.id}`}>{props.name}</Link></td>
            <td width="10%">{props.manufacturer}</td>
            <td width="10%">{props.location}</td>
            <td width="15%">{props.user}<br/>({props.userPhone})</td>
            <td width="30%">{props.description}</td>
            <td width="8%"><Toggle click={changeToggle} isEnable={props.isEnable}/></td>
        </BookedLineTr>
    )
}

export default CarManageTableCell;