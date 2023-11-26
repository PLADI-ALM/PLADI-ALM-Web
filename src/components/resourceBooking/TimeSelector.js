import styled from "styled-components"
import React, {useEffect, useState} from "react";
import {findTimeIndex, ResourceTimeList, TimeList} from "../../constants/ToggleList";
import {ResourcesAxios} from "../../api/AxiosApi";
import {getToken} from "../../utils/IsLoginUtil";
import {basicError} from "../../utils/ErrorHandlerUtil";
import {BookingInfosModal} from "../modal/BookingInfoModal";

export const TimeContainer = styled.ul`
  margin-top: 10px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: flex;
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #BDBDBD;
    border-radius: 10px;
  }
`

export const TimeCard = styled.li`
  border: 1px solid #BDBDBD;
  height: 30px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 5px;
  margin-right: 3px;

  &.disabled {
    background: #BDBDBD;
    cursor: default;
  }
  
  &.disabled:hover {
    background: #BDBDBD;
    color: #4c4c4c;
  }

  &:hover {
    background: #8741CB;
    color: white;
  }
`

let currentDate = "";

export function setDate(date) {
    currentDate = date
}

export function TimeSelector(props) {
    const [bookedTimes, setBookedTimes] = useState([]);
    const [bookingInfos, setBookingInfos] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        getResourceBookedDates(currentDate, props.resourceId)
    }, [currentDate]);

    const clickHandler = (time) => {
        props.click(time)
    }

    function isTimeMatch(time) {
        for (let i = 0; i < bookedTimes.length; i++) {
            if (bookedTimes[i] === time)
                return true
        }
        return false
    }

    // 시간에 마우스 오버
    const handleTimeMouseEnter = (time, date) => {
        // ResourcesAxios.get(`/${props.resourceId}/booking?dateTime=${date} ${time.slice(0 ,2)}`, {
        //     headers: {
        //         Authorization: getToken()
        //     }
        // })
        //     .then((Response) => {
        //         const info = Response.data.data;
        //         if (info === undefined) {
        //             setBookingInfos(null)
        //         } else {
        //             setBookingInfos(Response.data.data)
        //             setIsOpen(true)
        //         }
        //     })
        //     .catch((Error) => {
        //         basicError(Error)
        //         window.alert("예약 정보를 불러오는데 실패하였습니다.")
        //     });
    }

    const handleTimeMouseLeave = () => {
        setIsOpen(false)
    }

    const handleModalMouseEnter = () => {
        setIsOpen(true)
    }

    const handleModalMouseLeave = () => {
        setIsOpen(false)
    }

    const getResourceBookedDates = (date, resourceId) => {
        const params = {date: date};
        ResourcesAxios.get(`/${resourceId}/booking-time`, {
            params, headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                var temp = [];
                Response.data.data.map(function (time) {
                    temp.push(time)
                })
                setBookedTimes(temp)
            })
            .catch((Error) => {
                basicError(Error)
                window.alert("예약 정보를 불러올 수 없습니댜.")
                window.history.back()
            });
    }

    return (
        <TimeContainer>
            {
                ResourceTimeList.map(function (time) {
                    if (isTimeMatch(time))
                        return (<TimeCard
                            onMouseOver={() => handleTimeMouseEnter(time, currentDate)}
                            onMouseOut={() => handleTimeMouseLeave()}
                            className={'disabled'}>{time}</TimeCard>)
                    else
                        return (<TimeCard onClick={() => clickHandler(time)}>{time}</TimeCard>)
                })
            }
            {isOpen && (
                <BookingInfosModal
                    info={bookingInfos}
                    // x={x}
                    // y={y}
                    onMouseOver={() => handleModalMouseEnter()}
                    onMouseOut={() => handleModalMouseLeave()}/>
            )}
        </TimeContainer>
    );
}