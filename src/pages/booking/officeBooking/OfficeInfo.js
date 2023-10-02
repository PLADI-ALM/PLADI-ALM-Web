import React from 'react';
import styled from "styled-components"
import axios from "axios";
import { useState, useEffect } from "react";
import Capsule from 'components/capsule/Capsule';

import OfficeInfo from "components/officeInfo/OfficeInfo";
import {SubTitleContainer, MainTextContainer, SubTextContainer, SelectedSubTitleText, UnselectedSubTitleText} from 'components/officeBooking/SubTitleBar';
import {DatePicker} from 'components/searchBar/SearchBar';
import {BookingContentContainer, BookingTimeContainer, renderBookingTimeBar, BookingDateTextContainer, setBookingState,
    RequestBookingButton, requestBookingOffice, RequestButtonContainer} from 'components/officeBooking/BookingTimeBar';
import {BookingPurposeContainer, BookingCapsuleContainer, BookingPurposeTextFieldContainer} from 'components/officeBooking/BookingPurpose';

var bookingDate = '';

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
    height: 85%;
    border-radius: 12px;
    background: #FFF;
    box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.25);
    margin-top: 20px;
`

function getIndexValue(timeStr) {
    var temp = timeStr.substr(0, 2);
    if (temp.substr(0,1) == '0') {
        temp = temp.substr(1,1);
    }
    return parseInt(temp);
}

function setBookingStates(bookingStateList) {
    for (var i=0; i<bookingStateList.length; i++) {
        var startIdx = getIndexValue(bookingStateList[i].startTime);
        var endIdx = getIndexValue(bookingStateList[i].endTime);
        setBookingState(startIdx, endIdx)
    }
}


function OfficeBooking() {

    const [bookingStateList, setOffices] = useState([]);
    const [officeInfo, setOfficeInfo] = useState([]);   
    var [date, setDate] = useState("");

    const changeDate = (e) => {
        setDate(e.target.value)
        bookingDate = e.target.value;
    }

    const getBookingTimeState = () => {
        if(date.length == 0) {
            const dateNow = new Date();
            date = dateNow.toISOString().slice(0, 10);
            bookingDate = date;
        }
        axios.get("http://13.124.122.173/offices/1/booking-state?date="+date)
        
            .then((Response)=>{
                setOffices(Response.data.data.bookedTimes)
                setBookingStates(bookingStateList)
            })
            .catch((Error)=>{alert(Error)});
    };

    const getOfficeInfoForBooking = () => {
        axios.get("http://13.124.122.173/offices/1")
        
        .then((Response)=>{
            setOfficeInfo(Response.data.data)
        })
        .catch((Error)=>{alert(Error)});
    };

    useEffect(()=> {
        getOfficeInfoForBooking();
        getBookingTimeState();
    }, []);

    return (
        <Container>
            {/* <TitleText>회의실 예약</TitleText> */}

            <ContentContainer>

                <SubTitleContainer>
                    <MainTextContainer>
                        <SelectedSubTitleText>{officeInfo.name}</SelectedSubTitleText>
                    </MainTextContainer>
                    <SubTextContainer>
                        <UnselectedSubTitleText>{officeInfo.location}</UnselectedSubTitleText>
                    </SubTextContainer>
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
                        <DatePicker type="date" onChange={changeDate} />
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
                        <textarea id='bookingPurpose' cols='135' rows='5' maxLength='100'></textarea>
                    </BookingPurposeTextFieldContainer>
                </BookingPurposeContainer>
                
                
                <RequestButtonContainer>
                    <RequestBookingButton onClick={requestBookingOffice}>예약</RequestBookingButton>
                </RequestButtonContainer>


            </ContentContainer>
        </Container>
    );
}
export default OfficeBooking;

function setBookingInfo(bookingPurpose, startT, endT) {
    console.log("예약일시 : ", bookingDate);
    console.log("예약목적 : ", bookingPurpose);
    console.log("시작시간 : ", startT);
    console.log("마감시간 : ", endT);

    axios.post("http://13.124.122.173/offices/1/booking", 
        {
            date: bookingDate,
            startTime: startT,
            endTime: endT,
            memo: bookingPurpose
        }
    )
    .then(function (response) { 
        if (response.data.status == '200') {
            alert('예약에 성공하였습니다!')
        } else {
            alert(response.data.message);
        }
    })
    .catch(function (error) { console.log(error) });
}
export {setBookingInfo};