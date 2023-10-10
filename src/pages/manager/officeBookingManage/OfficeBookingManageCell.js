import React from 'react';
import { BookedLineTr } from '../../booking/bookedList/BookedList';
import { StatusCircle, StatusContainer, StatusText } from 'components/booking/StatusTag';
import { USING, findStatus, BOOKED } from 'constants/BookingStatus';
import { AdminBookingAxios } from 'api/AxiosApi';
import styled from 'styled-components';
import { getToken } from 'utils/IsLoginUtil';
import { Link } from 'react-router-dom';

const SettingButtonContainer = styled.div`
    display: flex;
    width: 90%;
    height: 100%
    align-items: center;
    justify-content: flex-end;
`
const SettingButton = styled.button`
    color: #8741CB;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; 
    background: none;
    border: none;
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
                alert(Response.data.message)
                window.location.reload()
             })
            .catch((Error) => { alert(Error.response.data.message) })
        }
        else
        {
            alert("예약 반려를 취소하셨습니다.")
        }
    };




    var status = findStatus(props.status)
    var cancelButton = (
    <SettingButtonContainer>
        <SettingButton><Link style={{
              color: "#8741CB",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "22px", 
        }} 
        to={`/manage/officeBooking/${props.id}`}>상세보기</Link></SettingButton>    
    </SettingButtonContainer>)
    var usingButton = (
    <SettingButtonContainer>
        <SettingButton onClick={rejectResource}>반려</SettingButton> | <SettingButton><Link to={`/manage/officeBooking/${props.id}`} 
        style={{
              color: "#8741CB",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "22px", 
        }}>상세보기</Link></SettingButton> 
    </SettingButtonContainer>)

    return (
        <BookedLineTr>
            <td width="15%">{props.name}</td>
            <td width="10%">{props.detailInfo}</td>
            <td width="20%">{props.startDateTime} ~ <br/>{props.endDateTime}</td>
            <td width="10%">{props.requester}</td>
            <td width="15%">
                <StatusContainer isCheck={'true'} background={status.background}>
                    <StatusCircle color={status.color} />
                    <StatusText color={status.color}>{props.status}</StatusText>
                </StatusContainer>
            </td>
            <td width="20%">
                {status === BOOKED ? usingButton : cancelButton}
            </td>
        </BookedLineTr>
    )
}

export default OfficeBookingManageCell;