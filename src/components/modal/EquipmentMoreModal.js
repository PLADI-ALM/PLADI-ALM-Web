import React from 'react';
import {EquipmentMoreModalView, MenuText, NormalDiv, RedDiv} from "./MoreModal";
import {EquipmentsAxios} from "api/AxiosApi";
import {getToken} from "utils/IsLoginUtil";
import {basicError} from "utils/ErrorHandlerUtil";

export function EquipmentMoreModal(props) {

    const editEquipment = () => {
        window.location.href = `/equipments/${props.id}/edit`
    };

    const deleteEquipment = () => {
        EquipmentsAxios.delete(`/${props.id}`, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((response) => {
                alert("삭제되었습니다.")
                window.location.reload();
            })
            .catch((error) => {
                basicError(error)
            })
    };

    return (
        <>
            <EquipmentMoreModalView onClick={(e) => e.stopPropagation()}>
                <NormalDiv>
                    <MenuText onClick={editEquipment}>수정</MenuText>
                </NormalDiv>
                <RedDiv>
                    <MenuText onClick={deleteEquipment}>삭제</MenuText>
                </RedDiv>
            </EquipmentMoreModalView>
        </>
    );
}