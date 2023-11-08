import React from "react";
import styled from "styled-components"

const PurpleCapsule = styled.p`
  border-radius: 20px;
  background: #A263DE;
  text-align: center;
  color: #FFF;
  font-size: 18px;
  padding: 7px 15px;
  margin: 0 10px 0 0;
  min-width: fit-content;
  height: fit-content;
`

const WhiteCapsule = styled(PurpleCapsule)`
    background: white;
    border: 1px solid #A263DE;
    color: #A263DE;
`

function Capsule(props) {
    return (
        <>
            {props.color === "white" ?
                <WhiteCapsule>{props.text}</WhiteCapsule> :
                <PurpleCapsule>{props.text}</PurpleCapsule>}
        </>
    );
}

export default Capsule;