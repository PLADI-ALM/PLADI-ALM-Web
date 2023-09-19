import React from "react";
import styled from "styled-components"


export const PurpleCapsule = styled.p`
    min-width: 100px;
    border-radius: 20px;
    background: #A263DE;
    text-align: center;
    color: #FFF;
    font-family: NanumSquare_ac;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
`

export const WhiteCapsule = styled.p`
    min-width: 100px;
    border-radius: 20px;
    background: white;
    border: 1px solid #A263DE;
    text-align: center;
    color: #A263DE;
    font-family: NanumSquare_ac;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
`



function Capsule(props) {
    return(
        <>
            {props.color == "white" ? <WhiteCapsule>{props.text}</WhiteCapsule> : <PurpleCapsule>{props.text}</PurpleCapsule>}
        </>
    );
}





export default Capsule;