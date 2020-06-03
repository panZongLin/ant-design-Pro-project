import {
    fetchDataQuest,
    createDataQuest,
    editDataQuest,
    deleteDataQuest
} from '../services/service';
import {message} from 'antd';


const Model = {
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
          return history.listen(({ pathname, query }) => {
            if (pathname === '/tableExample') {
              dispatch({ type: 'fetch', payload: {page: 1, limit: 10} });
            }
          });
        },
    },

    effects: {
        *fetch( { payload }, { call, put, select }) {
            const data = yield call(fetchDataQuest, payload);
            yield put({type: 'updataState', payload: {userInfo: data}})
        },
        *create( { payload }, { call, put, select }) {
            const data = yield call(createDataQuest, payload);
            if(data.success==='1'){
                message.success('create success!');
                yield put({type: 'fetch', payload: {page: 1, limit: 10}})
            }
        },
        *edit( { payload }, { call, put, select }) {
            const {page, limit} = select((state)=> state.user);
            const data = yield call(editDataQuest, payload);
            if(data.success==='1'){
                message.success('edit success!');
                yield put({type: 'fetch', payload: {page, limit}})
            }
        },
        *delete( { payload }, { call, put, select }) { 
            const {page, limit} = select((state)=> state.user);
            const data = yield call(deleteDataQuest, payload);
            if(data.success==='1'){
                message.success('delete success!');
                yield put({type: 'fetch', payload: {page, limit}})
            }
        },
    },

    reducers: {
        updataState(state, { payload }) {
            return { ...state, ...payload};
        },
    }
}

export default Model;