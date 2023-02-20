import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { FlexDiv, Img, Input } from "../../styles/style";
import { cityListState } from "../../recoil/backendState";
import CommunityNavCategory from "./CommunityNavCategory";
import useFetch from "../../hooks/useFetch";

// page, container, component
const StyledNav = styled(FlexDiv)`
    min-width: 260px;
    overflow-y: auto;
    ::-webkit-scrollbar {
        display: none;
    }
`

const CommunityNav = () => {
    const cityList = useRecoilValue(cityListState)
    const [sidebarList, setSidebarList] = useState(cityList)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [searchResult, setSearchResult] = useState('')
    const inputRef = useRef()
    //console.log(sidebarList)


    // url , data, method, query (boolean)


    const useSearchEvent = async (e) => {
        const value = e.target.value
        const result = useFetch('/city/search', 'GET', `?searchKeyword=${value}`, true)
        
        
        if (value == '') {
            setSidebarList(cityList)
        }
        else {
            console.log(result.success)
            setSidebarList(cityList.filter((item) => {
                //console.log(item.cityCategory.includes(value))
                if (item.cityCategory.includes(value)) {
                    return item
                }
                else if (result.success) {
                    item.name.forEach((country) => {
                        console.log(country.cityCategory, searchResult.cityCountry, country.cityCategory.includes(searchResult.cityCountry))
                        if (country.cityCategory.includes(searchResult.cityCountry)) {
                            console.log(item)
                            return item
                        }
                    })
                }
            }))
        }
    }


    return (
        <StyledNav position='fixed' backgroundColor='white' height='calc(100vh - 70px)' align='column-center'>
            <FlexDiv backgroundColor='backgroundGray' borderRadius='20px' margin='20px 0' alignItems='center' minHeight='30px'>
                <Input placeholder='대륙 · 나라 · 도시 검색' border='none' width='200px' outline='none' fontSize='12px' height='20px' padding='0 22px 0 12px' ref={inputRef} onChange={useSearchEvent} />
                <Img position='relative' right='14px' width='12px' cursor='pointer' src={require('../../img/search.svg').default}/>
            </FlexDiv>
            {
                sidebarList.map((cityObject) => <CommunityNavCategory cityObject={cityObject} />)
            }
        </StyledNav>
    )
}

export default CommunityNav