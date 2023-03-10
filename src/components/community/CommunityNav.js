import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { FlexDiv, Img, Input } from "../../styles/style";
import { cityListState } from "../../recoil/backendState";
import CommunityNavItem from "./CommunityNavItem";

const StyledNav = styled(FlexDiv)`
    min-width: 260px;
`

const CommunityNav = () => {
    const cityList = useRecoilValue(cityListState)

    console.log(cityList)

    return(
        <StyledNav position='fixed' backgroundColor='white' height='calc(100vh - 70px)' align='column-center'>
            <FlexDiv backgroundColor='backgroundGray' borderRadius='20px' margin='20px 0' alignItems='center' height='30px'> 
                <Input placeholder='대륙 · 나라 · 도시 검색' border='none' width='200px' outline='none' fontSize='12px' height='20px' padding='0 22px 0 12px'/>
                <Img position='relative' right='14px' width='12px' cursor='pointer' src={require('../../img/search.svg').default}/>
            </FlexDiv>
            {
                cityList.map((cityObject) => <CommunityNavItem cityObject={cityObject}/>)
            }
        </StyledNav>
    )
}

export default CommunityNav