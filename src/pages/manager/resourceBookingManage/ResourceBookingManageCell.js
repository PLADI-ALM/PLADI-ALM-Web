import React from 'react';
import { Link } from 'react-router-dom';
import { BookedLineTr } from '../../booking/bookedList/BookedList';
import { StatusCircle, StatusContainer, StatusText } from 'components/booking/StatusTag';
import { CANCELED, USING, WAITING, findStatus } from 'constants/BookingStatus';
import styled from 'styled-components';

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




function ResourceBookingManageCell(props) {
    var status = findStatus(props.status)
    var watingButton = (
    <SettingButtonContainer>
        <SettingButton>허가</SettingButton> | <SettingButton>반려</SettingButton> | <SettingButton>상세보기</SettingButton>    
    </SettingButtonContainer>)
    var cancelButton = (
    <SettingButtonContainer>
        <SettingButton>상세보기</SettingButton>    
    </SettingButtonContainer>)
    var usingButton = (
    <SettingButtonContainer>
        <SettingButton>반납</SettingButton> | <SettingButton>상세보기</SettingButton>    
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