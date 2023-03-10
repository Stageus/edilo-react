import React from "react";
import { useRecoilValue } from "recoil";

import NoticeItem from "./NoticeItem";
import { noticeListState } from "../../recoil/backendState";
import { Button, Div } from "../../styles/style";

const Notice = () => {
    //const [ post, setPost ] = useRecoilState(example)
    const NoticeList = useRecoilValue(noticeListState)
    
    return (
        <React.Fragment>
            <Button position='relative' right='-60px' top='-16px'>
                <Div textAlign='right' fontSize='14px' color='letterGray' cursor='pointer'>전체 삭제</Div>
            </Button>
            {
                NoticeList.map((eachNotice) => <NoticeItem eachNotice={eachNotice}/>)
            }
        </React.Fragment>
    )
}

export default Notice