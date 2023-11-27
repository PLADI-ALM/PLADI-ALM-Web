import React from 'react';
import styled from "styled-components"
import {useLocation} from 'react-router-dom';
import LogoImg from "assets/images/imgNameLogo.svg"
import {UsersAxios} from 'api/AxiosApi';
import {notLogInError} from 'utils/ErrorHandlerUtil';

const Container = styled.div`
  height: fit-content;
  width: fit-content;
  margin: auto;
`

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
`

const Logo = styled.img.attrs({src: `${LogoImg}`})`
  height: 60px;
  margin-right: 20px;
`

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const TitleName = styled.h3`
  font-size: 40px;
  margin-top: 40px;
  color: #000000;
`

const ResetPasswordCodeForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  width: 400px;
  align-items: flex-end;
`

const ResetPasswordFormInput = styled.input`
  height: 50px;
  width: inherit;
  border: 1px solid #E1E0E2;
  padding: 0 20px;
  margin-bottom: 16px;
  background-color: #F7F8F9;
  border-radius: 20px;
  box-sizing: border-box;
  font-family: NanumSquare_ac;
  font-size: 15px;
`

const ResetPasswordBtn = styled(ResetPasswordFormInput)`
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  color: white;
  background-color: #640FAF;
  border: none;
  box-shadow: 0px 4px 4px 0px #00000040;
  margin-right: 0;
`

function ResetPassword() {
    const location = useLocation();
    const email = location?.state?.email
    if (email == null) {
        alert("잘못된 접근입니다.")
        window.location.replace('/')
    }

    const onSubmitHandler = (e) => {
        const inputPw = e.target.password.value
        const inputCheckPw = e.target.newPw.value
        e.preventDefault()
        if (inputPw !== inputCheckPw) {
            alert("비밀번호가 일치하지 않습니다. 다시 확인해봐주세요.")
            return
        }
        UsersAxios.patch("/password", {
            email: email,
            password: inputPw
        }).then((res) => {
            alert("비밀번호 재설정이 되었습니다.")
            window.location.replace('/')
        }).catch((error) => {
            notLogInError(error)
        })
    }

    return (
        <Container>
            <TitleBox>
                <Logo/>
                <NameBox>
                    <TitleName>비밀번호 재설정</TitleName>
                </NameBox>
            </TitleBox>

            <ResetPasswordCodeForm method="post" id="resetPassword-form" onSubmit={onSubmitHandler}>
                <ResetPasswordFormInput type="password" placeholder={"새 비밀번호"} name="password"/>
                <ResetPasswordFormInput type="password" id="inputCheckPW" placeholder={"비밀번호 확인"} name="newPw"/>
                <ResetPasswordBtn className="submitBtn" id="submitBtn" type="submit" value="완료"/>
            </ResetPasswordCodeForm>
        </Container>
    )
}

export default ResetPassword;