import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { Header, Div, FlexDiv, Img } from "../../styles/style";
import { isLoginState } from "../../recoil/state"
import { useRecoilState } from "recoil";
import useFetch from "../../hooks/useFetch";
import { planListState, userDataState, userPlanDataState } from "../../recoil/backendState";


const StyledLink = styled(Link)`
    text-decoration: none;
`

const PlanNameDiv = styled(Div)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const ProfileImg = styled(Img)`
    object-fit: cover;
`


const HeaderComponent = (props) => {
    const navigate = useNavigate()

    const { isMobile } = props
    const [isLogin, setIsLogin] = useRecoilState(isLoginState)
    const [profileClick, setProfileClick] = useState(false)
    const [planClick, setPlanClick] = useState(false)
    const [userData, setUserData] = useRecoilState(userDataState)
    const [userPlanData, setUserPlanData] = useRecoilState(planListState)

    //console.log(userData)
    // const data = [
    //     {
    //         "cityName": 1,
    //         "scheduleName": '일이삼사오육칠팔구십일이삼사오육칠팔구십',
    //         "startDate": "2023-04-14",
    //         "startTime": "hh:mm:ss"
    //     },
    //     {
    //         "cityName": 2,
    //         "scheduleName": '도쿄 여행',
    //         "startDate": "2023-02-13",
    //         "startTime": "hh:mm:ss"
    //     }]


    const usePlanClickEvent = async () => {
        setUserPlanData(await useFetch('/schedule/all', 'GET', null, null))

        if (!isLogin) {
            alert('로그인 후에 이용해주세요.')
            navigate('/login')
        }
        else if (userPlanData.data[0].length == 0) alert('일정이 존재하지 않습니다.')
        else {
            setPlanClick(true)
            console.log(userPlanData.data[0])
        }
    }

    const planHideEvent = () => {
        setPlanClick(false)
    }

    const profileHideEvent = () => {
        setProfileClick(false)
    }

    const useProfileShowEvnet = async () => {
        setUserData(await useFetch('/account', 'GET', null, null))
        setProfileClick(true)
    }

    const useLogoutEvent = async () => {
        setProfileClick(false)
        await useFetch('/account/logout', 'GET', null, null)
        setIsLogin(false)
    }
    // cityindex
    // : 
    // 1
    // date
    // : 
    // "2023-02-19T05:45:17.926Z"
    // scheduledate
    // : 
    // "2023-03-05T00:00:00.000Z"
    // scheduleindex
    // : 
    // 1
    // schedulename
    // : 
    // "도쿄여행"
    // userindex
    // : 
    // 1


    return (
        <Header display='flex' justifyContent={isMobile ? 'center' : 'space-between'} align='row-vertical-center' position='fixed' width='100%' height='70px' borderBottom='1px solid #F0F3F5' backgroundColor='white' zIndex='1'>
            <StyledLink to="/">
                <Div cursor='pointer' width='240px' color='mainColor' fontFamily='Pyunji R' fontSize='30px' fontWeight='bolder' textAlign='center'>EODILO</Div>
            </StyledLink>
            {
                !isMobile &&
                <FlexDiv justifyContent='space-around' align='row-vertical-center' width='370px' margin='0 20px 0 0'>

                    {/* <StyledLink to="/schedule"> */}
                    <Div cursor='pointer' color='black' fontSize='14px' onClick={usePlanClickEvent}>PLAN</Div>
                    {
                        planClick && userPlanData &&
                        <FlexDiv flexDirection='column' position='absolute' width='136px' backgroundColor='white' right='270px' top='74px' padding='16px 16px 0' borderRadius='12px' onMouseLeave={planHideEvent}>
                            {
                                userPlanData.data[0]?.map((item) =>
                                    <StyledLink to={`/schedule?scheduleIndex=${item.scheduleindex}`} onClick={planHideEvent}>
                                        <PlanNameDiv cursor='pointer' color='black' fontSize='16px'>{item.schedulename}</PlanNameDiv>
                                        <Div cursor='pointer' color='black' fontSize='12px' marginBottom='16px'>{item.scheduledate.substr(0, 10)}</Div>
                                    </StyledLink>
                                )
                                
                            }
                        </FlexDiv>
                    }
                    {/* </StyledLink> */}
                    <StyledLink to="/community">
                        <Div cursor='pointer' color='black' fontSize='14px'>COMMUNITY</Div>
                    </StyledLink>
                    {
                        isLogin ?
                            <React.Fragment>
                                <Div cursor='pointer' color='black' fontSize='14px' onClick={useProfileShowEvnet}>PROFILE</Div>
                                {
                                    profileClick &&
                                    <FlexDiv flexDirection='column' position='absolute' backgroundColor='white' width='300px' right='32px' top='74px' padding='4px 18px' borderRadius='12px' onMouseLeave={profileHideEvent}>
                                        <FlexDiv color='black' fontSize='14px' padding='18px 0' alignItems='center' borderBottom='1px solid #E1E3E6'>
                                            <ProfileImg src={userData.userInfo.userProfileImg ? userData.userInfo.userProfileImg : require('../../img/userImg.svg').default} width='72px' height='72px' borderRadius='50%' marginRight='30px' />
                                            <FlexDiv flexDirection='column'>
                                                <FlexDiv alignItems='baseline'>
                                                    <Div fontSize='18px'>{userData.userInfo.userName}</Div>
                                                    <Div fontSize='14px' color='letterGray' marginLeft='4px'>{userData.userInfo.userNickname}</Div>
                                                </FlexDiv>
                                                <Div fontSize='14px' color='letterGray'>{userData.userInfo.userId}</Div>
                                                <Div fontSize='12px' color='letterGray'>{userData.userInfo.userEmail}</Div>
                                            </FlexDiv>
                                        </FlexDiv>
                                        <StyledLink to="/myPage/clipping">
                                            <Div cursor='pointer' color='black' fontSize='16px' padding='24px 8px 12px' hoverColor='letterGray' onClick={profileHideEvent}>스크랩 목록</Div>
                                        </StyledLink>
                                        <StyledLink to="/myPage/notice">
                                            <Div cursor='pointer' color='black' fontSize='16px' padding='12px 8px' onClick={profileHideEvent}>알림 목록</Div>
                                        </StyledLink>
                                        <StyledLink to="/myPage/setting" onClick={profileHideEvent}>
                                            <Div cursor='pointer' color='black' fontSize='16px' padding='12px 8px' onClick={profileHideEvent}>계정 관리</Div>
                                        </StyledLink>
                                        <StyledLink>
                                            <Div cursor='pointer' color='black' fontSize='16px' padding='12px 8px 24px' onClick={useLogoutEvent}>로그아웃</Div>
                                        </StyledLink>
                                    </FlexDiv>
                                }
                            </React.Fragment>
                            :
                            <StyledLink to="/login">
                                <Div cursor='pointer' color='black' fontSize='14px'>LOG IN</Div>
                            </StyledLink>
                    }
                </FlexDiv>
            }
        </Header>
    )
}

export default HeaderComponent