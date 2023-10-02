import React from "react";
import styled from "styled-components"
import Example from '../../assets/images/example.png'
import Capsule from "components/capsule/Capsule";
import { ResourceCard, CardText, TitleContainer, NameText, DetailContainer, ResourceCardImage, InfoContainer, DescriptionContainer, OfficeContentText, ResourceTitle } from "components/card/Card";

// 자원명 컨테이너
const ResourceTitleContainer = styled.div`
    height: 20px;
    display: inline-flex;
    align-items: center;
`


function ResourceInfo(props) {
    return (
        <ResourceCard onClick={props.click}>
            <DetailContainer>
                <ResourceCardImage src={Example} />

                <InfoContainer>
                    <ResourceTitleContainer>
                        <ResourceTitle>{props.title}</ResourceTitle>
                        <CardText>{props.category}</CardText>
                    </ResourceTitleContainer>

                    <DescriptionContainer>
                        <Capsule color="purple" text="설명" />
                        <OfficeContentText>
                            {props.description}
                        </OfficeContentText>
                    </DescriptionContainer>

                </InfoContainer>

            </DetailContainer>
        </ResourceCard>
    );
}

export default ResourceInfo;