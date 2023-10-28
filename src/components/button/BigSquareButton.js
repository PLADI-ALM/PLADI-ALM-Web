import React from "react";
import styled from "styled-components";

const Button = styled.button`
    width: 130px;
    height: 100%;
    padding: 10px;
    border: none;
    border-radius: 8px;
    background: #8741CB;
    box-shadow: 0 4px 4px 0 #00000040;
    cursor: pointer;
    color: white;
    font-size: 17px;
    font-family: NanumSquare_ac;
`

const WhiteButton = styled(Button)`
    color: #8741CB;
    background: white;
    border: 1px solid #8741CB;
`

export const InputPurpleButton = styled.input.attrs({type: 'submit'})`
  width: 130px;
  height: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #8741CB;
  box-shadow: 0 4px 4px 0 #00000040;
  cursor: pointer;
  color: white;
  font-size: 17px;
  font-family: NanumSquare_ac;
    
`

function BigSquareButton(props) {

    return (
        <>
            {
                props.color === "purple" ?
                    <Button type="button" onClick={props.click} name={props.name}>{props.name}</Button> :
                    <WhiteButton type="button" onClick={props.click} name={props.name}>{props.name}</WhiteButton>
            }
        </>
    );
}

export default BigSquareButton;