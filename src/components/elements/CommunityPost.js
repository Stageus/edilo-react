import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import { currentCommentState, currentPostState } from "../../recoil/backendState";
import { isLoginState } from "../../recoil/state";
import { Div, Button, FlexDiv, PTag, Img } from "../../styles/style";

const LabelDiv = styled(Div)`
    font-size: 14px;
    color: #919699;
`

const Textarea = styled.textarea`
    width: 100%;
    height: 140px;
    background-color: #F0F3F5;
    border-radius: 18px;

    margin: 46px 0;
    padding: 32px 24px;

    border: none;
    resize: none;

    &:focus {
        outline: none;
    }
`

const ImgDiv = styled(FlexDiv)`
    overflow-x: scroll;
    object-fit: contain;

    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background: #E1E3E6;
        border-radius: 30px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #CCCCCC;
    }

    ::-webkit-scrollbar-track {
        background: #F0F3F5;
        border-radius: 30px;
    }
`

const AttachImg = styled(Img)`
    user-select: none;
`

const ProfileImg = styled(Img)`
    object-fit: cover;
`


const CommunityPost = () => {
    const navigate = useNavigate()
    const isLogin = useRecoilValue(isLoginState)
    const location = useLocation()
    const postindex = location.state?.postindex
    const [postInfo, setPostInfo] = useRecoilState(currentPostState)
    const [commentData, setCommentData] = useRecoilState(currentCommentState)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const fc = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACK_HOST_IP + `/post?postIndex=${postindex}`, {
                    "method": "GET",
                    "mode": 'cors', // no-cors, *cors, same-origin
                    "credentials": "include"
                })
                const result = await response.json()

                if (result.success) {
                    console.log(result)
                    setPostInfo(result.postData)
                    setCommentData(result.commentData)
                    setIsLoading(false)
                }
            }
            catch (err) {
                console.log(`ERR : ${err}`)
            }
        }

        fc()
    }, [])


    return (
        isLoading ?
            <Div>게시글 불러오는 중...</Div>
            :
            <FlexDiv width='100%' justifyContent='center' padding='20px 0 140px 260px'>
                <FlexDiv backgroundColor='white' width='90%' padding='24px 96px' margin='20px 0 0 0' borderRadius='30px' flexDirection='column'>
                    <FlexDiv>
                        <LabelDiv margin='36px 0 8px'>
                            {(postInfo.citycategory != null ? postInfo.citycategory : '') +
                                (postInfo.citycountry ? ' · ' + postInfo.citycountry : '') +
                                (postInfo.cityname ? ' · ' + postInfo.cityname : '')}
                        </LabelDiv>
                    </FlexDiv>
                    <FlexDiv>
                        <FlexDiv fontSize='20px' fontWeight='600'>
                            {postInfo.posttitle}
                        </FlexDiv>
                    </FlexDiv>
                    <FlexDiv justifyContent='space-between' margin='24px 0' padding='0 0 16px 0' borderBottom='1px solid #333333'>
                        {/* 왼쪽 */}
                        <FlexDiv alignItems='center'>
                            <LabelDiv>
                                {
                                    postInfo.postdate.substr(0, 10).replace(/-/gi, '.')
                                }
                            </LabelDiv>
                            <LabelDiv margin='0 18px 0 10px'>
                                by {postInfo.postwriter}
                            </LabelDiv>
                            
                            {/* 작성자만 보이게 수정 */}
                            <Button padding='0 4px' cursor='pointer'>
                                <LabelDiv cursor='pointer'>
                                    수정
                                </LabelDiv>
                            </Button>
                            <Button padding='0 4px' cursor='pointer'>
                                <LabelDiv cursor='pointer'>
                                    삭제
                                </LabelDiv>
                            </Button>
                        </FlexDiv>
                        {/* 오른쪽 */}
                        <FlexDiv>
                            <LabelDiv margin='0 12px 0 2px'>
                                조회수 {postInfo.postviews}
                            </LabelDiv>
                            <LabelDiv margin='0 12px 0 2px'>
                                댓글 수 {commentData.length}
                            </LabelDiv>
                            <LabelDiv margin='0 12px 0 2px'>
                                스크랩 {/*scrap*/}
                            </LabelDiv>
                            <LabelDiv margin='0 12px 0 2px'>
                                좋아요 {/*like*/}
                            </LabelDiv>
                        </FlexDiv>
                    </FlexDiv>

                    {/* 여행기 첨부한 경우 */}

                    {/* 게시글 내용 시작 */}
                    <PTag margin='36px 0' dangerouslySetInnerHTML={{ __html: postInfo.postcontent }}>
                    </PTag>

                    {/* 첨부된 이미지 */}
                    {
                        postInfo.postimgurl != null &&
                        <ImgDiv width='100%' height='380px' margin='0 0 48px 0'>
                            {
                                postInfo.postimgurl.map((img) => <AttachImg pointerEvent='none' width='auto' height='350px' margin='8px' src={img} />)
                            }
                        </ImgDiv>
                    }
                    <FlexDiv justifyContent='right' borderBottom='1px solid black' padding='24px 0'>
                        <Button border='1.5px solid #0097F5' margin='0 12px' borderRadius='12px' height='36px'>
                            <FlexDiv alignItems='center'>
                                <Img width='16px' src={require('../../img/heart.svg').default} margin='0 2px' />
                                <Div color='mainColor' fontSize='14px'>
                                    {/*like*/}
                                </Div>
                            </FlexDiv>
                        </Button>
                        <Button border='1.5px solid #0097F5' borderRadius='12px' height='36px'>
                            <FlexDiv alignItems='center'>
                                <Img width='18px' src={require('../../img/star_full.svg').default} margin='0 2px' />
                                <Div color='mainColor' fontSize='14px'>
                                    {/*scrap*/}
                                </Div>
                            </FlexDiv>
                        </Button>
                    </FlexDiv>
                    {/* 댓글 작성*/}
                    {
                        isLogin ?
                        <Div position='relative'>
                            <Textarea></Textarea>
                            <Button position='absolute' right='8px' top='190px' backgroundColor='mainColor' borderRadius='10px' height='28px' width='54px' color='white'>
                                등록
                            </Button>
                        </Div>
                        :
                        <Div position='relative'>
                            <Div>로그인 후 댓글을 작성할 수 있습니다.</Div>
                        </Div>
                    }

                    {
                        commentData.map((eachComment) => {
                            const [year, month, day] = eachComment.commentDate.split('-')

                            return (
                                <FlexDiv margin='18px 0'>
                                    <ProfileImg width='60px' height='60px' borderRadius='50%' src={eachComment.commentWriterImg} margin='0 12px 0 0' />
                                    <FlexDiv flexDirection='column'>
                                        <Div>{eachComment.commentWriter}</Div>
                                        <FlexDiv>
                                            <LabelDiv fontSize='14px' margin='4px 0'>
                                                {year}.{month}.{day}
                                            </LabelDiv>
                                            {
                                                postInfo.postwriter == eachComment.commentWriter &&
                                                <Button margin='0 0 0 8px'>
                                                    <LabelDiv cursor='pointer'>
                                                        삭제
                                                    </LabelDiv>
                                                </Button>
                                            }
                                        </FlexDiv>
                                        <Div margin='8px 0'>
                                            {eachComment.commentContent}
                                        </Div>
                                    </FlexDiv>
                                </FlexDiv>
                            )
                        })
                    }
                </FlexDiv>
            </FlexDiv>
    )
}

export default CommunityPost