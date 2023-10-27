import {SelectToggleInModal} from 'components/capsule/SelectToggle';
import React, {useState, useEffect} from 'react';
import {AdminUsersAxios} from 'api/AxiosApi';
import {getToken} from 'utils/IsLoginUtil';
import {basicError} from 'utils/ErrorHandlerUtil';
import {
    AttrContainer,
    AttrInput,
    AttrLabel,
    AttrsContainer,
    BottomBtnContainer,
    ExitBtn,
    ModalBackdrop,
    ModalTitle,
    ModalView,
    TitleContainer
} from 'components/modal/Modal';
import {
    AdminCapsuleBtnF,
    AdminRadioInput,
    BasicCapsuleBtnF,
    BasicRadioInput
} from 'components/capsule/RoleCapsule';
import BigSquareButton from 'components/button/BigSquareButton';

export function UserModal(props) {
    const [departmentOptionList, setDepartmentOptionList] = useState([]);
    const [currentRole, setCurrentRole] = useState("일반");
    let departments;

    function getDpNPsList() {
        AdminUsersAxios.get("/departments", {
            headers: {
                Authorization: getToken()
            }
        })
            .then((response) => {
                departments = response.data.data.departmentList
                setDepartmentOptionList(departments.map((department) => (<option>{department}</option>)))
            })
            .catch((error) => {
                basicError(error)
            })
    }

    useEffect(() => {
        getDpNPsList()
    }, [])

    const handleChange = (e) => {
        console.log(`선택한 값 : ${e.target.value}`);

        setCurrentRole(e.target.value);
    };


    return (
        <ModalBackdrop onClick={props.handler}>
            <ModalView onClick={(e) => e.stopPropagation()}>
                <TitleContainer>
                    <ModalTitle>신규 직원 등록</ModalTitle>
                </TitleContainer>
                <AttrsContainer>
                    <AttrContainer>
                        <AttrLabel>성명</AttrLabel>
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
                        <AttrLabel>연락처</AttrLabel>
                        <AttrInput type='text'></AttrInput>
                    </AttrContainer>
                    <AttrContainer>
                        <AttrLabel>부서</AttrLabel>
                        <SelectToggleInModal items={departmentOptionList}/>
                    </AttrContainer>
                    <AttrContainer>
                        <AttrLabel>권한</AttrLabel>
                        <BasicRadioInput type="radio" id="basic"
                                         name="role"
                                         value="일반"
                                         checked={currentRole === "일반"}
                                         onChange={handleChange}/>
                        <BasicCapsuleBtnF htmlFor="basic">일반</BasicCapsuleBtnF>
                        <AdminRadioInput type="radio" id="admin"
                                         name="role"
                                         value="관리자"
                                         checked={currentRole === "관리자"}
                                         onChange={handleChange}/>
                        <AdminCapsuleBtnF htmlFor="admin">관리자</AdminCapsuleBtnF>
                    </AttrContainer>
                </AttrsContainer>
                <BottomBtnContainer>
                    <BigSquareButton name={"등록"} color={"purple"}/>
                    <BigSquareButton name={"취소"} color={"white"} click={props.handler}/>
                </BottomBtnContainer>
            </ModalView>
        </ModalBackdrop>
    );
}