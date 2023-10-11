import React from 'react';
import { Link } from 'react-router-dom';
import { BookedLineTr } from '../../booking/bookedList/BookedList';
import { StatusCircle, StatusContainer, StatusText } from 'components/booking/StatusTag';
import { CANCELED, USING, WAITING, findStatus } from 'constants/BookingStatus';
import { AdminBookingAxios } from 'api/AxiosApi';
import styled from 'styled-components';
import { getToken } from 'utils/IsLoginUtil';

const SettingButtonContainer = styled.div`
    display: flex;
    width: 90%;
    height: 100%;
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




function ResourceBookingManageCell(props) {
    const allowResource = () => {
        if (window.confirm(`${props.name}의 예약을 허가하시겠습니까?`))
        {
            AdminBookingAxios.patch(`resources/${props.id}/allow`, null, {
                headers: {
                    Authorization: getToken()
                }
            })
            .then((Response) => { 
                alert(Response.data.message)
                window.location.reload()
             })
            .catch((Error) => { alert(Error.response.data.message) })

            props.refresh()
        }
        else
        {
            alert("예약 허가를 취소하셨습니다.")
        }

       
    };

    const rejectResource = () => {
        if (window.confirm(`${props.name}의 예약을 반려하시겠습니까?`))
        {
            AdminBookingAxios.patch(`resources/${props.id}/reject`, null, {
                headers: {
                    Authorization: getToken()
                }
            })
            .then((Response) => { 
                alert(Response.data.message)
                window.location.reload()
             })
            .catch((Error) => { alert(Error.response.data.message) })

            props.refresh()
        }
        else
        {
            alert("예약 반려를 취소하셨습니다.")
        }
    };

    const returnResource = () => {
        if (window.confirm(`${props.name}를 반납하시겠습니까?`))
        {
            AdminBookingAxios.patch(`resources/${props.id}/return`, null, {
                headers: {
                    Authorization: getToken()
                }
            })
            .then((Response) => { 
                alert(Response.data.message)
                window.location.reload()
             })
            .catch((Error) => { alert(Error.response.data.message) })

            props.refresh()
        }
        else
        {
            alert("반납을 취소하셨습니다.")
        }
    };




    var status = findStatus(props.status)
    var watingButton = (
    <SettingButtonContainer>
        <SettingButton onClick={allowResource}>허가</SettingButton> | <SettingButton onClick={rejectResource}>반려</SettingButton> |  
        <SettingButton>
            <Link style={{
              color: "#8741CB",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "22px", }} 
              to={`/manage/resourceBooking/${props.id}`}>
            상세보기
            </Link>
        </SettingButton>  
    </SettingButtonContainer>)
    var cancelButton = (
    <SettingButtonContainer>
         <SettingButton>
            <Link style={{
              color: "#8741CB",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "22px", }} 
              to={`/manage/resourceBooking/${props.id}`}>
            상세보기
            </Link>
        </SettingButton>    
    </SettingButtonContainer>)
    var usingButton = (
    <SettingButtonContainer>
        <SettingButton onClick={returnResource}>반납</SettingButton> | 
        <SettingButton>
            <Link style={{
              color: "#8741CB",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "22px", }} 
              to={`/manage/resourceBooking/${props.id}`}>
            상세보기
            </Link>
        </SettingButton>  
    </SettingButtonContainer>)

    return (
        <BookedLineTr>
            <td width="15%">{props.name}</td>
            <td width="10%">{props.category}</td>
            <td width="20%">{props.startDateTime} ~ {props.endDateTime}</td>
            <td width="10%">{props.requester}</td>
            <td width="15%">
                <StatusContainer isCheck={'true'} background={status.background}>
                    <StatusCircle color={status.color} />
                    <StatusText color={status.color}>{props.status}</StatusText>
                </StatusContainer>
            </td>
            <td width="20%">
                {status === WAITING ? watingButton : 
                    status === USING ? usingButton : cancelButton
                }
            </td>
        </BookedLineTr>
    )
}

export default ResourceBookingManageCell;