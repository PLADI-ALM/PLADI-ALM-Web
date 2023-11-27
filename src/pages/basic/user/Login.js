import React from 'react';
import styled from "styled-components"
import { Link } from 'react-router-dom';
import CNameImg from "assets/images/kor_nameLogo.svg"
import LogoImg from "assets/images/imgLogo.svg"
import { UsersAxios } from 'api/AxiosApi';
import { setCookie } from 'utils/CookiesUtil'
import { isLogin } from 'utils/IsLoginUtil';
import {basicError, notLogInError} from 'utils/ErrorHandlerUtil';

const Container = styled.div`
    height: fit-content;
    width: fit-content;
    margin: auto;
`

const TitleBox = styled.div`
    display: flex;
`

const Logo = styled.img.attrs({ src: `${LogoImg}` })`
    height: 150px;
    margin-right: 20px;
`

const NameBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

const CName = styled.img.attrs({ src: `${CNameImg}` })`
    width: 100px;
`

const TitleName = styled.h3`
    margin-top: 10px;
    color: #640FAF;
`

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    width: 400px;
`

const LoginInput = styled.input`
    height: 50px;
    border: 1px solid #E1E0E2;
    padding: 0 20px;
    margin-bottom: 16px;
    background-color: #F7F8F9;
    border-radius: 20px;
    box-sizing: border-box;
    font-family: NanumSquare_ac;
    font-size: 15px;
`

const LoginBtn = styled(LoginInput)`
    height: 40px;
    font-size: 20px;
    cursor: pointer;
    color: white;
    background-color: #640FAF;
    border: none;
    box-shadow: 0px 4px 4px 0px #00000040;
`

const PWReset = styled(Link)`
    display: block;
    color: black;
    text-decoration-line: underline;
    text-align: right;
`

function Login() {

    const onSubmitHandler = (e) => {
        const inputEmail = e.target.email.value
        const inputPw = e.target.password.value
        e.preventDefault()

        UsersAxios.post("/login", {
            email: inputEmail,
            password: inputPw
        }).then((res) => {
            console.log(res.data.data.accessToken)
            setCookie('Authorization', res.data.data.accessToken)
            setCookie('Role', res.data.data.role)
            window.location.replace('/officeBooking')
        }).catch((error) => {
            notLogInError(error)
        })
    }

    if (isLogin())
        window.location.replace('/officeBooking')
    else return (
        <Container>
            <TitleBox>
                <Logo />
                <NameBox>
                    <CName />
                    <TitleName>사내 관리 시스템</TitleName>
                </NameBox>
            </TitleBox>

            <LoginForm method="post" id="login-form" onSubmit={onSubmitHandler}>
                <LoginInput type="email" placeholder={"이메일"} name="email" />
                <LoginInput type={"password"} id="inputPw" placeholder={"비밀번호"} name="password" />
                <LoginBtn className="submitBtn" id="submitBtn" type="submit" value="로그인" />
            </LoginForm>
            <PWReset to={"/resetPassword"}>비밀번호 재설정</PWReset>
        </Container>
    )
}

export default Login;