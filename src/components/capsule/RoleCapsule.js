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

function RoleCapsule(props) {
    return (
        <>
            {props.role === "일반" ?
                <BasicCapsule>{props.role}</BasicCapsule> :
                <AdminCapsule>{props.role}</AdminCapsule>}
        </>
    );
}

export default RoleCapsule;