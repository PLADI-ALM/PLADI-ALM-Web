import React, { useState } from 'react';
import styled from "styled-components"
import {Link} from 'react-router-dom';
import LogoImg from "assets/images/imgNameLogo.svg"
import {UsersAxios} from 'api/AxiosApi';
import {basicError, notLogInError} from 'utils/ErrorHandlerUtil';

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

const ResetPWForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  width: 400px;
  align-items: flex-end;
`

const ResetPWInput = styled.input`
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
const ResetPWEmailInput = styled.div`
  width: inherit;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  
`
const SendEmailButton = styled.button`
  height: 40px;
  width: 150px;
  font-size: 20px;
  cursor: pointer;
  color: white;
  background-color: #640FAF;
  box-shadow: 0px 4px 4px 0px #00000040;
  border: none;
  border-radius: 20px;
  margin-left: 10px;
`

const ResetPWBtn = styled(ResetPWInput)`
  height: 40px;
  width: 150px;
  font-size: 20px;
  cursor: pointer;
  color: white;
  background-color: #640FAF;
  border: none;
  box-shadow: 0px 4px 4px 0px #00000040;
  margin-right: 0;
`

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [click, isClick] = useState(true);
    const onSubmitHandler = (e) => {
        if (!click) return
        const inputEmail = e.target.email.value
        const inputCode = e.target.code.value
        e.preventDefault()
        UsersAxios.post("/email-code", {
            email: inputEmail,
            code: inputCode
        }).then((res) => {
            window.location.replace('/')
        }).catch((error) => {
            notLogInError(error)
        })
    }

    const onSendEmailHandler = (e) => {
        e.preventDefault();
        UsersAxios.post("/email", {
            email: email
        }).then((res) => {
            alert("인증번호를 전송하였습니다.")
            isClick(true)
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

            <ResetPWForm method="post" id="resetPassword-form" onSubmit={onSubmitHandler}>
                <ResetPWEmailInput>
                    <ResetPWInput type="email" placeholder={"이메일"} name="email" onChange={(e) => { setEmail(e.target.value); }}/>
                    <SendEmailButton onClick={onSendEmailHandler}>인증</SendEmailButton>
                </ResetPWEmailInput>
                <ResetPWInput type="text" id="inputCode" placeholder={"인증번호"} name="code"/>
                <ResetPWBtn className="submitBtn" id="submitBtn" type="submit" value="다음으로"/>
            </ResetPWForm>
        </Container>
    )
}

export default ResetPassword;