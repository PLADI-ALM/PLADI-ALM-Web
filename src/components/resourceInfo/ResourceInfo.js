import React from "react";
import styled from "styled-components"
import Example from '../../assets/images/example.png'
import Capsule from "components/capsule/Capsule";
import { ResourceCard, CardText, DetailContainer, ResourceCardImage, InfoContainer, DescriptionContainer, OfficeContentText, ResourceTitle } from "components/card/Card";
import { useNavigate } from "react-router-dom";

// 장비명 컨테이너
const ResourceTitleContainer = styled.div`
    height: 20px;
    display: ${props => props.isHidden ? 'none' : 'inline-flex'};
    align-items: center;
`



function moveToDetail(resourceId) { 
    window.location.href = "/resourceBooking/"+resourceId
}

function ResourceInfo(props) {
    // const moveToDetail = () => {
    //     window.location.href = "/resourceBooking/"+props.resourceId
    // }

    return (
        <ResourceCard  onClick={() => (props.detail ? moveToDetail(props.resourceId) : {})}>
            <DetailContainer>
                <ResourceCardImage src={props.imgUrl} />

                <InfoContainer>
                    <ResourceTitleContainer isHidden={props.isTItleHidden}>
                        <ResourceTitle>{props.name}</ResourceTitle>
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
