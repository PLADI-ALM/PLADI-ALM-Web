import React, {useState} from 'react';
import {MenuText, MoreModalView, NormalDiv, RedDiv} from "../../../components/modal/MoreModal";
import {UserModal} from "./UserModal";

export function UserMoreModal(props) {
    const [isOpen, setIsOpen] = useState(false)

    const openModalHandler = () => {
        setIsOpen(!isOpen)
    }

    const editUser = () => {
        openModalHandler();
    };

    const deleteUser = (e) => {

    };

    return (
        <>
            <MoreModalView onClick={(e) => e.stopPropagation()}>
                <NormalDiv>
                    <MenuText onClick={editUser}>정보 수정</MenuText>
                </NormalDiv>
                <RedDiv>
                    <MenuText onClick={deleteUser}>탈퇴 처리</MenuText>
                </RedDiv>
            </MoreModalView>
            {isOpen ?
                <UserModal id={props.id} handler={openModalHandler} title={"직원 정보 수정"}/>
                : null
            }
        </>
    );
}