import React from "react";
import Capsule from "components/capsule/Capsule";
import {
    DescriptionColumnContainer,
    DetailContainer,
    InfoContainer,
    ResourceCard,
    ResourceCardImage,
    RightDescriptionText
} from "components/card/Card";

function ResourceDetailInfo(props) {
    return (
        <ResourceCard>
            <DetailContainer>
                <ResourceCardImage src={props.imgUrl}/>

                <InfoContainer>
                    <DescriptionColumnContainer>
                        <Capsule color="purple" text="책임자"/>
                        <RightDescriptionText>
                            {props.managerName}({props.managerPhone})
                        </RightDescriptionText>
                    </DescriptionColumnContainer>
                    <DescriptionColumnContainer>
                        <Capsule color="purple" text="설명"/>
                        <RightDescriptionText>
                            {props.description}
                        </RightDescriptionText>
                    </DescriptionColumnContainer>
                </InfoContainer>
            </DetailContainer>
        </ResourceCard>
    );
}

export default ResourceDetailInfo;
