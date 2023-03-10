import React from "react";
import { FlexDiv, Img } from "../../styles/style";

const CommunityNavItem = (props) => {
    const { cityCategory, cityCountry, cityName } = props.cityObject

    const toggleDown = () => {

    }

    return (
        <FlexDiv width='190px' align='row-vertical-center' height='40px' fontSize='18px' borderBottom='1px solid #E1E4E6' margin='12px 0' justifyContent='space-between' cursor='pointer' onClick={toggleDown}>
            {cityCategory}
            <Img cursor='pointer' src={require('../../img/menudown.svg').default}/>
        </FlexDiv>
    )
}

export default CommunityNavItem