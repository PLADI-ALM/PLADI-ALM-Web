import { SelectToggleInModal } from 'components/capsule/SelectToggle';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { AdminUsersAxios } from 'api/AxiosApi';
import { getToken } from 'utils/IsLoginUtil';
import { basicError } from 'utils/ErrorHandlerUtil';
import { AttrContainer, AttrInput, AttrLabel, AttrsContainer, ExitBtn, ModalBackdrop, ModalTitle, ModalView, TitleContainer } from 'components/modal/Modal';

export function UserModal(props) {
    const [positionOptionList, setPositionOptionList] = useState([]);
    const [departmentOptionList, setDepartmentOptionList] = useState([]);
    let deparments, positions;

    function getDpNPsList() {
        AdminUsersAxios.get("/ranks", {
            headers: {
                Authorization: getToken()
            }
        })
            .then((response) => {
                deparments = response.data.data.departmentList
                positions = response.data.data.positionList
                setPositionOptionList(positions.map((position) => (<option>{position}</option>)))
                setDepartmentOptionList(deparments.map((deparment) => (<option>{deparment}</option>)))
            })
            .catch((error) => {
                basicError(error)
            })
    }
    useEffect(() => {
        getDpNPsList()
    }, [])


    return (
        <ModalBackdrop onClick={props.handler}>
            <ModalView onClick={(e) => e.stopPropagation()}>
                <TitleContainer>
                    <ModalTitle>신규 직원 등록</ModalTitle>
                    <ExitBtn onClick={props.handler}>×</ExitBtn>
                </TitleContainer>
                <AttrsContainer>
                    <AttrContainer>
                        <AttrLabel>이름</AttrLabel>
                        <AttrInput type='text'></AttrInput>
                    </AttrContainer>
                    <AttrContainer>
                        <AttrLabel>이메일</AttrLabel>
                        <AttrInput type='text'></AttrInput>
                    </AttrContainer>
                    <AttrContainer>
                        <AttrLabel>비밀번호</AttrLabel>
                        <AttrInput type='text'></AttrInput>
                    </AttrContainer>
                    <AttrContainer>
                        <AttrLabel>부서</AttrLabel>
                        <SelectToggleInModal items={departmentOptionList} />
                    </AttrContainer>
                    <AttrContainer>
                        <AttrLabel>직위</AttrLabel>
                        <SelectToggleInModal items={positionOptionList} />
                    </AttrContainer>
                    <AttrContainer>
                        <AttrLabel>직책</AttrLabel>
                        <AttrInput type='text'></AttrInput>
                    </AttrContainer>
                    <AttrContainer>
                        <AttrLabel>권한</AttrLabel>
                        <AttrInput type='text'></AttrInput>
                    </AttrContainer>
                </AttrsContainer>
            </ModalView>
        </ModalBackdrop>
    );
}