import React, {useEffect, useState} from 'react';
import styled from "styled-components"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import {CarsAxios, ResourcesAxios} from 'api/AxiosApi';
import {useParams} from 'react-router-dom';
import Capsule from 'components/capsule/Capsule';
import {DetailSubTitleText, NameSubTitleText} from 'components/officeBooking/SubTitleBar';
import {BookingPurposeContainer} from 'components/officeBooking/BookingPurpose';
import {BookingContentContainer, RequestButtonContainer} from 'components/officeBooking/BookingTimeBar';
import {RightContainer, TitleText, WhiteContainer} from 'components/rightContainer/RightContainer';
import styles from "pages/basic/booking/resource/CustomCalendar.css";
import {basicError} from 'utils/ErrorHandlerUtil';
import SmallButton from 'components/button/SmallButton';
import {Bar} from 'pages/basic/myBookings/BookedList';
import {getToken} from 'utils/IsLoginUtil';
import ResourceDetailInfo from "components/card/ResourceDetailInfo";

var startDate = '';
var endDate = '';

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
  padding-top: 7%;
`

export const DateContainer = styled.div`
  padding-left: 1%;
`

var currentMonth = moment(new Date()).format('YYYY-MM')

function CarBooking(props) {
    let {carId} = useParams();

    const [carInfo, setCarInfo] = useState([]);
    const [dates, setBookedDates] = useState([]);
    var [start, setStartDate] = useState();
    var [end, setEndDate] = useState();
    const [changed, setCurrentMonth] = useState();

    const getCarInfo = () => {
        CarsAxios.get(`/${carId}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                setCarInfo(Response.data.data)
            })
            .catch((Error) => {
                basicError(Error)
                console.log(Error)
                window.alert("차량 정보를 불러올 수 없습니댜.")
                window.history.back()
            });
    };

    const getBookedDates = () => {
        const params = {month: currentMonth};
        ResourcesAxios.get(`/${carId}/booking-state`, {
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
                console.log(Error)
                window.alert("예약 정보를 불러올 수 없습니댜.")
                window.history.back()
            });
    }

    const changeDate = e => {
        const startDateFormat = moment(e[0]).format("YYYY-MM-DD");
        const endDateFormat = moment(e[1]).format("YYYY-MM-DD");

        setStartDate(startDateFormat)
        setEndDate(endDateFormat)

        startDate = startDateFormat
        endDate = endDateFormat

        for (var i = 0; i < dates.length; i++) {
            var temp = new Date(dates[i])
            temp = moment(temp).format("YYYY-MM-DD")

            if (startDateFormat <= temp && endDateFormat >= temp) {
                alert('예약된 일자를 포함한 날짜는 선택할 수 없습니다.')
                startDate = '';
                endDate = '';
                setStartDate(startDate)
                setEndDate(endDate)
                window.location.reload()
                return
            }
        }
    };

    const onActiveStartDateChange = (e) => {
        const changed = moment(e.activeStartDate).format("YYYY-MM")
        setCurrentMonth(changed)
        currentMonth = changed
        getBookedDates()
    }

    const requestBookingResource = () => {
        var bookingPurpose = document.getElementById("bookingPurpose").value;

        if (window.confirm("예약하시겠습니까?")) {
            ResourcesAxios.post(`/${carId}`,
                {
                    "endDate": endDate,
                    "memo": bookingPurpose,
                    "startDate": startDate
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
                    console.log(Error)
                    window.alert("차량 예약에 실패하였습니다.")
                    window.history.back()
                });
        }
    }

    useEffect(() => {
        getCarInfo()
        getBookedDates()
    }, []);

    return (
        <RightContainer>
            <TitleText>차량 예약</TitleText>

            <WhiteContainer>
                <Bar>
                    <NameSubTitleText>{carInfo.name}</NameSubTitleText>
                    <DetailSubTitleText>{carInfo.location}</DetailSubTitleText>
                </Bar>

                <ResourceDetailInfo
                    managerName={carInfo.responsibilityName}
                    managerPhone={carInfo.responsibilityPhone}
                    description={carInfo.description}
                    imgUrl={carInfo.imgUrl}/>

                <BookingContentContainer>
                    <Capsule color="purple" text="예약일시"/>
                    <DateContainer>
                        <BookingDateText>{start || "시작일"}</BookingDateText>
                        <BookingDateText> ~ </BookingDateText>
                        <BookingDateText>{end || "마감일"}</BookingDateText>

                        <BookingDateContainer>
                            <Calendar className={styles}
                                      onChange={changeDate}
                                      selectRange={true}
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

export default CarBooking;