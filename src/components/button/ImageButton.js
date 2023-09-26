import React from "react";
import styled from "styled-components";

const Button = styled.button`
    background: none;
    border: 0;
    border-radius: 10px;
    box-shadow: 0px 4px 14px 0px #00000040;
    padding: 0;
    align-items: center;
    display: flex;
`

const Img = styled.img`
    width: ${props => props.width};
    height: ${props => props.height};
`

function ImageButton(props) {
    return (
        <Button type="button" onClick={props.click} >
            <Img src={props.image} width={props.width} height={props.height} />
        </Button>
    );
}

export default ImageButton;