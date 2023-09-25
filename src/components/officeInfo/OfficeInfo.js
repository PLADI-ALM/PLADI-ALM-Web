import React from "react";
import styled from "styled-components"
import DateIcon from '../../assets/images/selectOffice/date.png'
import Capsule from "components/capsule/Capsule";

export const Container = styled.ul`
    width: 95%;
    height: 300px;
    background: white;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid #E6E6E6;
`

export const OfficeNameContainer = styled.div`
    margin-top: 40px;
`

export const OfficeNameText = styled.text`
    color: #8741CB;
    font-family: NanumSquare_ac;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; 
    margin-right: 16px;
`
export const OfficeRoomText = styled.text`
    color: #575757;
    font-family: NanumSquare_ac;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; 
`

export const OfficeContainer = styled.div`
    width: 100%;
    display: flex;
`

export const OfficeImage = styled.img`
    width: 30%;
    height: 225px;
    flex-shrink: 0;
`

export const OfficeInfoContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;  
`

export const OfficePeopleContainer = styled.div`
    height: 40px;
    display: inline-flex;
    align-items: center;  
`
export const OfficePeopleText = styled.text`
    color: #575757;
    font-family: NanumSquare_ac;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    margin-left: 10px
`

export const OfficeToolContainer = styled.div`
    height: 40px;   
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;  
    margin-right: 20px;
`

export const OfficeContentContainer = styled.div`
    height: 40px;
    display: inline-flex;
    align-items: center; 
`

export const OfficeContentTextContainer = styled.div`
    display: inline-flex;
    align-items: center; 
    width: 90%;
    margin-left: 10px;
    margin-right: 5%;
    margin-top: -2%;
`

export const OfficeContentText = styled.p`
    color: #575757;
    font-family: NanumSquare_ac;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px; 
`







function OfficeInfo(props) {
    return (
        <Container onClick={props.click}>
            <OfficeNameContainer>
                <OfficeNameText>회의실1</OfficeNameText> 
                <OfficeRoomText>401호</OfficeRoomText>
            </OfficeNameContainer>  {/* 회의실 + 호수 div */}

            <OfficeContainer>
                <OfficeImage src={DateIcon}/>

                <OfficeInfoContainer>
                    <OfficePeopleContainer>
                        <Capsule color="purple" text="수용인원"/>
                        <OfficePeopleText>6</OfficePeopleText>
                    </OfficePeopleContainer>

                    <OfficeToolContainer>
                        <Capsule color="white" text="빔 프로젝터"/>
                        <Capsule color="white" text="마이크"/>
                        <Capsule color="white" text="화상회의"/>
                        <Capsule color="white" text="대형 모니터"/>
                        <Capsule color="white" text="대형 모니터"/>
                        외 2개
                    </OfficeToolContainer>

                    <OfficeContentContainer>
                        <Capsule color="purple" text="설명"/>
                    </OfficeContentContainer>
                    
                    <OfficeContentTextContainer>
                        <OfficeContentText>
                            이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용한다면 행운을 얻게 될 것이고, 이 회의실을 사용하지 않는다면... 각오하셔야 될 것입니다. 이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용......
                        </OfficeContentText>
                    </OfficeContentTextContainer>

                </OfficeInfoContainer>
                
            </OfficeContainer>
            
            

        </Container>
    );
}

export default OfficeInfo;