import React, {useEffect, useState} from 'react';
import styled from "styled-components"
import {OfficesAxios} from 'api/AxiosApi';
import {useParams} from 'react-router-dom';
import Capsule from 'components/capsule/Capsule';

import OfficeInfo from "components/card/OfficeInfo";
import {DetailSubTitleText, NameSubTitleText} from 'components/officeBooking/SubTitleBar';
import {
    BookingContentContainer,
    BookingTimeContainer,
    renderBookingTimeBar,
    RequestButtonContainer,
    setBookingState
} from 'components/officeBooking/BookingTimeBar';
import {BookingPurposeContainer} from 'components/officeBooking/BookingPurpose';
import {RightContainer, TitleText, WhiteContainer} from 'components/rightContainer/RightContainer';
import {basicError} from 'utils/ErrorHandlerUtil';
import SmallButton from 'components/button/SmallButton';
import {Bar} from '../../myBookings/BookedList';
import {getToken} from 'utils/IsLoginUtil';
import moment from 'moment';

var bookingDate = '';
var startTimeStr = '';
var endTimeStr = '';

const DatePicker = styled.input.attrs({type: 'date'})`
  color: #717171;
  font-size: 20px;
  border: none;
`

export const BookingDateText = styled.p`
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
  line-height: 30px;
  text-align: left;
  margin-right: 20px;
`

function OfficeBooking(props) {
    let {officeId} = useParams();

    const [officeInfo, setOfficeInfo] = useState([]);   // 회의실 정보
    const [bookingInfo, setBookingDetail] = useState([]);   // 
    var [date, setDate] = useState(""); // 예약날짜 변경

    if (date.length === 0) {
        date = moment(new Date()).format("YYYY-MM-DD")
        bookingDate = date;
    }

    // 달력 내 날짜가 바뀌는 경우 -> 예약일 변수 값 변경
    const changeDate = (e) => {
        if (bookingDate === '') {
            bookingDate = new Date().toISOString().slice(0, 10)
        }
        setDate(e.target.value)
        bookingDate = e.target.value;
        getBookingTimeState()
    }

    // 일자별 예약 현황 받아오기
    const getBookingTimeState = () => {
        OfficesAxios.get(`/${officeId}/booking-state?date=${bookingDate}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                setBookingDetail(Response.data.data.bookedTimes)
                setBookingState(Response.data.data.bookedTimes)
            })
            .catch((Error) => {
                basicError(Error)
                console.log(Error)
                window.alert("예약 현황을 불러오는데 실패하였습니다.")
                window.history.back()
            });
    };

    // 예약자 정보
    const getBookingInfo = (date, time) => {
        OfficesAxios.get(`/${officeId}/booking?date=${date}&time=${time}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                setBookingDetail(Response.data.data.bookedTimes)
                setBookingState(Response.data.data.bookedTimes)
            })
            .catch((Error) => {
                basicError(Error)
                window.alert("예약 정보를 불러오는데 실패하였습니다.")
                window.history.back()
            });
    };

    // 회의실 정보 받아오기
    const getOfficeInfoForBooking = (id) => {
        OfficesAxios.get(`/${officeId}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((Response) => {
                setOfficeInfo(Response.data.data)
            })
            .catch((Error) => {
                basicError(Error)
                console.log(Error)
                window.alert("회의실 정보를 불러올 수 없습니댜.")
                window.history.back()
            });
    };

    const requestBooking = () => {
        var bookingPurpose = document.getElementById("bookingPurpose").value;
        if (endTimeStr === 24) {
            endTimeStr = 0
        }

        if (window.confirm("예약하시겠습니까?")) {
            OfficesAxios.post(`/${officeId}/booking`,
                {
                    date: bookingDate,
                    startTime: getTimeStr(startTimeStr),
                    endTime: getTimeStr(endTimeStr),
                    memo: bookingPurpose
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
                    getBookingTimeState()
                })
                .catch((Error) => {
                    basicError(Error)
                    console.log(Error)
                    window.alert("예약에 실패하였습니다.")
                });
        }
    }

    useEffect(() => {
        getBookingTimeState();
        getOfficeInfoForBooking();
    }, []);

    return (
        <RightContainer>
            <TitleText>회의실 예약</TitleText>

            <WhiteContainer>
                <Bar>
                    <NameSubTitleText>{officeInfo.name}</NameSubTitleText>
                    <DetailSubTitleText>{officeInfo.location}</DetailSubTitleText>
                </Bar>

                <OfficeInfo isDetailPage={true}
                            isHidden={true}
                            key={officeInfo.name}
                            name={officeInfo.name}
                            location={officeInfo.location}
                            capacity={officeInfo.capacity}
                            facilityList={officeInfo.facilityList}
                            description={officeInfo.description}
                            imgUrl={officeInfo.imgUrl}
                />

                <BookingContentContainer>
                    <Capsule color="purple" text="예약일시"/>
                    <DatePicker onChange={changeDate} value={bookingDate}/>
                </BookingContentContainer>

                <BookingTimeContainer>
                    {renderBookingTimeBar(false)}
                </BookingTimeContainer>

                <BookingPurposeContainer>
                    <Capsule color="purple" text="예약목적"/>
                    <PurposeTextarea id='bookingPurpose' maxLength='100'/>
                </BookingPurposeContainer>

                <RequestButtonContainer>
                    <SmallButton name={'예약'} click={requestBooking}></SmallButton>
                </RequestButtonContainer>

            </WhiteContainer>
        </RightContainer>
    );
}

export default OfficeBooking;

function setStartTimeStr(startTime) {
    startTimeStr = startTime
}

export {setStartTimeStr};

function setEndTimeStr(endTime) {
    endTimeStr = endTime
}

export {setEndTimeStr};

function getTimeStr(props) {
    var str = ''
    if (props < 10) {
        str = '0' + props + ':00'
    } else {
        str = props + ':00'
    }
    return str
}