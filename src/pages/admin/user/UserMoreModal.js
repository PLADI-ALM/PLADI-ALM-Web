import React, {useState} from 'react';
import {MenuText, MoreModalView, NormalDiv, RedDiv} from "../../../components/modal/MoreModal";
import {UserModal} from "./UserModal";
import {AdminUsersAxios} from "../../../api/AxiosApi";
import {getToken} from "../../../utils/IsLoginUtil";
import {basicError} from "../../../utils/ErrorHandlerUtil";

export function UserMoreModal(props) {
    const [isOpen, setIsOpen] = useState(false)

    const openModalHandler = () => {
        setIsOpen(!isOpen)
    }

    const editUser = () => {
        openModalHandler();
    };

    const deleteUser = (e) => {
        AdminUsersAxios.delete(`/${props.id}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((response) => {
                alert("탈퇴 완료 되었습니다.")
                window.location.reload();
            })
            .catch((error) => {
                basicError(error)
            })
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