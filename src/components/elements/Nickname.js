import React, { useCallback } from "react";
import { useState } from "react";

import useFetch from '../../hooks/useFetch'
import { Img, Input, Div, FlexDiv, Button } from "../../styles/style";

const Nickname = (props) => {
    const { userNickname, userIndex } = props
    const [clickCheck, setClickCheck] = useState(false)
    const [inputValue, setInputValue] = useState(userNickname)


    const onChange = useCallback(e => {
        setInputValue(e.target.value)
    })

    const showBtnEvnet = () => {
        setClickCheck(true)
    }

    const useChangeNickNameEvnet = () => {
        useFetch('/account/nickname', 'PUT', {
            "userIndexValue": userIndex,
            "nicknameValue": inputValue
        })
        setClickCheck(false)
    }


    return (
        <FlexDiv align='row-vertical-center'>
            {
                clickCheck ?
                    <>
                        <Input border='1px solid #E1E4E6' padding='4px 8px' borderRadius='12px' width='fit-content' type='text' value={inputValue} onChange={onChange} />
                        <Button margin='0 8px' onClick={useChangeNickNameEvnet}>
                            <Img src={require('../../img/pencil.svg').default} width='16px' cursor='pointer' />
                        </Button>
                    </>
                    :
                    <>
                        <Div>{inputValue}</Div>
                        <Button margin='0 8px' onClick={showBtnEvnet}>
                            <Img src={require('../../img/pencil.svg').default} width='16px' cursor='pointer' />
                        </Button>
                    </>
            }

        </FlexDiv>
    )
}

export default Nickname