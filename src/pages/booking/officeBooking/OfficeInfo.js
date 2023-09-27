import React from 'react';
import styled from "styled-components"
import axios from "axios";
import { useState, useEffect } from "react";
import Capsule from 'components/capsule/Capsule';

import OfficeInfo from "components/officeInfo/OfficeInfo";
import {SubTitleContainer, MainTextContainer, SubTextContainer, SelectedSubTitleText, UnselectedSubTitleText} from 'components/officeBooking/SubTitleBar';
import {OfficeInfoContainer, OfficeImgsContainer, OfficeDetailContainer, OfficeDetailCapsuleContainer, OfficeDetailTextContainer, OfficeDetailText } from 'components/officeBooking/BookingOfficeInfo';
import {BookingContentContainer, BookingTimeContainer, renderBookingTimeBar, BookingDateTextContainer, setBookingState} from 'components/officeBooking/BookingTimeBar';
import {BookingPurposeContainer, BookingCapsuleContainer, BookingPurposeTextFieldContainer} from 'components/officeBooking/BookingPurpose';
import {RequestBookingButton, requestBookingOffice, RequestButtonContainer} from 'components/officeBooking/BookingRequest';


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
    height: 80%;
    border-radius: 12px;
    background: #FFF;
    box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.25);
    margin-top: 20px;
`

function getIndexValue(timeStr) {
    console.log('getIndexValue called')

    var temp = timeStr.substr(0, 2);
    if (temp.substr(0,1) == '0') {
        temp = temp.substr(1,1);
    }
    console.log('parseInt 전 --> ', temp);
    return parseInt(temp);
}

function setBookingStates(bookingStateList) {
    console.log('setBookingStates called')

    for (var i=0; i<bookingStateList.length; i++) {
        var startIdx = getIndexValue(bookingStateList[i].startTime);
        var endIdx = getIndexValue(bookingStateList[i].endTime);
        setBookingState(startIdx, endIdx)
    }
}


function OfficeBooking() {

    const [bookingStateList, setOffices] = useState([]);

    const getBookingTimeState = () => {
        axios.get("http://13.124.122.173/offices/1/booking-state?date=2023-09-25")
        
            .then((Response)=>{
                setOffices(Response.data.data.bookedTimes)
                setBookingStates(bookingStateList)
            })
            .catch((Error)=>{alert(Error)});
    };

    useEffect(()=> {
        getBookingTimeState();
    }, []);

    return (
        <Container>
            {/* <TitleText>회의실 예약</TitleText> */}

            <ContentContainer>

                <SubTitleContainer>
                    <MainTextContainer>
                        <SelectedSubTitleText>회의실명</SelectedSubTitleText>
                    </MainTextContainer>
                    <SubTextContainer>
                        <UnselectedSubTitleText>회의실 위치</UnselectedSubTitleText>
                    </SubTextContainer>
                </SubTitleContainer>

                <OfficeInfo key='{office.name}' 
                            name='{office.name}'
                            location='{office.location}'
                            capacity='{office.capacity}'
                            facilityList={['빔프로젝터']}
                            description='{office.description}'
                            />


                {/* 예약일시 */} 
                <BookingContentContainer>
                    <BookingCapsuleContainer>
                        <Capsule color="purple" text="예약일시"/>
                    </BookingCapsuleContainer>
                    <BookingDateTextContainer>
                        <OfficeDetailText>2023/09/25</OfficeDetailText>      
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