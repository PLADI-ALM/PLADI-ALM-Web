import React from 'react';
import {MenuText, MoreModalView, NormalDiv, RedDiv} from "../../../components/modal/MoreModal";

export function UserMoreModal(props) {

    const editUser = () => {

    };

    const deleteUser = (e) => {

    };

    return (
        <MoreModalView onClick={(e) => e.stopPropagation()}>
            <NormalDiv>
                <MenuText onClick={editUser}>정보 수정</MenuText>
            </NormalDiv>
            <RedDiv>
                <MenuText onClick={deleteUser}>탈퇴 처리</MenuText>
            </RedDiv>
        </MoreModalView>
    );
}