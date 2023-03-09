import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import useFetch from "../../hooks/useFetch";
import { isLoginState } from "../../recoil/state";
import { FlexDiv, Div, Img, Button } from "../../styles/style";


const CityImgDiv = styled(Div)`
    overflow: hidden;
`

const CityInfoText = styled(Div)`
    line-height: 140%;
`


const CityInfo = (props) => {
    const navigate = useNavigate()
    const { cityInfo, cityEnglishName, cityName, cityImg, setShowCityInfo } = props
    const isLogin = useRecoilValue(isLoginState)
    
    const closeCityInfoEvent = () => {
        setShowCityInfo(false)
    }

    const makePlanClickEvent = () => {
        if (isLogin) {
            //navigate(`/schedule?cityname=${cityName}`)
            navigate(`/schedule`)
        }
        else {
            navigate('/login')
        }
    }

    const communityClickEvent = () => {
        navigate('/community')
    }


    return (
        <FlexDiv backgroundColor='#0000008a' minWidth='1024px' width='100%' height='100vh' top='0' left='0' position='fixed' justifyContent='center' alignItems='center' onClick={closeCityInfoEvent} zIndex='2'>
            <FlexDiv position='relative' color='black' backgroundColor='white' width='1010px' height='400px' borderRadius='18px' onClick={(e) => e.stopPropagation()}>
                <CityImgDiv height='400px' width='400px' marginRight='48px'>
                    <Img src={cityImg} height='400px' width='auto' borderRadius='12px 0 0 12px' />
                </CityImgDiv>
                <FlexDiv flexDirection='column' width='350px'>
                    <FlexDiv margin='48px 0 0 0' alignItems='baseline'>
                        <Div fontSize='28px'>{cityEnglishName}</Div>
                        <Div fontSize='20px' marginLeft='8px'>{cityName}</Div>
                    </FlexDiv>
                    <Div fontWeight='600' marginBottom='24px'>
                        도쿄 스카이트리, 신주쿠 교엔, 지브리 미술관, 센소지
                    </Div>
                    <CityInfoText>
                        전통과 미래가 공존하는 메가시티 도쿄는 수많은 즐길 거리로 가득합니다. 테마 카페에서 고급 요리에 이르기까지 이색적인 아이디어를 자랑하는 도쿄의 레스토랑과 식당을 찾아보세요. 아키하바라에서 최신 전자제품과 각종 기기를 둘러보고 일본 애니메이션 문화를 체험하세요. 도쿄의 패션 수도인 하라주쿠와 시부야에서 생생한 젊음의 문화를 경험하세요. 도쿄의 사원 중 가장 유명한 센소지가 있습니다.
                    </CityInfoText>
                    <FlexDiv justifyContent='space-around' marginTop='48px'>
                        <Button color='white' backgroundColor='mainColor' width='140px' padding='12px' borderRadius='8px' cursor='pointer' fontSize='14px' onClick={makePlanClickEvent}>
                            여기로 여행가기
                        </Button>
                        <Button color='black' backgroundColor='backgroundGray' width='140px' padding='12px' borderRadius='8px' cursor='pointer' fontSize='14px' onClick={communityClickEvent}>
                            커뮤니티에서 보기
                        </Button>
                    </FlexDiv>
                </FlexDiv>
                <FlexDiv flexDirection='column' justifyContent='space-around' margin='48px'>
                    <FlexDiv alignItems='center'>
                        <Img width='32px' src={require('../../img/time_black.svg').default} marginRight='12px' />
                        <Div>{cityInfo.cityTimeDiff != null ? cityInfo.cityTimeDiff : '정보 없음'}</Div>
                    </FlexDiv>
                    <FlexDiv alignItems='center'>
                        <Img width='32px' src={require('../../img/money_black.svg').default} marginRight='12px' />
                        <Div>{cityInfo.cityExchange != null ? cityInfo.cityExchange : '정보 없음'}</Div>
                    </FlexDiv>
                    <FlexDiv alignItems='center'>
                        <Img width='32px' src={require('../../img/flight.svg').default} marginRight='12px' />
                        <Div>{cityInfo.cityFlightTime != null ? cityInfo.cityFlightTime : '정보 없음'}</Div>
                    </FlexDiv>
                    <FlexDiv alignItems='center'>
                        <Img width='32px' src={require('../../img/visa.svg').default} marginRight='12px' />
                        <Div>{cityInfo.cityVisa != null ? cityInfo.cityVisa : '정보 없음'}</Div>
                    </FlexDiv>
                </FlexDiv>
                <Button onClick={closeCityInfoEvent}>
                    <Img position='absolute' right='8px' top='8px' src={require('../../img/close_line.svg').default} cursor='pointer' />
                </Button>
            </FlexDiv>
        </FlexDiv>
    )
}


export default CityInfo