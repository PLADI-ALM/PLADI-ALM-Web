import React from "react";
import styled from "styled-components"

const WhiteCapsule = styled.p`
  border-radius: 20px;
  background: white;
  border: 1px solid #A263DE;
  color: #A263DE;
  text-align: center;
  font-size: 18px;
  padding: 7px 15px;
  margin: 0 10px 0 0;
  min-width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  z-index: 0;
`

const DeleteBtn = styled.button`
  background: none;
  font-size: 20px;
  border: none;
  color: #4C4C4C;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  padding: 0;
`

function FacilityCapsule(props) {
    return (
        <WhiteCapsule>{props.text}<DeleteBtn onClick={props.click}>×</DeleteBtn></WhiteCapsule>
    );
}

export default FacilityCapsule;