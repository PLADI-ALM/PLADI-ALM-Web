import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { styled} from "styled-components";




export const TimeSelect = styled.select`
    border-radius: 10px;    
    border: 1px solid #575757;
    background: #F6F6F6;
    font-family: NanumSquare_ac;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    text-color: #757575;
`


function TimeCapsule(props) {
    return (
        <TimeSelect onChange={props.change}>
            {props.items}
        </TimeSelect>
    );
}

export default TimeCapsule;