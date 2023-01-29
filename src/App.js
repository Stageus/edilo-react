import React from "react"
import { Routes, Route } from 'react-router-dom';
import { useMediaQuery } from "react-responsive"
import { createGlobalStyle } from "styled-components";

import Schedule from "./components/schedule/Schedule";
import FooterComponent from "./components/header/Footer"
import HeaderComponent from "./components/header/Header"
import NotFound from "./components/NotFound";
import MyPage from "./components/myPage/MyPage";
import Community from "./components/community/Community";
import Write from "./components/community/Write";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }

    body {
        font-family: 'NanumGothic', sans-serif;
        margin: 0px;
    }
`

const App =() => {
    const isMobile = useMediaQuery({ maxWidth: 480 }) // 모바일

    return(
        <React.Fragment>
            <GlobalStyle/>
            <HeaderComponent isMobile={isMobile}></HeaderComponent>
            {isMobile && <FooterComponent></FooterComponent>}
            <Routes>
                {
                /*
                <Route path="/" element={<Main/>}/>
                */}
                <Route path="/schedule/*" element={<Schedule/>}/>
                
                <Route path="/community/*" element={<Community/>}/>
                <Route path="/writepost" element={<Write/>}/>
                <Route path="/myPage/*" element={<MyPage/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </React.Fragment>
    )

}

export default App