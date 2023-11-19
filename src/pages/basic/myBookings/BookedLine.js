import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import SmallButton from 'components/button/SmallButton';
import {BOOKED, USING, WAITING, findStatus} from 'constants/BookingStatus';
import {BookingsAxios} from 'api/AxiosApi';
import {BookedLineTr} from './BookedList';
import {BookingCategoryList} from 'constants/Path';
import {StatusText, StatusContainer, StatusCircle} from 'components/booking/StatusTag';
import {basicError} from 'utils/ErrorHandlerUtil';
import {getToken} from "utils/IsLoginUtil";
import {CarReturnModal} from "components/modal/CarReturnModal";
import {ResourceReturnModal} from "components/modal/ResourceReturnModal";

function cancelBooking(bookingId, name, info, start, end, type) {
    if (window.confirm(`${name}(${info}) ${start} ~ ${end}\n예약을 취소하시겠습니까?`)) {
        BookingsAxios.patch(`/${type}/${bookingId}/cancel`, null,
            {
                headers: {
                    Authorization: getToken()
                }
            })
            .then(() => {
                    alert("취소되었습니다.")
                    window.location.reload()
                }
            )
            .catch((error) => {
                basicError(error)
            })
    }
}

function BookedLine(props) {
    const status = findStatus(props.status);
    const [isOpen, setIsOpen] = useState(false)

    const openReturnModalHandler = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <BookedLineTr>
                <td width="30%"><Link to={`/my/bookings/${props.type}/${props.id}`}>{props.name}({props.info})</Link>
                </td>
                <td width="30%">{props.start} ~ {props.end}</td>
                <td width="10%"><StatusContainer isCheck={'true'} background={status.background}>
                    <StatusCircle color={status.color}/>
                    <StatusText color={status.color}>{props.status}</StatusText>
                </StatusContainer></td>
                {
                    (props.type === BookingCategoryList[0]) ?
                        // 회의실
                        ((status === BOOKED) || (status === USING)) ?
                            <td width="10%"><SmallButton click={() =>
                                cancelBooking(props.id, props.name, props.info, props.start, props.end, props.type)}
                                                         name={'취소'}/></td>
                            : null
                        :
                        // 장비, 차량
                        ((status === WAITING) || (status === BOOKED)) ?
                            <td width="10%"><SmallButton click={() =>
                                cancelBooking(props.id, props.name, props.info, props.start, props.end, props.type)}
                                                         name={'취소'}/></td>
                            : (status === USING) ?
                                <td width="10%"><SmallButton click={openReturnModalHandler}
                                                             name={'반납'}/></td>
                                : null
                }
            </BookedLineTr>

            {isOpen ?
                props.type === BookingCategoryList[1] ?
                    <ResourceReturnModal id={props.id}
                                         name={props.name}
                                         info={props.info}
                                         start={props.start}
                                         end={props.end}
                                         handler={openReturnModalHandler}/>
                    : <CarReturnModal id={props.id}
                                      name={props.name}
                                      info={props.info}
                                      start={props.start}
                                      end={props.end}
                                      handler={openReturnModalHandler}/>
                : null
            }
        </>
    )
}

export default BookedLine;