import React from "react";
import styled from "styled-components"

const BasicCapsule = styled.p`
    width: 50px;
    border-radius: 15px;
    border: 2px solid #15294B;
    background: white;
    text-align: center;
    color: #15294B;
    font-size: 18px;
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

const BasicCapsuleBtnF = styled(BasicCapsule)`
    cursor: pointer;
`

const AdminCapsuleBtnF = styled(AdminCapsule)`
    cursor: pointer;
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
                <BasicCapsuleBtnT>{props.role}</BasicCapsuleBtnT> :
                props.role === "일반" && props.type === false ?
                    <BasicCapsuleBtnF>{props.role}</BasicCapsuleBtnF> :
                    props.role === "관리자" && props.type === true ?
                        <AdminCapsuleBtnT>{props.role}</AdminCapsuleBtnT> :
                        <AdminCapsuleBtnF>{props.role}</AdminCapsuleBtnF>
            }
        </>
    );
}