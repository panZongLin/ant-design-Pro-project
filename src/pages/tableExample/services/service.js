import request from '@/utils/request';
const {fromRequest, ajaxRequest} = request;

export function fetchDataQuest(payload) {
    let num = 100, data = [];
    for(let i=0; i<num; i++ ) {
        data.push({
            id: i,
            name: '老王' + i,
            username: '老王八' + i,
            website: 'www.baidu.com',
            phone: '123456789009',
            address: {
                city: '广州',
                street: '天河区'
            }
        })
    }
    return data
    // return ajaxRequest(`/api/xxx?_page=${payload.page}&_limit=${payload.limit}`, {
    //     method: 'GET'
    // })
}

export function createDataQuest(payload) {
    const opt = {
        method: 'POST',
        body: JSON.stringify(payload),
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // }
    }
    return ajaxRequest(`/api/xxx`, opt)
}

export function editDataQuest(payload) {
    const opt = {
        method: 'PUT',
        body: JSON.stringify(payload),
    }
    return ajaxRequest(`/api/xxx`, opt)
}

export function deleteDataQuest(payload) {
    const opt = {
        method: 'delete',
        body: JSON.stringify(payload),
    }
    return ajaxRequest(`/api/xxx`, opt)
}