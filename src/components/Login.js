import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { isLoginState } from "../recoil/state";
import { Button, Div, FlexDiv, Img, Input, Span } from "../styles/style";


const StyledLink = styled(Link)`
    text-decoration: none;
    color: #616466;
    font-size: 16px;
    margin: 12px 20px 30px;
    cursor: pointer;
`


const Login = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useRecoilState(isLoginState)


    useEffect(() => {
        if (isLogin) {
            navigate('/')
        }
    })

    const idRef = useRef(null)
    const pwRef = useRef(null)


    const idResetEvent = () => {
        idRef.current.value = ''
    }

    const pwResetEvent = () => {
        pwRef.current.value = ''
    }

    const inputLengthControl = (e) => { // hook로 빼기, 회원가입 페이지 쪽 코드로
        if (e.target.value.length > 20) {
            e.target.value = e.target.value.substr(0, 20);
        }
    }

    const submitEvent = async () => {
        const id = idRef.current.value.trim()
        const pw = pwRef.current.value.trim()

        if (id == '') {
            alert('아이디를 입력해주세요.')
        }
        else if (pw == '') {
            alert('비밀번호를 입력해주세요.')
        }
        else {
            // const result = useFetch({
            //     "idValue": id,
            //     "pwValue": pw
            // }, '/account/login')

            // if (result.success) {
            //     alert("통신 성공") 
            // }
            // else {
            //     alert(`ERR : ${result.message}`)
            // }
            //React Hook "useFetch" is called in function "submitEvent" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter. React Hook names must start with the word "use"
            // event 함수 안에서 custom hook 호출하기 검색
            // 
            try {
                const response = await fetch(process.env.REACT_APP_BACK_HOST_IP + "/account/login", {
                    "method": "POST",
                    "mode": 'cors', // no-cors, *cors, same-origin
                    "credentials": "include",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "body": JSON.stringify({
                        "idValue": id,
                        "pwValue": pw
                    })
                })
                const result = await response.json()

                if (result.success) {
                    console.log(result)
                    setIsLogin(true)
                    navigate(-1)
                }
                else {
                    console.log(`${result.message}`)
                }
            }
            catch (err) {
                alert('로그인에 실패했습니다.')
                console.log(`ERR : ${err}`)
            }
        }
    }


    return (
        <FlexDiv backgroundColor='white' padding='70px 0 0 0' width='100%' height='100vh' align='column-center' justifyContent='center'>
            <StyledLink to="/">
                <Div cursor='pointer' color='mainColor' fontFamily='Pyunji R' fontSize='58px' fontWeight='bolder' textAlign='center'>EODILO</Div>
            </StyledLink>
            <FlexDiv align='column-center' border='1px solid #E1E4E6' padding='24px 28px' borderRadius='12px'>
                <FlexDiv alignItems='center' border='1px solid #E1E4E6' padding='16px' borderRadius='12px 12px 0 0'>
                    <Img width='14px' src={require('../img/id_icon.svg').default} margin='0 12px 0 0' />
                    <Input type='text' maxlength={20} placeholder='아이디 입력' padding='0 4px 0 0' width='300px' ref={idRef} onChange={inputLengthControl} cursor='pointer' />
                    <Img width='14px' cursor='pointer' src={require('../img/close.svg').default} onClick={idResetEvent} />
                </FlexDiv>
                <FlexDiv alignItems='center' border='1px solid #E1E4E6' padding='16px' borderRadius='0 0 12px 12px'>
                    <Img width='14px' src={require('../img/pw_icon.svg').default} margin='0 12px 0 0' />
                    <Input type='password' placeholder='비밀번호 입력' width='300px' ref={pwRef} onChange={inputLengthControl} cursor='pointer' />
                    <Img width='14px' cursor='pointer' src={require('../img/close.svg').default} onClick={pwResetEvent} />
                </FlexDiv>
                <FlexDiv alignItems='center' width='100%' margin='10px 0 22px'>
                    <Img width='16px' src={require('../img/check.svg').default} margin='0 8px 0 0' />
                    <Span color='letterGray' fontSize='14px'>로그인 상태 유지</Span>
                </FlexDiv>
                <Button width='100%' backgroundColor='mainColor' color='white' borderRadius='8px' height='36px' fontSize='18px' cursor='pointer' onClick={submitEvent}>로그인</Button>
            </FlexDiv>
            <FlexDiv>
                <StyledLink to='/signup'>회원가입</StyledLink>
                <StyledLink>아이디 찾기</StyledLink>
                <StyledLink>비밀번호 찾기</StyledLink>
            </FlexDiv>
            <FlexDiv>
                <Button>
                    <FlexDiv border='1px solid #E1E4E6' padding='8px 16px' borderRadius='35px'>
                        <Img src={require('../img/google.svg').default} />
                        <Div cursor='pointer' marginLeft='8px'>구글 계정으로 로그인</Div>
                    </FlexDiv>
                </Button>
                <Button>
                    <FlexDiv border='1px solid #E1E4E6' padding='8px 16px' borderRadius='35px'>
                        <Img src={require('../img/kakao.svg').default} />
                        <Div cursor='pointer' marginLeft='8px'>카카오 계정으로 로그인</Div>
                    </FlexDiv>
                </Button>
            </FlexDiv>
        </FlexDiv>
    )
}


export default Login