import React from "react";
import styled from "styled-components"
import DateIcon from '../../assets/images/selectOffice/date.png'
import Capsule from "components/capsule/Capsule";
import { Card, CardText, TitleContainer, NameText, DetailContainer, CardImage, InfoContainer, DescriptionContainer, OfficeContentText } from "components/card/Card";

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

function OfficeInfo(props) {
    return (
        <Card onClick={props.click}>
            <TitleContainer>
                <NameText>회의실1</NameText>
                <CardText>401호</CardText>
            </TitleContainer>

            <DetailContainer>
                <CardImage src={DateIcon} />

                <InfoContainer>
                    <OfficePeopleContainer>
                        <Capsule color="purple" text="수용인원" />
                        <CardText>6</CardText>
                    </OfficePeopleContainer>

                    <OfficeToolContainer>
                        <Capsule color="white" text="빔 프로젝터" />
                        <Capsule color="white" text="마이크" />
                        <Capsule color="white" text="화상회의" />
                        <Capsule color="white" text="대형 모니터" />
                        <Capsule color="white" text="대형 모니터" />
                        외 2개
                    </OfficeToolContainer>

                    <DescriptionContainer>
                        <Capsule color="purple" text="설명" />
                        <OfficeContentText>
                            이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용한다면 행운을 얻게 될 것이고, 이 회의실을 사용하지 않는다면... 각오하셔야 될 것입니다. 이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용......
                            이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용한다면 행운을 얻게 될 것이고, 이 회의실을 사용하지 않는다면... 각오하셔야 될 것입니다. 이 회의실은 최초로 영국에서 시작되어... 만약 당신이 이 회의실을 사용......
                        </OfficeContentText>
                    </DescriptionContainer>

                </InfoContainer>

            </DetailContainer>
        </Card>
    );
}

export default OfficeInfo;