import React, {useState} from 'react';
import {BookedLineTr} from '../../basic/myBookings/BookedList';
import {StatusCircle, StatusContainer, StatusText} from 'components/booking/StatusTag';
import {BOOKED, findStatus, USING, WAITING} from 'constants/BookingStatus';
import {AdminBookingAxios} from 'api/AxiosApi';
import {getToken} from 'utils/IsLoginUtil';
import {basicError} from 'utils/ErrorHandlerUtil';
import {SettingButton, SettingButtonContainer} from "../officeBookings/OfficeBookingManageCell";
import {CarReturnModal} from "../../../components/modal/CarReturnModal";
import {ResourceReturnModal} from "../../../components/modal/ResourceReturnModal";

function ResourceBookingManageCell(props) {
    const [isOpen, setIsOpen] = useState(false)

    const openReturnModalHandler = () => {
        setIsOpen(!isOpen)
    }

    const allowResource = () => {
        if (window.confirm(`${props.name}의 예약을 허가하시겠습니까?`)) {
            AdminBookingAxios.patch(`resources/${props.id}/allow`, null, {
                headers: {
                    Authorization: getToken()
                }
            })
                .then((Response) => {
                    alert('예약 허가 완료되었습니다.')
                    window.location.reload()
                })
                .catch((error) => {
                    basicError(error)
                })

            props.refresh()
        } else {
            alert("예약 허가를 취소하셨습니다.")
        }
    };

    const rejectResource = () => {
        if (window.confirm(`${props.name}의 예약을 반려하시겠습니까?`)) {
            AdminBookingAxios.patch(`resources/${props.id}/reject`, null, {
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

    const moveToDetail = () => {
        window.location.href = `/admin/resourceBooking/${props.id}`
    };

    var status = findStatus(props.status)
    var waitingButton = (
        <SettingButtonContainer>
            <SettingButton onClick={allowResource}>허가</SettingButton> | <SettingButton
            onClick={rejectResource}>반려</SettingButton> | <SettingButton onClick={moveToDetail}>상세보기</SettingButton>
        </SettingButtonContainer>)

    var cancelButton = (
        <SettingButtonContainer><SettingButton onClick={moveToDetail}>상세보기</SettingButton></SettingButtonContainer>)

    var usingButton = (
        <SettingButtonContainer>
            <SettingButton onClick={openReturnModalHandler}>반납</SettingButton> | <SettingButton
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
                {status === WAITING ? waitingButton :
                    status === USING ? usingButton :
                        status === BOOKED ? bookingButton : cancelButton
                }
                {isOpen ?
                    <ResourceReturnModal id={props.id}
                                         name={props.name}
                                         info={props.location}
                                         start={props.startDateTime}
                                         end={props.endDateTime}
                                         handler={openReturnModalHandler}/>
                    : null
                }
            </td>
        </BookedLineTr>
    )
}

export default ResourceBookingManageCell;
