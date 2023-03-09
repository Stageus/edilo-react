import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { postListState } from "../../recoil/backendState";
import { postCategoryState } from "../../recoil/state";
import { Div, FlexDiv } from "../../styles/style";
import CommunityPostPre from "./CommunityPostPre";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";


const PostList = (props) => {
    const { url } = props
    const [posts, setPosts] = useRecoilState(postListState)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [ref, inView] = useInView({threshold: 1})


    const fetchURL = () => {
        if (url == '/post/scrap/all') {
            return url
        }
        else {
            return url + `postPage=${page}`
        }
    }

    const getPosts = useCallback(async () => {  
        console.log(fetchURL())
        try {
            const response = await fetch(process.env.REACT_APP_BACK_HOST_IP + fetchURL(), {
                "method": "GET",
                "mode": 'cors', // no-cors, *cors, same-origin
                "credentials": "include"
            })
            const result = await response.json()
            console.log(result)
            if (result.success) {
                if (result.data.length != 0) {
                    setPosts((prevPosts) => [...prevPosts, ...result.data[0]])
                }
                else {
                    console.log('마지막 게시글입니다.')
                }
                setLoading(false)
            }
            else {
                console.log(`${result.message}`)
            }
        } catch (err) {
            console.log(err)
        }
    }, [url, page])


    useEffect(() => {
        setPosts([])
        setPage(1)
    }, [url])

    useEffect(() => {
        getPosts()
    }, [getPosts])

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면 page+=1
        if (inView && !loading) {
            setPage((prevState) => prevState + 1)
            setLoading(true)
        }
    }, [inView])


    return (
        <React.Fragment>
            {
                loading ?
                <Div>게시글 불러오는 중. . . ✏️</Div>
                :
                posts && posts.map((eachPost) => <CommunityPostPre eachPost={eachPost} />)
            }
            <Div ref={ref}></Div>
        </React.Fragment>
    )

}

export default PostList