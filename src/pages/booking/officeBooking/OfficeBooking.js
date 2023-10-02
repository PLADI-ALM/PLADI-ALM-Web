import React from 'react';
import styled from "styled-components"
import axios from "axios";
import { OfficesAxios, BookingsAxios } from 'api/AxiosApi';
import { useState, useEffect } from "react";
import Capsule from 'components/capsule/Capsule';

import OfficeInfo from "components/officeInfo/OfficeInfo";
import {SubTitleContainer, MainTextContainer, SubTextContainer, SelectedSubTitleText, UnselectedSubTitleText} from 'components/officeBooking/SubTitleBar';
import {DatePicker} from 'components/searchBar/SearchBar';
import {BookingContentContainer, BookingTimeContainer, renderBookingTimeBar, BookingDateTextContainer, setBookingState, setBookingTime,
    RequestBookingButton, requestBookingOffice, RequestButtonContainer} from 'components/officeBooking/BookingTimeBar';
import {BookingPurposeContainer, BookingCapsuleContainer, BookingPurposeTextFieldContainer} from 'components/officeBooking/BookingPurpose';

var bookingDate = '';
var bookingId = 1;
var officeId = 1;

export const Container = styled.div`
    width: 87%;
    heigth: 100%;
    margin-left: 80px;
    margin-top: 73px;
`

export const TitleText = styled.text`
    color: #4C4C4C;
    font-family: NanumSquare_ac;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
`

export const ContentContainer = styled.div`
    width: 90%;
    height: ${props => (props.isCheck == 'true') ? '80%' : '85%'};;
    border-radius: 12px;
    background: #FFF;
    box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.25);
    margin-top: 20px;
`

export const BookingDateText = styled.p`
    margin: 6px 0 0 0;
    color: #575757;
    font-family: NanumSquare_ac;
    font-size: 22px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
`

function setId(isCheck) {
    if(isCheck) {
        bookingId = window.location.href.substring(39,)  // TODO: 수정할 예정
    } else {
        officeId = window.location.href.substring(36,)  // TODO: 수정할 예정
    }
}


function OfficeBooking(props) {
    setId(props.isCheck);

    const [officeInfo, setOfficeInfo] = useState([]);  
    const [bookingInfo, setBookingDetail] = useState([]);  
    var [date, setDate] = useState("");

    const changeDate = (e) => {
        if(bookingDate == '') { bookingDate = new Date().toISOString().slice(0, 10) }
        setDate(e.target.value)
        bookingDate = e.target.value;
    }

    const getBookingTimeState = () => {
        if(date.length == 0) {
            const dateNow = new Date();
            date = dateNow.toISOString().slice(0, 10);
            bookingDate = date;
        }

        if (props.isCheck == 'true') {
            BookingsAxios.get("offices/"+bookingId)
        
            .then((Response)=>{
                setBookingDetail(Response.data.data)
                bookingDate = Response.data.data.date
                setBookingTime(Response.data.data.startTime, Response.data.data.endTime)
            })
            .catch((Error)=>{ 
                console.log('Error -> ', Error)
                window.alert("예약 정보를 불러올 수 없습니댜.") 
                // window.history.back()
            });

        } else {
            OfficesAxios.get(officeId+"/booking-state?date="+bookingDate)
            .then((Response)=>{
                setBookingInfo(Response.data.data.bookedTimes)
                setBookingState(Response.data.data.bookedTimes)
            })
            .catch((Error)=>{ 
                console.log(Error)
                window.alert("정보를 불러올 수 없습니댜.") 
                // window.history.back()
            });
        }
        
    };

    const getOfficeInfoForBooking = () => {
        // OfficesAxios.get(officeId)
        //     .then((Response)=>{
        //         setOfficeInfo(Response.data.data)
        //     })
        //     .catch((Error)=>{ 
        //         console.log(Error)
        //         window.alert("정보를 불러올 수 없습니댜.") 
        //         // window.history.back()
        //     });        
    };

    useEffect(()=> {
        getOfficeInfoForBooking();
        getBookingTimeState();
    }, []);

    return (
        <Container>
            {/* <TitleText>회의실 예약</TitleText> */}

            <ContentContainer isCheck={props.isCheck}>

                <SubTitleContainer>
                    <MainTextContainer>
                        <SelectedSubTitleText>{props.isCheck ? "회의실명" : officeInfo.name}</SelectedSubTitleText>
                    </MainTextContainer>
                    <SubTextContainer>
                        <UnselectedSubTitleText>{props.isCheck ? "회의실위치" : officeInfo.location}</UnselectedSubTitleText>
                    </SubTextContainer>
                    {/* TODO: 예약중, 사용중, 사용완료, 예약취소 div 추가*/}
                </SubTitleContainer>
                
                <OfficeInfo isHidden={true}
                            key={officeInfo.name} 
                            name={officeInfo.name}
                            location={officeInfo.location}
                            capacity={officeInfo.capacity}
                            facilityList={officeInfo.facilityList}
                            description={officeInfo.description}
                            />

                {/* 예약일시 */} 
                <BookingContentContainer>
                    <BookingCapsuleContainer>
                        <Capsule color="purple" text="예약일시"/>
                    </BookingCapsuleContainer>
                    <BookingDateTextContainer>
                        {getBookingDate(props.isCheck, bookingInfo, changeDate)}
                    </BookingDateTextContainer>                    
                </BookingContentContainer>
                    
                <BookingTimeContainer>
                    {renderBookingTimeBar()}
                </BookingTimeContainer>
                

                {/* 예약목적 */}
                <BookingPurposeContainer>
                    <BookingCapsuleContainer>
                        <Capsule color="purple" text="예약목적"/>
                    </BookingCapsuleContainer>

                    <BookingPurposeTextFieldContainer>
                        {getPurposeTextField(props.isCheck, bookingInfo.memo)}
                    </BookingPurposeTextFieldContainer>
                </BookingPurposeContainer>
                
                
                <RequestButtonContainer isCheck={props.isCheck}>
                    <RequestBookingButton onClick={requestBookingOffice}>예약</RequestBookingButton>
                </RequestButtonContainer>


            </ContentContainer>
        </Container>
    );
}
export default OfficeBooking;

function getPurposeTextField(isCheck, content) {
    if (isCheck == 'true') {
        return <textarea id='bookingPurpose' cols='135' rows='5' maxLength='100' value={content} readOnly="readOnly" disabled></textarea>
    } else {
        return <textarea id='bookingPurpose' cols='135' rows='5' maxLength='100'></textarea>
    }
} 

function getBookingDate(isCheck, info, changeDate) {
    if (isCheck == 'true') {
        return <BookingDateText>{info.date + " " + info.startTime + " ~ " + info.endTime}</BookingDateText>
    } else {
        return <DatePicker type="date" onChange={changeDate} value={bookingDate} />
    }
}


function setBookingInfo(bookingPurpose, startT, endT) {
    // console.log("예약일시 : ", bookingDate);
    // console.log("예약목적 : ", bookingPurpose);
    // console.log("시작시간 : ", startT);
    // console.log("마감시간 : ", endT);

    if (window.confirm("예약하시겠습니까?")) {
        axios.post("http://13.124.122.173/offices/1/booking", 
            {
                date: bookingDate,
                startTime: startT,
                endTime: endT,
                memo: bookingPurpose
            }
        )
        .then(function (response) { 
            if (response.data.status == '200') { alert('예약에 성공하였습니다!') } 
            else { alert(response.data.message); }
        })
        .catch(function (error) { console.log(error) });
    }
} 
export {setBookingInfo};