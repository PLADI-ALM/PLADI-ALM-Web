import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

export const Select = styled.select`
    border-radius: 10px;
    border: 1px solid #717171;
    background: #F6F6F6;
    font-family: NanumSquare_ac;
    font-size: 18px;
    color: #757575;
    padding: 5px;
    height: 35px;
`

function SelectToggle(props) {
    return (
        <Select onChange={props.change}>
            {props.items}
        </Select>
    );
}

export default SelectToggle;