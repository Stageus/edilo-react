import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import useFetch from "../../hooks/useFetch";
import NoticeItem from "../elements/NoticeItem";
import { noticeListState } from "../../recoil/backendState";
import { Button, Div } from "../../styles/style";


const Notice = () => {
    const [noticeList, setNoticeList] = useRecoilState(noticeListState)

    useEffect(() => {
        const fc = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACK_HOST_IP + '/alarm/all?alarmPage=1', {
                    "method": "GET",
                    "mode": 'cors', // no-cors, *cors, same-origin
                    "credentials": "include"
                })
                const result = await response.json()
                console.log(result)
                if (result.success) {
                    setNoticeList(result.data)
                }
                else {
                    console.log(`${result.message}`)
                }
            } catch (err) {
                console.log(err)
            }
        }

        fc()
    }, [])


    return (
        <React.Fragment>
            {
                noticeList.length != 0 &&
                <Button position='relative' right='-60px' top='-16px'>
                    <Div textAlign='right' fontSize='14px' color='letterGray' cursor='pointer'>전체 삭제</Div>
                </Button>
            }
            {
                noticeList ?
                    <Div color='letterGray' textAlign='center'>알림이 존재하지 않습니다.</Div>
                    :
                    noticeList.map((eachNotice) => <NoticeItem eachNotice={eachNotice} />)
            }
        </React.Fragment>
    )
}


export default Notice