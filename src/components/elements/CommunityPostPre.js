import React from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { currentPostState } from '../../recoil/backendState'
import { Div, FlexDiv, Img } from "../../styles/style";


const LabelDiv = styled(Div)`
    font-size: 14px;
    color: #919699;
    margin: ${(props) => props.margin ? props.margin : '36px 0 8px'}
`

const PostImgTag = styled(Img)`
    object-fit: cover;
`

const StyledLink = styled(Link)`
    color: black;
    text-decoration: none;
    cursor: pointer;
`

const CommunityPostPre = (props) => {
    const { eachPost } = props
    const { posttitle, postdate, postwriter, postimgurl, citycategory, citycountry, cityname, postindex } = eachPost
    const date = postdate.substr(0, 10)
    const [year, month, day] = date?.split('-')


    return (
        <FlexDiv flexDirection='column' borderBottom='1px solid #E1E4E6'>
            <FlexDiv justifyContent='space-between'>
                <LabelDiv>
                    {(citycategory != null ? citycategory : '') +
                        (citycountry ? ' · ' + citycountry : '') +
                        (cityname ? ' · ' + cityname : '')}
                </LabelDiv>
                <LabelDiv>
                    {year}.{month}.{day}
                </LabelDiv>
            </FlexDiv>
            <StyledLink to={`post`} state={{
                'postindex': postindex
            }}>
                <FlexDiv justifyContent='space-between' margin='10px 0 0 0'>
                    <FlexDiv fontSize='20px' margin='0 10px 10px 0' cursor='pointer' flexDirection='column'>
                        {posttitle}
                        <LabelDiv margin='32px 0 36px'>
                            by {postwriter}
                        </LabelDiv>
                    </FlexDiv>
                    <Div width='100px' height='100px'>
                        {
                            postimgurl != null && <PostImgTag cursor='pointer' src={postimgurl} alt='' width='100px' height='100px' borderRadius='14px' />
                        }
                    </Div>
                </FlexDiv>
            </StyledLink>
        </FlexDiv>
    )
}

export default CommunityPostPre