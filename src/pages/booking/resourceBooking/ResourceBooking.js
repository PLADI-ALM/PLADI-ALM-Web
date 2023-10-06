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
import { StatusText, StatusContainer, StatusCircle } from 'components/booking/StatusTag';
import { findStatus } from 'constants/BookingStatus';
import { RightContainer } from 'components/rightContainer/RightContainer';
import 'react-calendar/dist/Calendar.css';

var isStartDateSelect = false;
var startDate = '';
var endDate = '';

export const TitleText = styled.p`
    color: #4C4C4C;
    font-family: NanumSquare_ac;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    align: left;
    width: 170px;
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
const MyStatusContainer = styled(StatusContainer)`
    margin-top: 12px;
    margin-right: 12px;
    float: right;
`

const BookingDateContainer = styled.div`
    padding-top: 5%;
    display: flex;
`

const DateContainer = styled.div`
    float: left;
    padding-left: 1%;
`

const BookingDateInput = styled.input`
    width: 125px;
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

var bookingId = 1;
var resourceId = 1;

function setId(isCheck) {
    // TODO: 수정할 예정
    if(isCheck == 'true') { bookingId = window.location.href.substring(41,) } 
    else { resourceId = window.location.href.substring(38,) }
}

function ResourceBooking(props) {
    setId(props.isCheck);

    const [resourceInfo, setResourceInfo] = useState([]);  
    const [bookingInfo, setBookingDetail] = useState([]); 
    const [bookingStatus, setStatus] = useState([]);

    var [start, setStartDate] = useState();
    var [end, setEndDate] = useState();

    const getResourceInfoForBooking = () => {
        ResourcesAxios.get(""+resourceId)
        .then((Response)=>{ setResourceInfo(Response.data.data) })
        .catch((Error)=>{ 
            console.log(Error)
            window.alert("정보를 불러올 수 없습니댜.") 
            window.history.back()
        });        
    };
    const getBookingTimeState = () => {

        if (props.isCheck == 'true') {
            BookingsAxios.get("resources/"+bookingId)
            .then((Response)=>{ 
                setBookingDetail(Response.data.data)
                setStatus(findStatus(Response.data.data.status))
                resourceId = Response.data.data.resourceId 
                startDate = bookingInfo.startDate
                endDate = bookingInfo.endDate
                getResourceInfoForBooking(resourceId)
            })
            .catch((Error)=>{ 
                console.log('Error -> ', Error)
                window.alert("예약 정보를 불러올 수 없습니댜.") 
                window.history.back()
            });

        } 
    };

    const changeDate = e => {
        const startDateFormat = moment(e[0]).format("YYYY-MM-DD");
        const endDateFormat = moment(e[1]).format("YYYY-MM-DD");

        setStartDate(startDateFormat);
        setEndDate(endDateFormat);

        startDate = startDateFormat;
        endDate = endDateFormat;
      };

    useEffect(()=> {
        getResourceInfoForBooking();
        getBookingTimeState();
    }, []);

    console.log("status -> ", bookingStatus)
    return <RightContainer>
        <TitleText>{(props.isCheck == 'true') ? "예약 내역" : "자원 예약"}</TitleText>

        <ContentContainer isCheck={props.isCheck}>

            <SubTitleContainer>
                <MainTextContainer>
                    <SelectedSubTitleText>{resourceInfo.name}</SelectedSubTitleText>
                </MainTextContainer>
                <SubTextContainer>
                    <UnselectedSubTitleText>{resourceInfo.category}</UnselectedSubTitleText>
                </SubTextContainer>
                <MyStatusContainer isCheck={props.isCheck} background={bookingStatus.background}>
                    <StatusCircle color={bookingStatus.color} />
                    <StatusText color={bookingStatus.color}>{bookingStatus.name}</StatusText>
                </MyStatusContainer>
            </SubTitleContainer>


            <ResourceInfo isTItleHidden={true}
                        title={"title"}
                        category={"category"}
                        description={"description"}
                        />

            {/* 예약일시 */}
            <BookingContentContainer isCheck={'true'}>
                <BookingCapsuleContainer>
                    <Capsule color="purple" text="예약일시"/>
                </BookingCapsuleContainer>  
                <DateContainer>
                    <BookingDateText>{start || "시작일"}</BookingDateText>
                    <BookingDateText> ~ </BookingDateText>
                    <BookingDateText>{end || "마감일"}</BookingDateText>

                    <BookingDateContainer>
                        <Calendar onChange={changeDate}
                                selectRange={true}
                                formatDay={(loacale, date) => moment(date).format("DD")}
                        />                  
                    </BookingDateContainer>
                </DateContainer>               
            </BookingContentContainer>

            <BookingContentContainer isCheck={props.isCheck}>
                <BookingCapsuleContainer>
                    <Capsule color="purple" text="반납일자"/>
                </BookingCapsuleContainer>                 
                <BookingDateText>{getReturnDateStr(bookingInfo.returnDateTime)}</BookingDateText> 
            </BookingContentContainer>


            {/* 예약목적 */}
            <BookingPurposeContainer>
                <BookingCapsuleContainer>
                    <Capsule color="purple" text="예약목적" />
                </BookingCapsuleContainer>

                <BookingPurposeTextFieldContainer>
                    {getPurposeTextField(props.isCheck, bookingInfo.memo)}
                </BookingPurposeTextFieldContainer>
            </BookingPurposeContainer>


            <RequestButtonContainer isCheck={props.isCheck}>
                <RequestBookingButton onClick={requestBookingOffice}>예약</RequestBookingButton>
            </RequestButtonContainer>


        </ContentContainer>
    </RightContainer>
}
export default ResourceBooking;

function getReturnDateStr(returnDateTime) {
return (returnDateTime==null) ? "미반납" : returnDateTime
}

function getPurposeTextField(isCheck, content) {
    if (isCheck == 'true') {
        return <PurposeTextarea id='bookingPurpose' cols='135' rows='5' maxLength='100' value={content} readOnly="readOnly" disabled></PurposeTextarea>
    } else {
        return <PurposeTextarea id='bookingPurpose' cols='135' rows='5' maxLength='100'></PurposeTextarea>
    }
}


function requestBookingOffice() {
    var bookingPurpose = document.getElementById("bookingPurpose").value;

    if (window.confirm("예약하시겠습니까?")) {
        // TODO: 자원 예약 API 연결

        console.log('start date : ', startDate)
        console.log('end date : ', endDate)
        console.log('예약목적 : ', bookingPurpose)
    }
}