import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: ${props => props.background};
  border: 0;
  border-radius: 10px;
  box-shadow: 0 4px 14px 0 #00000040;
  padding: 0;
  align-items: center;
  justify-content: center;
  display: flex;
  width: ${props => props.width};
  height: ${props => props.height};
`

const Img = styled.img`
  width: calc(${props => props.width} - 18px);
  height: calc(${props => props.height} - 18px);
`

function ImagePaddingButton(props) {
    return (
        <Button type="button" onClick={props.click} width={props.width} height={props.height} background={props.background} >
            <Img src={props.image}  width={props.width} height={props.height}/>
        </Button>
    );
}

export default ImagePaddingButton;