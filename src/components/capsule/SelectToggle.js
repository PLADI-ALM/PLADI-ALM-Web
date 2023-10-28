import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import ArrowDown from "assets/images/arrowDown.svg"

const Select = styled.select`
    border-radius: 8px;
    border: 1px solid #717171;
    background: #F6F6F6;
    font-family: NanumSquare_ac;
    font-size: 18px;
    color: #757575;
    padding: 0 10px;
    height: 40px;
    outline: none;
    padding: 2px;
`

const ModalSelect = styled(Select)`
    width: 280px;
    border: 2px solid #E6E6E6;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: url('${props => props.imgUrl}') no-repeat right center;
    background-position: right 10px center;
    padding: 0 44px 0 10px;
`

export function SelectToggleInModal(props) {
    return (
        <ModalSelect imgUrl={ArrowDown} onChange={props.change} name={props.name}>
            {props.items}
        </ModalSelect>
    );
}

export function SelectToggle(props) {
    return (
        <Select onChange={props.change}>
            {props.items}
        </Select>
    );
}
