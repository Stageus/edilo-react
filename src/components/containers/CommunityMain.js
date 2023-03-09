import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import styled from "styled-components";

import PostList from '../elements/PostList'
import OrderSelect from "../elements/OrderSelect";
import { postCategoryState } from "../../recoil/state";
import { postListState } from "../../recoil/backendState";
import { Button, FlexDiv, Img, Input, Div } from "../../styles/style";


const StyledLink = styled(Link)`
    color: black;
    text-decoration: none;
    cursor: pointer;
`

export const Btn = styled(Button)`
    width: ${(props) => props.width ? props.width : '80px'};
    height: ${(props) => props.height ? props.height : '36px'};
    color: ${(props) => props.color ? 'white' : 'black'};
    background-color: ${(props) => props.color ? '#0097F5' : 'white'};
    margin: 0 12px;
    border-radius: 10px;
    cursor: pointer;
`


const CommunityMain = () => {
    // useSetRecoilState로 post list 변경해주기   
    const outSideRef = useRef()
    const [clickedBtn, setClickedBtn] = useState(1)
    const [postCategory, setPostCategory] = useRecoilState(postCategoryState)
    // url을 state로 변경해서 바꿔주기
    const [url, setUrl] = useState(`/post/all?postCategory=1&` )

    
    const btnClickEvent = (category) => {
        setUrl(`/post/all?postCategory=${category}&`)
    }


    return (
        <FlexDiv width='100%' align='column-center' padding='0 0 0 260px' ref={outSideRef}>
            <FlexDiv backgroundColor='white' width='55%' borderRadius='30px' height='50px' alignItems='center' margin='30px 0' border='1px solid #E1E4E6'>
                <Input fontSize='18px' placeholder='검색' border='none' width='100%' padding='0 40px 0 32px' />
                <Img cursor='pointer' position='relative' right='24px' src={require('../../img/search2.svg').default} />
            </FlexDiv>
            <FlexDiv>
                <Div onClick={() => btnClickEvent(1)}>
                    <Btn color={url == `/post/all?postCategory=1&` && 'true'} >전체</Btn>
                </Div>
                <Div onClick={() => btnClickEvent(2)}>
                    <Btn color={url == `/post/all?postCategory=2&` && 'true'} >정보</Btn>
                </Div>
                <Div onClick={() => btnClickEvent(3)}>
                    <Btn color={url == `/post/all?postCategory=3&` && 'true'} >질문</Btn>
                </Div>
                <Div onClick={() => btnClickEvent(4)}>
                    <Btn color={url == `/post/all?postCategory=4&` && 'true'} >여행기</Btn>
                </Div>
            </FlexDiv>
            <FlexDiv width='90%' justifyContent='space-between' padding='0 24px'>
                <Btn height='32px'>
                    <StyledLink to='/writepost' cursor='pointer' fontSize='14px' padding='0 2px'>글쓰기</StyledLink>
                </Btn>
                <OrderSelect outside={outSideRef} />
            </FlexDiv>
            <FlexDiv backgroundColor='white' width='90%' padding='24px 96px' margin='30px 0 70px 0' borderRadius='30px' flexDirection='column'>
                <PostList url={url}/>
            </FlexDiv>
        </FlexDiv>
    )
}


export default CommunityMain