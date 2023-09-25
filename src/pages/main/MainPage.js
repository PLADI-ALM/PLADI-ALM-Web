import React from "react";
import styled from "styled-components"
import { RightContainer, WhiteContainer, TitleText } from "components/rightContainer/RightContainer";


function MainPage(props) {
    return (
        <RightContainer>
            <TitleText>{props.title}</TitleText>
            <WhiteContainer>

            </WhiteContainer>
        </RightContainer>
    );
}

export default MainPage;