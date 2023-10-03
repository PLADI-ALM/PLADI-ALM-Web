import React from "react";
import styled from "styled-components";

const Button = styled.button`
    font-family: NanumSquare_ac;
    color: #FFFFFF;
    font-size: 17px;
    background: #8741CB;
    border: 0;
    border-radius: 30px;
    box-shadow: 0px 4px 4px 0px #00000040;
    padding: 0px 20px;
    height: 35px;
    cursor: pointer;
`

function SmallButton(props) {
    return (
        <Button type="button" onClick={props.click} name={props.name}>{props.name}</Button>
    );
}

export default SmallButton;