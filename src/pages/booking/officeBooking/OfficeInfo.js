import React from 'react';
import styled from "styled-components"
import Capsule from 'components/capsule/Capsule';

import {SubTitleContainer, SubTitleTextContainer, SelectedSubTitleText, UnselectedSubTitleText} from 'components/officeBooking/SubTitleBar';
import {OfficeInfoContainer, OfficeImgsContainer, OfficeDetailContainer, OfficeDetailCapsuleContainer, OfficeDetailTextContainer, OfficeDetailText } from 'components/officeBooking/BookingOfficeInfo';
import {BookingContentContainer, BookingTimeContainer, renderBookingTimeBar} from 'components/officeBooking/BookingTimeBar';
import {BookingPurposeContainer, BookingCapsuleContainer, BookingPurposeTextFieldContainer} from 'components/officeBooking/BookingPurpose';
import {RequestBookingButton, requestBookingOffice} from 'components/officeBooking/BookingRequest';


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


function OfficeBooking() {
    return (
        <Container>
            <TitleText>회의실 예약</TitleText>

            <ContentContainer>

                <SubTitleContainer>
                    <SubTitleTextContainer>
                        <SelectedSubTitleText>회의실명</SelectedSubTitleText>
                    </SubTitleTextContainer>
                    <SubTitleTextContainer>
                        <UnselectedSubTitleText>회의실 위치</UnselectedSubTitleText>
                    </SubTitleTextContainer>
                </SubTitleContainer>
                

                <OfficeInfoContainer>
                    <OfficeImgsContainer>
                    </OfficeImgsContainer>

                    <OfficeDetailContainer>

                        <OfficeDetailCapsuleContainer>
                        <Capsule color="purple" text="수용인원"/>
                        </OfficeDetailCapsuleContainer>

                        <OfficeDetailCapsuleContainer>
                            <Capsule color="white" text="빔 포르젝터"/>
                        </OfficeDetailCapsuleContainer>

                        <OfficeDetailCapsuleContainer>
                            <Capsule color="purple" text="설명"/>
                        </OfficeDetailCapsuleContainer>

                        <OfficeDetailTextContainer>
                            <OfficeDetailText>
                            이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용한다면 행운을 얻게 될 것이고, 이 회의실을 사용하지 않는다면... 각오하셔야 될 것입니다. 이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용......
                            </OfficeDetailText>
                        </OfficeDetailTextContainer>
                        
                    </OfficeDetailContainer>
                </OfficeInfoContainer>



                {/* 예약일시 */} 
                <div>
                    <BookingContentContainer>
                        {/* <BookingCapsuleContainer>
                            <Capsule color="purple" text="예약일시"/>
                        </BookingCapsuleContainer> */}

                        {/* <OfficeDetailText>2023/09/25</OfficeDetailText> */}
                        
                    </BookingContentContainer>
                        
                    
                    <BookingTimeContainer>
                        {renderBookingTimeBar()}
                    </BookingTimeContainer>
                </div>
                

                {/* 예약목적 */}
                <BookingPurposeContainer>
                    <BookingCapsuleContainer>
                        <Capsule color="purple" text="예약목적"/>
                    </BookingCapsuleContainer>

                    <BookingPurposeTextFieldContainer>
                        <textarea id='bookingPurpose' cols='135' rows='5' maxLength='100'></textarea>
                    </BookingPurposeTextFieldContainer>
                </BookingPurposeContainer>
                
                
                <RequestBookingButton onClick={requestBookingOffice}>예약</RequestBookingButton>


            </ContentContainer>
        </Container>
    );
}

export default OfficeBooking;