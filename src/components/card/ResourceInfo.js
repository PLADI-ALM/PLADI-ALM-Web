import React from "react";
import styled from "styled-components"
import Capsule from "components/capsule/Capsule";
import {
    CardText,
    DescriptionContainer,
    DescriptionText,
    DetailContainer,
    InfoContainer,
    ResourceCardClick,
    ResourceCardImage,
    ResourceTitle
} from "components/card/Card";

// 장비명 컨테이너
const ResourceTitleContainer = styled.div`
    height: 20px;
    display: inline-flex;
    align-items: center;
`

function moveToDetail(resourceId) { 
    window.location.href = "/resourceBooking/"+resourceId
}

function ResourceInfo(props) {
    return (
        <ResourceCardClick  onClick={() => moveToDetail(props.resourceId)}>
            <DetailContainer>
                <ResourceCardImage src={props.imgUrl} />

                <InfoContainer>
                    <ResourceTitleContainer>
                        <ResourceTitle>{props.name}</ResourceTitle>
                        <CardText>{props.location}</CardText>
                    </ResourceTitleContainer>

                    <DescriptionContainer>
                        <Capsule color="purple" text="설명" />
                        <DescriptionText>
                            {props.description}
                        </DescriptionText>
                    </DescriptionContainer>
                </InfoContainer>

            </DetailContainer>
        </ResourceCardClick>
    );
}

export default ResourceInfo;
