import React from "react";
import { Route, Routes } from "react-router-dom";

import CommunityMain from "./CommunityMain";
import CommunityNav from '../navs/CommunityNav'
import CommunityPost from "../elements/CommunityPost";
import { FlexDiv } from "../../styles/style";


const Community = () => {
    return (
        <FlexDiv backgroundColor='backgroundGray' padding='70px 0 0 0'>
            <CommunityNav />
            <Routes>
                <Route path="" element={<CommunityMain />} />
                <Route path="post/*" element={<CommunityPost />} />
            </Routes>
        </FlexDiv>
    )
}


export default Community