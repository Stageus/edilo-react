import { atom, selector } from 'recoil'


//// header ////
export const userDataState = atom({
    key: 'userData',
    default: ''
})

export const userPlanDataState = atom({
    key: 'userPlan',
    default: ''
})


// 백엔드에서 가져오는 일정
export const planListState = atom({
    key: 'planList',
    default: [
        // {
        //     "date": "2023-02-14",
        //     "cityIndex": '도쿄', // 백엔드 number 맞춰서 수정
        //     "scheduleList": [
        //         {
        //             "blockName": '시부야 스카이',
        //             "blockTime": "hh:mm:ss",
        //             "blockCategory": '관광명소',
        //             "blockXCoordinate": 139.7022513688183, // lng
        //             "blockYCoordinate": 35.65849864918091, // lat
        //             "blockCost": null
        //         },
        //         {
        //             "blockName": '라케루',
        //             "blockTime": "hh:mm:ss",
        //             "blockCategory": '음식점',
        //             "blockXCoordinate": 139.7043604, // lng
        //             "blockYCoordinate": 35.6601234, // lat
        //             "blockCost": null
        //         }
        //     ]
        // }
    ]
})

export const eachPlanBlockState = atom({
    key: 'eachPlanBlock',
    default: []
})

export const eachPlanState = atom({
    key: 'eachPlan',
    default: []
})


//// main ////
export const mainCityState = selector({
    key: 'mainCity',
    // default: [{
    //     'cityName': '서울',
    //     'cityEnglishName': 'SEOUL',
    //     'cityImg': require('../img/seoul.svg').default
    // },
    // {
    //     'cityName': '서울',
    //     'cityEnglishName': 'SEOUL',
    //     'cityImg': require('../img/seoul.svg').default
    // },
    // {
    //     'cityName': '서울',
    //     'cityEnglishName': 'SEOUL',
    //     'cityImg': require('../img/seoul.svg').default
    // },
    // {
    //     'cityName': '서울',
    //     'cityEnglishName': 'SEOUL',
    //     'cityImg': require('../img/seoul.svg').default
    // },
    // {
    //     'cityName': '서울',
    //     'cityEnglishName': 'SEOUL',
    //     'cityImg': require('../img/seoul.svg').default
    // },
    // {
    //     'cityName': '서울',
    //     'cityEnglishName': 'SEOUL',
    //     'cityImg': require('../img/seoul.svg').default
    // },
    // {
    //     'cityName': '서울',
    //     'cityEnglishName': 'SEOUL',
    //     'cityImg': require('../img/seoul.svg').default
    // },
    // {
    //     'cityName': '서울',
    //     'cityEnglishName': 'SEOUL',
    //     'cityImg': require('../img/seoul.svg').default
    // },
    // {
    //     'cityName': '서울',
    //     'cityEnglishName': 'SEOUL',
    //     'cityImg': require('../img/seoul.svg').default
    // },
    // {
    //     'cityName': '서울',
    //     'cityEnglishName': 'SEOUL',
    //     'cityImg': require('../img/seoul.svg').default
    // },
    // {
    //     'cityName': '서울',
    //     'cityEnglishName': 'SEOUL',
    //     'cityImg': require('../img/seoul.svg').default
    // },
    // {
    //     'cityName': '서울',
    //     'cityEnglishName': 'SEOUL',
    //     'cityImg': require('../img/seoul.svg').default
    // },
    // {
    //     'cityName': '서울',
    //     'cityEnglishName': 'SEOUL',
    //     'cityImg': require('../img/seoul.svg').default
    // },
    // {
    //     'cityName': '서울',
    //     'cityEnglishName': 'SEOUL',
    //     'cityImg': require('../img/seoul.svg').default
    // },
    // {
    //     'cityName': '서울',
    //     'cityEnglishName': 'SEOUL',
    //     'cityImg': require('../img/seoul.svg').default
    // },
    // {
    //     'cityName': '서울',
    //     'cityEnglishName': 'SEOUL',
    //     'cityImg': require('../img/seoul.svg').default
    // },
    // {
    //     'cityName': '서울',
    //     'cityEnglishName': 'SEOUL',
    //     'cityImg': require('../img/seoul.svg').default
    // },
    // ]
    get: 
    async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACK_HOST_IP + "/city/all", {
                "method": "GET"
            })
            const result = await response.json()

            if (result.success) {
                console.log(result)
                return result.cityIndex
            }
            else {
                console.log(`${result.message}`)
            }
        }
        catch (err) {
            console.log(`ERR : ${err}`)
        }
    }
})

export const cityListState = atom({
    key: 'cityList',
    default: [
        {
            'cityCategory': '대한민국',
            'name': [
            ]
        },
        {
            'cityCategory': '아시아',
            'name': [
                {
                    'cityCategory': '일본',
                    'name': ['도쿄']
                },
            ]
        },
        {
            'cityCategory': '유럽',
            'name': [
            ]
        },
        {
            'cityCategory': '북아메리카',
            'name': [
            ]
        },
        {
            'cityCategory': '남아메리카',
            'name': [
            ]
        },
        {
            'cityCategory': '오세아니아',
            'name': [
            ]
        },
        {
            'cityCategory': '아프리카',
            'name': [
            ]
        }
    ]
})

