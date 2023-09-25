import React from 'react';
import styled from "styled-components"
import Capsule from 'components/capsule/Capsule';

var selectedCheckList = [
    false, true, false, false, false, false, false, false, false, false, false, false, 
    false, true, false, false, false, false, false, false, false, false, false, false, 
];

function isSelectedTime(time) {
    return selectedCheckList[time];
}

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

export const SubTitleContainer = styled.div`
    width: 100%;
    height: 64px;
    border-radius: 12px;
    background: #2A3042;
`

export const SubTitleTextContainer = styled.div`
    margin-left: 10px;
    margin-top: 15px;
    float: left;
`

export const SelectedSubTitleText = styled.text`
    font-family: NanumSquare_ac;
    font-size: 24px;
    font-weight: 700;
    line-height: 27px;
    letter-spacing: 0em;
    text-align: left;
    color: #FFFFFF;
`

export const UnselectedSubTitleText = styled.text`
    font-family: NanumSquare_ac;
    font-size: 20px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    color: #FFFFFF;
`

export const OfficeInfoContainer = styled.div`
    width: 94%;
    height: 299px;
    border-radius: 12px;
    background: #FFF;
    margin: 3%;
    border: 1px solid #E6E6E6;
`

export const OfficeImgsContainer = styled.div`
    width: 390px;
    height: 255px;
    margin-top: 22px;
    margin-left: 35px;
    background: #2A3042;
    float: left;
`

export const OfficeDetailContainer = styled.div`
    float: left;
    margin-top: 10px;
    margin-left: 15px;
`

export const OfficeDetailCapsuleContainer = styled.div`
    width: 50px;
`
export const BookingCapsuleContainer = styled.div`
    float: left;
`

export const OfficeDetailText = styled.text`
    font-family: NanumSquare_ac;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
`

export const OfficeDetailTextContainer = styled.div`
    width: 800px;
    height: 150px;
    float: left;
`

export const BookingContentContainer = styled.div`
    margin-left: 35px;
`

export const BookingPurposeContainer = styled.div`
    width: 94%;
    height: 100px;
    margin: 3%;
`

export const BookingPurposeTextFieldContainer = styled.div`
    margin-left: 20px;
    float: left;
`

export const contentText = styled.text`
    font-family: NanumSquare_ac;
    font-size: 25px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
`

export const RequestBookingButton = styled.button`
    borger: none;
    padding: 5px 10px;
    background-color: #A263DE;
    color: #FFF;
    width: 82px;
    height: 38px;
    border: none;
    border-radius: 20px;

    font-family: NanumSquare_ac;
    font-size: 20px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
`

export const BookingTimeContainer = styled.div`
    width: 94%;
    hegith: 60px;
    margin-left: 45px;
`

export const FirstBookingTimeButton = styled.button`
    width: 47px;
    height: 30px;
    background-color: ${color => color};
    margin-left: 2px;
    margin-right: 3px;
    border: none;
    border-radius: 15px 0px 0px 15px; 
    onClick = clickTimeBarItem(0);
`

export const LastBookingTimeButton = styled.button`
    width: 47px;
    height: 30px;
    background-color: ${color => color};
    margin-left: 3px;
    margin-right: 1px;
    border: none;
    border-radius:  0px 15px 15px 0px; 
    onClick = clickTimeBarItem(0);
`

export const BookingTimeButton = styled.button`
    width: 47px;
    height: 30px;
    background-color: ${color => color};
    border: none;
    onClick = clickTimeBarItem(0);
`

export const TimeButtonContainer = styled.div`
    width: 47px;
    float: left;
    margin-left: 2px;
    margin-right: 3px;
    margin-bottom: 30px;
`

export const StartTimeTextContainer = styled.div`
    float: left;
`

export const EndTimeTextContainer = styled.div`
    float: right;
`


function renderBookingTimeButtonItem(index) {
    if (index == 0) {
        return <TimeButtonContainer>
            <FirstBookingTimeButton color={isSelectedTime(index) ? '#81c147' : '#D3D3D3'} onClick={clickTimeBarItem(index)}/>
            <StartTimeTextContainer>{index}</StartTimeTextContainer>
        </TimeButtonContainer>
    } else if (index == 23) {
        return <TimeButtonContainer>
            <LastBookingTimeButton color={isSelectedTime(index) ? '#81c147' : '#D3D3D3'} onClick={clickTimeBarItem(index)}/>
            <StartTimeTextContainer>{index}</StartTimeTextContainer>
            <EndTimeTextContainer>{index+1}</EndTimeTextContainer>
        </TimeButtonContainer>
    } else {
        return <TimeButtonContainer>
            <BookingTimeButton color={isSelectedTime(index) ? '#81c147' : '#D3D3D3'} onClick={clickTimeBarItem(index)}/>
            <StartTimeTextContainer>{index}</StartTimeTextContainer>
        </TimeButtonContainer>
    }
}

function clickTimeBarItem(index) {
    console.log('바뀌기 전 -> ', selectedCheckList[index]);
    selectedCheckList[index] = !selectedCheckList[index];
    console.log('바뀐 후 -> ', selectedCheckList[index]);
}

function renderBookingTimeBar() {
    var items = [];
    for (var i = 0; i < 24; i++) {
        items.push(renderBookingTimeButtonItem(i));
    }
    return items;
}

function requestBookingOffice() {
    var bookingPurpose = document.getElementById("bookingPurpose").value;
    console.log("예약목적 : ", bookingPurpose);
    alert("회의실을 예약하겠습니까?");
}

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