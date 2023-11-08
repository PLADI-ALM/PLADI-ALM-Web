import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: none;
  border: 0;
  border-radius: 10px;
  box-shadow: 0 4px 14px 0 #00000040;
  padding: 0;
  align-items: center;
  display: flex;
  cursor: pointer;
`

const Img = styled.img`
    width: ${props => props.width};
    height: ${props => props.height};
`

function ImageFullButton(props) {
    return (
        <Button type="button" onClick={props.click} >
            <Img src={props.image} width={props.width} height={props.height} />
        </Button>
    );
}

export default ImageFullButton;