export const userImgState = atom({
    key: 'userImg',
    default: require('../img/userImg.svg').default
})


export const noticeListState = atom({
    key: 'noticeList',
    default: [
        {
            'senderNickname': '여행가123',
            'alarmCategory': 'reply',
            'postTitle': '유럽여행 후기'
        },
        {
            'senderNickname': '여행가123',
            'alarmCategory': 'like',
            'postTitle': '유럽여행 후기'
        },
        {
            'senderNickname': '여행가123',
            'alarmCategory': 'reply',
            'postTitle': '유럽여행 후기'
        },
        {
            'senderNickname': '여행가123',
            'alarmCategory': 'like',
            'postTitle': '유럽여행 후기'
        }
    ]
})

//////// Post ////////
// atomFamily ... ? 
export const postListState = atom({
    key: 'postList',
    default: []
    // default: [
    //     {
    //         'areaTag': {
    //             'cityCategory': '유럽',
    //             'cityCountry': '프랑스',
    //             'cityName': '파리'
    //         },
    //         'postTitle': '강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행100자',
    //         'postDate': '2022-01-01',
    //         'postWriter': '뚜벅이 여행가',
    //         'postImg': ''
    //     },
    //     {
    //         'areaTag': {
    //             'cityCategory': '대한민국',
    //             'cityCountry': '',
    //             'cityName': '강릉'
    //         },
    //         'postTitle': '강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행100자',
    //         'postDate': '2022-12-31',
    //         'postWriter': '뚜벅이 여행가',
    //         'postImg': 'https://img.eomisae.co.kr/files/attach/images/100572/573/731/080/00f5f916a83dcc308af32c241e2dab20.jpg'
    //     },
    //     {
    //         'areaTag': {
    //             'cityCategory': '유럽',
    //             'cityCountry': '프랑스',
    //             'cityName': '파리'
    //         },
    //         'postTitle': '프랑스 파리',
    //         'postDate': '2022-01-01',
    //         'postWriter': '뚜벅이 여행가',
    //         'postImg': ''
    //     },
    //     {
    //         'areaTag': {
    //             'cityCategory': '유럽',
    //             'cityCountry': '프랑스',
    //             'cityName': '파리'
    //         },
    //         'postTitle': '강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행100자',
    //         'postDate': '2022-01-01',
    //         'postWriter': '뚜벅이 여행가',
    //         'postImg': ''
    //     },
    //     {
    //         'areaTag': {
    //             'cityCategory': '대한민국',
    //             'cityCountry': '',
    //             'cityName': '강릉'
    //         },
    //         'postTitle': '강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행100자',
    //         'postDate': '2022-12-31',
    //         'postWriter': '뚜벅이 여행가',
    //         'postImg': 'https://img.eomisae.co.kr/files/attach/images/100572/573/731/080/00f5f916a83dcc308af32c241e2dab20.jpg'
    //     },
    //     {
    //         'areaTag': {
    //             'cityCategory': '유럽',
    //             'cityCountry': '프랑스',
    //             'cityName': '파리'
    //         },
    //         'postTitle': '프랑스 파리',
    //         'postDate': '2022-01-01',
    //         'postWriter': '뚜벅이 여행가',
    //         'postImg': ''
    //     },
    //     {
    //         'areaTag': {
    //             'cityCategory': '유럽',
    //             'cityCountry': '프랑스',
    //             'cityName': '파리'
    //         },
    //         'postTitle': '강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행100자',
    //         'postDate': '2022-01-01',
    //         'postWriter': '뚜벅이 여행가',
    //         'postImg': ''
    //     },
    //     {
    //         'areaTag': {
    //             'cityCategory': '대한민국',
    //             'cityCountry': '',
    //             'cityName': '강릉'
    //         },
    //         'postTitle': '강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행100자',
    //         'postDate': '2022-12-31',
    //         'postWriter': '뚜벅이 여행가',
    //         'postImg': 'https://img.eomisae.co.kr/files/attach/images/100572/573/731/080/00f5f916a83dcc308af32c241e2dab20.jpg'
    //     },
    //     {
    //         'areaTag': {
    //             'cityCategory': '유럽',
    //             'cityCountry': '프랑스',
    //             'cityName': '파리'
    //         },
    //         'postTitle': '프랑스 파리',
    //         'postDate': '2022-01-01',
    //         'postWriter': '뚜벅이 여행가',
    //         'postImg': ''
    //     },
    //     {
    //         'areaTag': {
    //             'cityCategory': '유럽',
    //             'cityCountry': '프랑스',
    //             'cityName': '파리'
    //         },
    //         'postTitle': '강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행입니다/강릉 여행100자',
    //         'postDate': '2022-01-01',
    //         'postWriter': '뚜벅이 여행가',
    //         'postImg': ''
    //     },
    // ]
})

export const currentPostState = atom({
    key: 'currentPost',
    default: {}
})

export const currentCommentState = atom({
    key: 'currentComment',
    default: {}
})