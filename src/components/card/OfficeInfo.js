import React from "react";
import styled from "styled-components"
import DateIcon from '../../assets/images/selectOffice/date.png'
import Capsule from "components/capsule/Capsule";
import { Card, CardText, TitleContainer, NameText, DetailContainer, CardImage, InfoContainer, DescriptionContainer, DescriptionText } from "components/card/Card";

// 수용인원 컨테이너
const OfficePeopleContainer = styled.div`
    height: 40px;
    display: inline-flex;
    align-items: center;
`

// 시설 컨테이너
const OfficeToolContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
`

function openBookingPage(officeId) { 
    window.location.href = "/officeBooking/"+officeId
}

function OfficeInfo(props) {
    return (
        <Card onClick={() => (props.isDetailPage) ? {} : openBookingPage(props.officeId)}>
            <TitleContainer hidden={props.hidden}>
                <NameText href={"/officeBooking/"+props.officeId}>{props.name}</NameText>
                <CardText>{props.location}</CardText>
            </TitleContainer>

            <DetailContainer>
                <CardImage src={props.imgUrl} />

                <InfoContainer>
                    <OfficePeopleContainer>
                        <Capsule color="purple" text="수용인원" />
                        <CardText>{props.capacity}</CardText>
                    </OfficePeopleContainer>

                    <OfficeToolContainer>
                        {props.facilityList && props.facilityList.map((facility) => <Capsule color="white" text={facility}/>)}
                    </OfficeToolContainer>

                    <DescriptionContainer>
                        <Capsule color="purple" text="설명" />
                        <DescriptionText>
                            {props.description}
                        </DescriptionText>
                    </DescriptionContainer>

                </InfoContainer>

            </DetailContainer>
        </Card>
    );
}

export default OfficeInfo;