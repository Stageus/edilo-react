// url , method, data, query (boolean), auth (boolean)
const useFetch = async (url, method, data, query, auth) => {
    console.log(url, method, data, query)
    if (method == 'POST') {
        let setting
        if (auth == true) {
            setting = {
                "method": method,
                "mode": 'cors', // no-cors, *cors, same-origin
                "credentials": "include",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(data)
            }
        }
        else {
            setting = {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(data)
            }
        }
        try {
            const response = await fetch(process.env.REACT_APP_BACK_HOST_IP + url, setting)
            const result = await response.json()

            console.log(result)
            return result
        }
        catch (err) {
            console.log(`ERR : ${err}`)
        }
    }

    else if (method == 'GET' && query != null) {
        try {
            const response = await fetch(process.env.REACT_APP_BACK_HOST_IP + url + data, {
                "method": "GET",
                "mode": 'cors', // no-cors, *cors, same-origin
                "credentials": "include"
            })
            const result = await response.json()

            console.log(result)
            return result
        }
        catch (err) {
            console.log(`ERR : ${err}`)
        }
    }

    else if (method == 'GET') {
        //console.log(process.env.REACT_APP_BACK_HOST_IP + url)
        try {
            const response = await fetch(process.env.REACT_APP_BACK_HOST_IP + url, {
                "method": "GET",
                "mode": 'cors', // no-cors, *cors, same-origin
                "credentials": "include"
            })
            const result = await response.json()

            console.log(result)
            return result
        }
        catch (err) {
            console.log(`ERR : ${err}`)
        }
    }

    else {
        try {
            const response = await fetch(process.env.REACT_APP_BACK_HOST_IP + url, {
                "method": method,
                "mode": 'cors', // no-cors, *cors, same-origin
                "credentials": "include",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(data)
            })
            const result = await response.json()

            console.log(result)
            return result
        }
        catch (err) {
            console.log(`ERR : ${err}`)
        }
    }
}

export default useFetch