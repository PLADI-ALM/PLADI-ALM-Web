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

function moveToDetail(id, type) {
    if (type === 'resource')
        window.location.href = "/resourceBooking/"+id
    else if (type === 'car')
        window.location.href = "/carBooking/"+id
}

function ResourceInfo(props) {
    return (
        <ResourceCardClick  onClick={() => moveToDetail(props.id, props.type)}>
            <DetailContainer>
                <ResourceCardImage src={props.imgUrl} />

                <InfoContainer>
                    <ResourceTitleContainer>
                        <ResourceTitle>{props.name}({props.manufacturer})</ResourceTitle>
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
