import request from '@/utils/request';
const {ajaxRequest} = request;
import {TableListResponseType} from './model';

export interface FetchType {
    page: number,
    limit: number
}
export interface DeleteType {
    id: number
}
export function fetchDataQuest(payload: FetchType) {
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
    return {
        code: '110',
        msg: 'success',
        data: data
    }
    // return ajaxRequest(`/api/xxx?_page=${payload.page}&_limit=${payload.limit}`, {
    //     method: 'GET'
    // })
}

export function createDataQuest(payload: TableListResponseType['data']) {
    const opt = {
        method: 'POST',
        body: JSON.stringify(payload),
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // }
    }
    return ajaxRequest(`/api/xxx`, opt)
}

export function editDataQuest(payload: TableListResponseType['data']) {
    const opt = {
        method: 'PUT',
        body: JSON.stringify(payload),
    }
    return ajaxRequest(`/api/xxx`, opt)
}

export function deleteDataQuest(payload: DeleteType) {
    const opt = {
        method: 'delete',
        body: JSON.stringify(payload),
    }
    return ajaxRequest(`/api/xxx`, opt)
}