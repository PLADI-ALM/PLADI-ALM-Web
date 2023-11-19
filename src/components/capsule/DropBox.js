import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import ArrowDown from "assets/images/arrowDown.svg"
import SelectArrow from "assets/images/SelectArrow.svg"
import {TimeList} from "../../constants/ToggleList";

const Select = styled.select`
  border-radius: 8px;
  border: 1px solid #717171;
  font-size: 18px;
  color: #757575;
  padding: 0 30px 0 10px;
  height: ${props => props.height};
  outline: none;
  background: url('${props => props.imgUrl}') no-repeat right 10px center;
  background-color: white;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &:disabled {
    background: #FAFAFA;
  }
`

const ManagerSelect = styled(Select)`
  margin-right: 10px;
`

const NoBorderSelect = styled(Select)`
  border: none;
`

const ModalSelect = styled(Select)`
  width: 280px;
  height: ${props => props.height};
  border: 2px solid #E6E6E6;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url('${props => props.imgUrl}') no-repeat right 10px center;
  padding: 0 44px 0 10px;
`

export function SelectToggleInModal(props) {
    return (
        <ModalSelect imgUrl={ArrowDown} onChange={props.change} name={props.name} height={props.height} disabled={props.disabled}>
            {props.items}
        </ModalSelect>
    );
}

export function DropBox(props) {
    return (
        <Select onChange={props.change} imgUrl={SelectArrow} height={props.height}>
            {props.items}
        </Select>
    );
}

export function ManagerDropBox(props) {
    return (
        <ManagerSelect onChange={props.change} imgUrl={SelectArrow} height={props.height}>
            {props.items}
        </ManagerSelect>
    );
}

export function TimeDropBox(props) {
    const timeOptionList = TimeList.map((time) => (<option>{time}</option>))
    return (
        <NoBorderSelect onChange={props.change} imgUrl={SelectArrow}>
            {timeOptionList}
        </NoBorderSelect>
    );
}
