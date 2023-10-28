import {SelectToggleInModal} from 'components/capsule/SelectToggle';
import React, {useState, useEffect} from 'react';
import {AdminUsersAxios} from 'api/AxiosApi';
import {getToken} from 'utils/IsLoginUtil';
import {basicError} from 'utils/ErrorHandlerUtil';
import {
    AttrContainer,
    AttrInput,
    AttrLabel,
    AttrsForm,
    BottomBtnContainer,
    ModalBackdrop,
    ModalTitle,
    ModalView,
    TitleContainer
} from 'components/modal/BigModal';
import {
    AdminCapsuleBtnF,
    AdminRadioInput,
    BasicCapsuleBtnF,
    BasicRadioInput
} from 'components/capsule/RoleCapsule';
import BigSquareButton, {InputPurpleButton} from 'components/button/BigSquareButton';

export function UserModal(props) {
    const [departmentOptionList, setDepartmentOptionList] = useState([]);
    const [currentRole, setCurrentRole] = useState("일반");
    const [currentDepartment, setCurrentDepartment] = useState("");
    let departments;

    function getDpNPsList() {
        AdminUsersAxios.get("/departments", {
            headers: {
                Authorization: getToken()
            }
        })
            .then((response) => {
                departments = response.data.data.departmentList
                setDepartmentOptionList(departments.map((department) => (<option value={department}>{department}</option>)))
            })
            .catch((error) => {
                basicError(error)
            })
    }

    useEffect(() => {
        getDpNPsList()
    }, [])

    const handleRoleChange = (e) => {
        setCurrentRole(e.target.value);
    };

    const handleDepartmentChange = (e) => {
        setCurrentDepartment(e.target.value);
    };

    // 전화번호 자동 하이픈
    const autoHyphen = (e) => {
        e.target.value = e.target.value
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    }

    const registerUser = (e) => {
        e.preventDefault()
        const inputName = e.target.name.value
        const inputEmail = e.target.email.value
        const inputPassword = e.target.password.value
        const inputPhone = e.target.phone.value
        const inputDepartment = e.target.department.value
        const inputRole = e.target.role.value
        // todo: 입력값 정규식 확인

        AdminUsersAxios.post("", {
            name: inputName,
            email: inputEmail,
            password: inputPassword,
            phone: inputPhone,
            department: inputDepartment,
            role: inputRole
        }, {
            headers: {
                Authorization: getToken()
            }
        })
            .then((response) => {
                alert("등록되었습니다.")
                window.location.reload();
            })
            .catch((error) => {
                basicError(error)
            })
    };


    return (
        <ModalBackdrop onClick={props.handler}>
            <ModalView onClick={(e) => e.stopPropagation()}>
                <TitleContainer>
                    <ModalTitle>신규 직원 등록</ModalTitle>
                </TitleContainer>
                <AttrsForm method="post" id="register-user-form" onSubmit={registerUser}>
                    <AttrContainer>
                        <AttrLabel>성명</AttrLabel>
                        <AttrInput type='text' name='name'></AttrInput>
                    </AttrContainer>
                    <AttrContainer>
                        <AttrLabel>이메일</AttrLabel>
                        <AttrInput type='text' name='email'></AttrInput>
                    </AttrContainer>
                    <AttrContainer>
                        <AttrLabel>비밀번호</AttrLabel>
                        <AttrInput type='text' name='password'></AttrInput>
                    </AttrContainer>
                    <AttrContainer>
                        <AttrLabel>연락처</AttrLabel>
                        <AttrInput type='text' name='phone' onInput={autoHyphen} maxLength='13'></AttrInput>
                    </AttrContainer>
                    <AttrContainer>
                        <AttrLabel>부서</AttrLabel>
                        <SelectToggleInModal name='department' items={departmentOptionList} value={currentDepartment} onChange={handleDepartmentChange}/>
                    </AttrContainer>
                    <AttrContainer>
                        <AttrLabel>권한</AttrLabel>
                        <BasicRadioInput type="radio" id="basic"
                                         name="role"
                                         value="일반"
                                         checked={currentRole === "일반"}
                                         onChange={handleRoleChange}/>
                        <BasicCapsuleBtnF htmlFor="basic">일반</BasicCapsuleBtnF>
                        <AdminRadioInput type="radio" id="admin"
                                         name="role"
                                         value="관리자"
                                         checked={currentRole === "관리자"}
                                         onChange={handleRoleChange}/>
                        <AdminCapsuleBtnF htmlFor="admin">관리자</AdminCapsuleBtnF>
                    </AttrContainer>
                    <BottomBtnContainer>
                        <InputPurpleButton value="등록"/>
                        <BigSquareButton name={"취소"} color={"white"} click={props.handler}/>
                    </BottomBtnContainer>
                </AttrsForm>
            </ModalView>
        </ModalBackdrop>
    );
}