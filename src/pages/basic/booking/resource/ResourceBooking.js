import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import {ResourcesAxios} from 'api/AxiosApi';
import {useParams} from 'react-router-dom';
import Capsule from 'components/capsule/Capsule';
import {DetailSubTitleText, NameSubTitleText} from 'components/officeBooking/SubTitleBar';
import {BookingPurposeContainer} from 'components/officeBooking/BookingPurpose';
import {BookingContentContainer, RequestButtonContainer} from 'components/officeBooking/BookingTimeBar';
import {RightContainer, TitleText, WhiteContainer} from 'components/rightContainer/RightContainer';
import styles from "./CustomCalendar.css";
import {basicError} from 'utils/ErrorHandlerUtil';
import SmallButton from 'components/button/SmallButton';
import {Bar} from 'pages/basic/myBookings/BookedList';
import {getToken} from 'utils/IsLoginUtil';
import ResourceDetailInfo from "components/card/ResourceDetailInfo";
import {TimeList} from "constants/ToggleList";
import {setDate, TimeSelector} from "../../../../components/resourceBooking/TimeSelector";

export const BookingDateTimeContainer = styled.div`
  margin-left: 10px;
  color: #575757;
  font-size: 22px;
  text-align: left;
`

export const BookingDateText = styled.text`
  padding-left: 10px;
  color: #575757;
  font-size: 22px;
  text-align: left;
`

export const PurposeTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #E6E6E6;
  font-size: 20px;
  line-height: 25px;
  text-align: left;
  margin: 0 20px 0 10px;
  box-sizing: border-box;
`

export const BookingDateContainer = styled.div`
  margin-top: 15px;
  display: flex;
  height: 250px;
`

export const DateContainer = styled.div`
  margin-left: 10px;
