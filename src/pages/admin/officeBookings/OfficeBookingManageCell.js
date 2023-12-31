import React from 'react';
import {BookedLineTr} from '../../basic/myBookings/BookedList';
import {StatusCircle, StatusContainer, StatusText} from 'components/booking/StatusTag';
import {BOOKED, findStatus} from 'constants/BookingStatus';
import {AdminBookingAxios} from 'api/AxiosApi';
import styled from 'styled-components';
import {getToken} from 'utils/IsLoginUtil';
import {basicError} from 'utils/ErrorHandlerUtil';

export const SettingButtonContainer = styled.div`
    display: flex;
    width: 90%;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
`
export const SettingButton = styled.button`
  color: #8741CB;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  background: none;
  border: none;
  cursor: pointer;
`

function OfficeBookingManageCell(props) {
    const rejectResource = () => {
        if (window.confirm(`${props.name}의 예약을 반려하시겠습니까?`))
        {
            AdminBookingAxios.patch(`offices/${props.id}/cancel`, null, {
                headers: {
                    Authorization: getToken()
                }
            })
            .then((Response) => {
                alert('반려 완료되었습니다.')
                window.location.reload()
             })
             .catch((error) => {basicError(error)})
        }
        else
        {
            alert("예약 반려를 취소하셨습니다.")
        }
    };

    const moveToDetail = () => {
        window.location.href = `/admin/officeBooking/${props.id}`
    };

    var status = findStatus(props.status)
    var cancelButton = (
    <SettingButtonContainer><SettingButton onClick={moveToDetail}>상세보기</SettingButton></SettingButtonContainer>)

    var usingButton = (
    <SettingButtonContainer>
        <SettingButton onClick={rejectResource}>반려</SettingButton> |<SettingButton onClick={moveToDetail}>상세보기</SettingButton>
    </SettingButtonContainer>)

    return (
        <BookedLineTr>
            <td width="15%">{props.name}</td>
            <td width="10%">{props.detailInfo}</td>
            <td width="20%">{props.startDateTime} ~<br/>{props.endDateTime}</td>
            <td width="15%">{props.reservatorName}<br/>({props.reservatorPhone})</td>
            <td width="15%">
                <StatusContainer isCheck={'true'} background={status.background}>
                    <StatusCircle color={status.color} />
                    <StatusText color={status.color}>{props.status}</StatusText>
                </StatusContainer>
            </td>
            <td width="15%">
                {status === BOOKED ? usingButton : cancelButton}
            </td>
        </BookedLineTr>
    )
}

export default OfficeBookingManageCell;
