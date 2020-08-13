import {
    fetchDataQuest,
    createDataQuest,
    editDataQuest,
    deleteDataQuest
} from './service';
import { Subscription, Effect, Reducer } from 'umi';
import {message} from 'antd';
import {BaseResponseType} from '@/models/login';


export interface StateType {
    page: number,
    limit: number,
    total: number,
    userInfo: object[],
    modalVisible: boolean,
    currentEdit: object
}
export interface TableListResponseType extends BaseResponseType {
    data: {
        id: number,
        name: string,
        username: string,
        website: string,
        phone: string,
        address: {
            city: string,
            street: string
        }
    }
}
export interface SuccessResponseType extends BaseResponseType {
    data: {
        success: string
    }
}
export interface ModelType {
    namespace: string,
    state: StateType,
    subscriptions: {
        setup: Subscription
    },
    effects: {
        fetch: Effect,
        create: Effect,
        edit: Effect,
        delete: Effect
    },
    reducers: {
        updataState: Reducer,
        saveUserInfo: Reducer
    }
}
const Model: ModelType = {
    namespace: 'tableExample',
    state: {
        page: 1,
        limit: 10,
        total: 0, //分页(没写)
        userInfo: [],
        modalVisible: false,
        currentEdit: {}
    },

    subscriptions: {
        setup({ dispatch, history }) {
          return history.listen(({ pathname }) => {
            if (pathname === '/tableExample') {
              dispatch({ type: 'fetch', payload: {page: 1, limit: 10} });
            }
          });
        },
    },

    effects: {
        *fetch( { payload }, { call, put, select }) {
            const response: TableListResponseType = yield call(fetchDataQuest, payload);
            yield put({
                type: 'saveUserInfo', 
                payload: {userInfo: response.data}
            })
        },
        *create( { payload }, { call, put, select }) {
            const response: SuccessResponseType = yield call(createDataQuest, payload);
            if(response.data.success==='1'){
                message.success('create success!');
                yield put({
                    type: 'fetch', 
                    payload: {page: 1, limit: 10}
                })
            }
        },
        *edit( { payload }, { call, put, select }) {
            const {page, limit} = select((state: any)=> state.user);
            const response: SuccessResponseType  = yield call(editDataQuest, payload);
            if(response.data.success==='1'){
                message.success('edit success!');
                yield put({
                    type: 'fetch', 
                    payload: {page, limit}
                })
            }
        },
        *delete( { payload }, { call, put, select }) { 
            const {page, limit} = select((state: any)=> state.user);
            const response: SuccessResponseType  = yield call(deleteDataQuest, payload);
            if(response.data.success==='1'){
                message.success('delete success!');
                yield put({
                    type: 'fetch', 
                    payload: {page, limit}
                })
            }
        },
    },

    reducers: {
        updataState(state, { payload }) {
            return { ...state, ...payload};
        },
        saveUserInfo(state, {payload}) {
            return {...state, userInfo: payload.userInfo}
        }
    }
}

export default Model;