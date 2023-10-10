import React from 'react';
import styled from "styled-components"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment, { locale } from 'moment';
import { ResourcesAxios, BookingsAxios } from 'api/AxiosApi';
import { useState, useEffect } from "react";
import Capsule from 'components/capsule/Capsule';
import { SubTitleContainer, MainTextContainer, SubTextContainer, SelectedSubTitleText, UnselectedSubTitleText } from 'components/officeBooking/SubTitleBar';
import { BookingPurposeContainer, BookingCapsuleContainer, BookingPurposeTextFieldContainer } from 'components/officeBooking/BookingPurpose';
import ResourceInfo from 'components/resourceInfo/ResourceInfo';
import { BookingContentContainer, RequestButtonContainer, RequestBookingButton } from 'components/officeBooking/BookingTimeBar';
import { RightContainer } from 'components/rightContainer/RightContainer';
import 'react-calendar/dist/Calendar.css';
import styles from "../resourceBooking/CustomCalendar.css";

var startDate = '';
var endDate = '';

export const TitleText = styled.p`
    color: #4C4C4C;
    font-family: NanumSquare_ac;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    align: left;
    width: 200px;
    margin: 0;
`

export const ContentContainer = styled.div`
    width: 90%;
    border-radius: 12px;
    background: #FFF;
    box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.25);
    margin-top: 20px;
`

export const BookingDateText = styled.text`
    margin: 5px 0 0 0;
    padding-left: 10px;
    color: #575757;
    background-color: ${props => props.isSelected != 'true' ? 'red' : 'white'}
    font-family: NanumSquare_ac;
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 0em;
    text-align: left;
`

export const PurposeTextarea = styled.textarea`
    padding: 6px 0 0 18px;
    border-radius: 12px;
    border-width:1;
    border-style:solid;
    border-color:black;
    background-color: #ffffff;
    font-family: NanumSquare_ac;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
    margin: 0 10px 0 10px;
`

export const BookingDateContainer = styled.div`
    padding-top: 7%;
`

export const DateContainer = styled.div`
    padding-left: 1%;
`

var resourceId = 1
var currentMonth = moment(new Date()).format('YYYY-MM')

function ResourceBooking(props) {
    resourceId = window.location.href.substring(38,);

    const [resourceInfo, setResourceInfo] = useState([]);
    const [dates, setBookedDates] = useState([]);
    var [start, setStartDate] = useState();
    var [end, setEndDate] = useState();
    const [changed, setCurrentMonth] = useState();

    const getResourceInfo = () => {
        ResourcesAxios.get(""+resourceId)
        .then((Response)=>{ setResourceInfo(Response.data.data) })
        .catch((Error)=>{ 
            console.log(Error)
            window.alert("자원 정보를 불러올 수 없습니댜.") 
            window.history.back()
        });        
    };

    const getBookedDates = () => {
        const params = { month: currentMonth };
        ResourcesAxios.get(resourceId+"/booking-state", {params})
        .then((Response)=>{     
            var temp = [];  
            Response.data.data.map(function(date) { temp.push(new Date(date)) })
            setBookedDates(temp)
        })
        .catch((Error)=>{ 
            console.log(Error)
            window.alert("예약 현황 정보를 불러올 수 없습니댜.") 
            window.history.back()
        }); 
    }

    const changeDate = e => {
        const startDateFormat = moment(e[0]).format("YYYY-MM-DD");
        const endDateFormat = moment(e[1]).format("YYYY-MM-DD");

        setStartDate(startDateFormat);
        setEndDate(endDateFormat);

        startDate = startDateFormat;
        endDate = endDateFormat;
    };

    const onActiveStartDateChange = (e) => {
        const changed = moment(e.activeStartDate).format("YYYY-MM")
        setCurrentMonth(changed)
        currentMonth = changed
        getBookedDates()
    }

    useEffect(()=> {
        getResourceInfo()
        getBookedDates()
    }, []);

    return <RightContainer>
        <TitleText>자원 예약</TitleText>

        <ContentContainer>

            <SubTitleContainer>
                <MainTextContainer>
                    <SelectedSubTitleText>{resourceInfo.name}</SelectedSubTitleText>
                </MainTextContainer>
                <SubTextContainer>
                    <UnselectedSubTitleText>{resourceInfo.category}</UnselectedSubTitleText>
                </SubTextContainer>
            </SubTitleContainer>

            <ResourceInfo description={resourceInfo.description}/>

            <BookingContentContainer>
                <BookingCapsuleContainer>
                    <Capsule color="purple" text="예약일시"/>
                </BookingCapsuleContainer>  
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
                <BookingCapsuleContainer>
                    <Capsule color="purple" text="예약목적" />
                </BookingCapsuleContainer>

                <BookingPurposeTextFieldContainer>
                    <PurposeTextarea id='bookingPurpose' 
                                    cols='135' 
                                    rows='5' 
                                    maxLength='100' />
                </BookingPurposeTextFieldContainer>
            </BookingPurposeContainer>


            <RequestButtonContainer isCheck={props.isCheck}>
                <RequestBookingButton onClick={requestBookingOffice}>예약</RequestBookingButton>
            </RequestButtonContainer>


        </ContentContainer>
    </RightContainer>
}
export default ResourceBooking;


function requestBookingOffice() {
    var bookingPurpose = document.getElementById("bookingPurpose").value;

    if (window.confirm("예약하시겠습니까?")) {
        ResourcesAxios.post(""+resourceId,
            {
                "endDate": endDate,
                "memo": bookingPurpose,
                "startDate": startDate
            }
        )
        .then(function (response) {
            if (response.data.status === '200') { alert('예약에 성공하였습니다!') }
            else { alert(response.data.message); }
            window.location.reload()
        })
        .catch(function (error) { 
            console.log(error) 
            window.alert("자원 예약에 실패하였습니다. \n",error.response.data.message) 
            window.history.back()
        });

        console.log('start date : ', startDate)
        console.log('end date : ', endDate)
        console.log('예약목적 : ', bookingPurpose)
    }
}


