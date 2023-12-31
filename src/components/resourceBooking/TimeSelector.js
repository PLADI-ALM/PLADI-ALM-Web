import styled from "styled-components"
import React, {useEffect, useState} from "react";
import {ResourceTimeList} from "../../constants/ToggleList";
import {CarsAxios, ResourcesAxios} from "../../api/AxiosApi";
import {getToken} from "../../utils/IsLoginUtil";
import {basicError} from "../../utils/ErrorHandlerUtil";

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

    useEffect(() => {
        if (props.resourceId)
            getResourceBookedDates(currentDate, props.resourceId)
        else if (props.carId)
            getCarBookedDates(currentDate, props.carId)
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

    const getCarBookedDates = (date, carId) => {
        const params = {date: date};
        CarsAxios.get(`/${carId}/booking-time`, {
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
                            onMouseOver={() => props.onMouseOver(time, currentDate)}
                            className={'disabled'}>{time}</TimeCard>)
                    else
                        return (<TimeCard onClick={() => clickHandler(time)}
                                          onMouseOver={() => props.onMouseOver(time, null)}>{time}</TimeCard>)
                })
            }
        </TimeContainer>
    );
}