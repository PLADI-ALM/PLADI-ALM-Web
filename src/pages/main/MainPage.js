import React from "react";
import styled from "styled-components"

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

function MainPage(props) {
    return (
        <Container>
            <TitleText>{props.title}</TitleText>

             <ContentContainer>
               
            </ContentContainer>
        </Container>
    );
}

export default MainPage;