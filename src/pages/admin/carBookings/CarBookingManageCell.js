import React from 'react';
import {BookedLineTr} from '../../basic/myBookings/BookedList';
import {StatusCircle, StatusContainer, StatusText} from 'components/booking/StatusTag';
import {BOOKED, findStatus, USING} from 'constants/BookingStatus';
import {AdminBookingAxios} from 'api/AxiosApi';
import {getToken} from 'utils/IsLoginUtil';
import {basicError} from 'utils/ErrorHandlerUtil';
import {SettingButton, SettingButtonContainer} from "../officeBookings/OfficeBookingManageCell";

function CarBookingManageCell(props) {

    const rejectResource = () => {
        if (window.confirm(`${props.name}의 예약을 반려하시겠습니까?`)) {
            AdminBookingAxios.patch(`cars/${props.id}/reject`, null, {
                headers: {
                    Authorization: getToken()
                }
            })
                .then((Response) => {
                    alert('반려 완료되었습니다.')
                    window.location.reload()
                })
                .catch((error) => {
                    basicError(error)
                })
            props.refresh()
        } else {
            alert("예약 반려를 취소하셨습니다.")
        }
    };

    const returnResource = () => {
        if (window.confirm(`${props.name}를 반납하시겠습니까?`)) {
            AdminBookingAxios.patch(`cars/${props.id}/return`, null, {
                headers: {
                    Authorization: getToken()
                }
            })
                .then((Response) => {
                    alert('반납 완료되었습니다.')
                    window.location.reload()
                })
                .catch((error) => {
                    basicError(error)
                })

            props.refresh()
        } else {
            alert("반납을 취소하셨습니다.")
        }
    };

    const moveToDetail = () => {
        window.location.href = `/admin/carBooking/${props.id}`
    };

    var status = findStatus(props.status)

    var cancelButton = (
        <SettingButtonContainer><SettingButton onClick={moveToDetail}>상세보기</SettingButton></SettingButtonContainer>)

    var usingButton = (
        <SettingButtonContainer>
            <SettingButton onClick={returnResource}>반납</SettingButton> | <SettingButton
            onClick={moveToDetail}>상세보기</SettingButton>
        </SettingButtonContainer>)

    var bookingButton = (
        <SettingButtonContainer>
            <SettingButton onClick={rejectResource}>반려</SettingButton> | <SettingButton
            onClick={moveToDetail}>상세보기</SettingButton>
        </SettingButtonContainer>
    );

    return (
        <BookedLineTr>
            <td width="15%">{props.name}</td>
            <td width="10%">{props.location}</td>
            <td width="20%">{props.startDateTime} ~<br/>{props.endDateTime}</td>
            <td width="15%">{props.reservatorName}<br/>({props.reservatorPhone})</td>
            <td width="15%">
                <StatusContainer isCheck={'true'} background={status.background}>
                    <StatusCircle color={status.color}/>
                    <StatusText color={status.color}>{props.status}</StatusText>
                </StatusContainer>
            </td>
            <td width="15%">
                {status === USING ? usingButton :
                    status === BOOKED ? bookingButton : cancelButton
                }
            </td>
        </BookedLineTr>
    )
}

export default CarBookingManageCell;