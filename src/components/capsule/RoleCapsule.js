import React from "react";
import styled from "styled-components"

const BasicCapsule = styled.label`
  display: block;
  width: 45px;
  height: 18px;
  border-radius: 15px;
  border: 2px solid #15294B;
  background: white;
  text-align: center;
  color: #15294B;
  font-size: 16px;
  padding: 7px 15px;
  margin: auto;
`

const AdminCapsule = styled(BasicCapsule)`
    border: 2px solid #8741CB;
    color: #8741CB;
`

const BasicCapsuleBtnT = styled(BasicCapsule)`
    background: #15294B;
    color: white;
    cursor: pointer;
`

const AdminCapsuleBtnT = styled(AdminCapsule)`
    background: #8741CB;
    color: white;
    cursor: pointer;
`

export const BasicCapsuleBtnF = styled(BasicCapsule)`
    cursor: pointer;

  &:checked {
    background: #15294B;
    color: white;
  }
`

export const AdminCapsuleBtnF = styled(AdminCapsule)`
    cursor: pointer;

  &:checked{
    background: #8741CB;
    color: white;
  }
`

export const BasicRadioInput = styled.input.attrs({ type: 'radio' })`
  display: none;

  &:checked + ${BasicCapsuleBtnF}{
    background: #15294B;
    color: white;
  }
`

export const AdminRadioInput = styled(BasicRadioInput)`
  &:checked + ${AdminCapsuleBtnF}{
    background: #8741CB;
    color: white;
  }
`

export function RoleCapsule(props) {
    return (
        <>
            {props.role === "일반" ?
                <BasicCapsule>{props.role}</BasicCapsule> :
                <AdminCapsule>{props.role}</AdminCapsule>}
        </>
    );
}

export function RoleCapsuleBtn(props) {
    return (
        <>
            {props.role === "일반" && props.type === true ?
                <BasicCapsuleBtnT htmlFor={props.htmlFor}>{props.role}</BasicCapsuleBtnT> :
                props.role === "일반" && props.type === false ?
                    <BasicCapsuleBtnF htmlFor={props.htmlFor}>{props.role}</BasicCapsuleBtnF> :
                    props.role === "관리자" && props.type === true ?
                        <AdminCapsuleBtnT htmlFor={props.htmlFor}>{props.role}</AdminCapsuleBtnT> :
                        <AdminCapsuleBtnF htmlFor={props.htmlFor}>{props.role}</AdminCapsuleBtnF>
            }
        </>
    );
}