`

var currentMonth = moment(new Date()).format('YYYY-MM')
// var startTime = "";
// var endTime = "";

function ResourceBooking(props) {
    let {resourceId} = useParams();

    const [resourceInfo, setResourceInfo] = useState([]);
    const [dates, setBookedDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    var [startDate, setStartDate] = useState("");
    var endDate = useRef("");
    var [startTime, setStartTime] = useState("");
    var [endTime, setEndTime] = useState("");
    const [changed, setCurrentMonth] = useState();

    const getResourceInfo = () => {
        ResourcesAxios.get(`/${resourceId}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                setResourceInfo(Response.data.data)
            })
            .catch((Error) => {
                basicError(Error)
                window.alert("장비 정보를 불러올 수 없습니댜.")
                window.history.back()
            });
    };

    const getBookedDates = () => {
        const params = {month: currentMonth};
        ResourcesAxios.get(`/${resourceId}/booking-state`, {
            params, headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                var temp = [];
                Response.data.data.map(function (date) {
                    temp.push(new Date(date))
                })
                setBookedDates(temp)
            })
            .catch((Error) => {
                basicError(Error)
                window.alert("예약 정보를 불러올 수 없습니댜.")
                // window.history.back()
            });
    }

    const changeDate = (value) => {
        const dateFormat = moment(value).format("YYYY-MM-DD");
        setSelectedDate(dateFormat)
        setDate(dateFormat)
        if (startDate === "" || (startDate !== "" && endDate.current !== "" && endTime !== "") || startTime === "" || startDate > dateFormat) {
            console.log('시작')
            setStartDate(dateFormat)
            endDate.current = ""
            setStartTime("")
            setEndTime("")
        } else {
            endDate.current = dateFormat
            for (var i = 0; i < dates.length; i++) {
                var temp = new Date(dates[i])
                temp = moment(temp).format("YYYY-MM-DD")

                if (startDate <= temp && endDate.current >= temp) {
                    alert('예약된 일자를 포함한 날짜는 선택할 수 없습니다.')
                    setStartDate("")
                    endDate.current = ""
                    return
                }
            }
        }
    };

    const clickTime = (time) => {
        if ((startDate !== "" && startTime === "") || (startDate !== "" && endDate.current === "")) {
            setStartTime(time)
        } else if (startDate !== "" && endDate.current !== "" && startTime !== "") {
            setEndTime(time)
            // for (var i = 0; i < dates.length; i++) {
            //     var temp = new Date(dates[i])
            //     temp = moment(temp).format("YYYY-MM-DD")
            //
            //     if (startDate <= temp && endDate >= temp) {
            //         alert('예약된 일자를 포함한 날짜는 선택할 수 없습니다.')
            //         startDate = '';
            //         endDate = '';
            //         setStartDate(startDate)
            //         setEndDate(endDate)
            //         window.location.reload()
            //         return
            //     }
            // }
        }
    };

    const onActiveStartDateChange = (e) => {
        if (e.activeStartDate !== null) {
            const changed = moment(e.activeStartDate).format("YYYY-MM")
            setCurrentMonth(changed)
            currentMonth = changed
            getBookedDates()
        }
    }

    const requestBookingResource = () => {
        var bookingPurpose = document.getElementById("bookingPurpose").value;

        if (window.confirm("예약하시겠습니까?")) {
            ResourcesAxios.post(`/${resourceId}`,
                {
                    memo: bookingPurpose,
                    startDateTime: startDate + " " + startTime.slice(0, 2),
                    endDateTime: endDate.current + " " + endTime.slice(0, 2)
                },
                {
                    headers: {Authorization: getToken()}
                },
            )
                .then(function (response) {
                    if (response.data.status === '200') {
                        alert('예약에 성공하였습니다!')
                    } else {
                        alert(response.data.message);
                    }
                    window.location.reload()
                })
                .catch((Error) => {
                    basicError(Error)
                    window.alert("장비 예약에 실패하였습니다.")
                });
        }
    }

    useEffect(() => {
        getResourceInfo()
        getBookedDates()
    }, []);

    return (
        <RightContainer>
            <TitleText>장비 예약</TitleText>

            <WhiteContainer>
                <Bar>
                    <NameSubTitleText>{resourceInfo.name}({resourceInfo.manufacturer})</NameSubTitleText>
                    <DetailSubTitleText>{resourceInfo.location}</DetailSubTitleText>
                </Bar>

                <ResourceDetailInfo
                    managerName={resourceInfo.responsibilityName}
                    managerPhone={resourceInfo.responsibilityPhone}
                    description={resourceInfo.description}
                    imgUrl={resourceInfo.imgUrl}/>

                <BookingContentContainer>
                    <Capsule color="purple" text="예약일시"/>
                    <DateContainer>
                        <BookingDateTimeContainer>
                            <BookingDateText>{
                                startDate !== "" && startTime !== "" ?
                                    startDate + " " + startTime : "---------- -----"}</BookingDateText>
                            <BookingDateText> ~ </BookingDateText>
                            <BookingDateText>{
                                endDate.current !== "" && endTime !== "" ?
                                    endDate.current + " " + endTime : "---------- -----"}</BookingDateText>
                        </BookingDateTimeContainer>

                        <BookingDateContainer
                            onMouseOver={(event) => {
                                if (event.target.classList.contains("react-calendar__month-view__days__day")) {

                                }
                            }}>
                            <Calendar className={styles}
                                      onClickDay={changeDate}
                                      goToRangeStartOnSelect={false}
                                      value={[startDate, endDate.current]}
                                      formatDay={(locale, date) => moment(date).format("D")}
                                      minDate={new Date()}
                                      showNeighboringMonth={false}
                                      next2Label={null}
                                      prev2Label={null}
                                      formatShortWeekday={(locale, date) =>
                                          ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]
                                      }
                                      tileDisabled={({date, view}) =>
                                          (view === 'month') &&
                                          dates.some(disabledDate =>
                                              date.getFullYear() === disabledDate.getFullYear() &&
                                              date.getMonth() === disabledDate.getMonth() &&
                                              date.getDate() === disabledDate.getDate()
                                          )}
                                      onActiveStartDateChange={onActiveStartDateChange}
                            />
                            {
                                startDate !== "" ?
                                    <TimeSelector resourceId={resourceId} click={clickTime}/>
                                    : null
                            }

                        </BookingDateContainer>
                    </DateContainer>
                </BookingContentContainer>

                <BookingPurposeContainer>
                    <Capsule color="purple" text="예약목적"/>
                    <PurposeTextarea id='bookingPurpose' maxLength='100'/>
                </BookingPurposeContainer>

                <RequestButtonContainer isCheck={props.isCheck}>
                    <SmallButton name={'예약'} click={requestBookingResource}></SmallButton>
                </RequestButtonContainer>

            </WhiteContainer>
        </RightContainer>
    )
}

export default ResourceBooking;