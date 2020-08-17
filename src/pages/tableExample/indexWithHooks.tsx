import React, { FC } from 'react';
import { connect, Dispatch, FormattedMessage } from 'umi';
import {
    Button,
    Table, 
    Divider, 
    Tag,
    Popconfirm
} from 'antd';
import {StateType, TableListResponseType} from './model';
import TableModal from './components/tableModalWithHooks';


export interface TableContentProps {
    tableExample:  StateType,
    dispatch: Dispatch,
    loading: boolean
}

const TableContentWithHooks: FC<TableContentProps> = (props)=> {
    const {tableExample, dispatch, loading} = props;
    const {page, limit, userInfo, modalVisible, currentEdit} = tableExample;
    const columns = [
        {
            title: <FormattedMessage id="TableExample.columns.name" />,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: <FormattedMessage id="TableExample.columns.username" />,
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: <FormattedMessage id="TableExample.columns.website" />,
            dataIndex: 'website',
            key: 'website',
        },
        {
            title: <FormattedMessage id="TableExample.columns.phone" />,
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: <FormattedMessage id="TableExample.columns.address" />,
            key: 'address',
            dataIndex: 'address',
            render: (text: TableListResponseType['data']['address']) => {
                return(
                    <span>
                        <Tag color='green' key={text.city}>{text.city}</Tag>
                        <Tag color='red' key={text.street}>{text.street}</Tag>
                    </span>
                )
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any , record: TableListResponseType['data']) => (
                <span>
                    <a href="#" onClick={(e)=>handleEdit(e, record)}>
                        <FormattedMessage id="TableExample.title.edit" />
                    </a>
                    <Divider type="vertical" />
                    <Popconfirm title="Are you sure delete this task?" onConfirm={(e)=>handleDelete(e, record.id)}>
                        <a href="#"><FormattedMessage id="TableExample.title.delete" /></a>
                    </Popconfirm>
                </span>
            ),
        },
    ];


    const showModal = ()=> {
        dispatch({
            type: 'tableExample/updataState', 
            payload: {modalVisible: true}
        })
    }
    const handleEdit = (e: any, record: TableListResponseType['data'])=> {
        e.preventDefault();
        dispatch({
            type: 'tableExample/updataState',
            payload: {
                modalVisible: true,
                currentEdit: {
                    id: record.id,
                    name: record.name,
                    username: record.username,
                    website: record.website,
                    phone: record.phone,
                    address: `${record.address.city}  ${record.address.street}` 
                }
            }
        })
    }
    const handleDelete = (e: any, id: number)=> {
        e.preventDefault();
        dispatch({
            type: 'tableExample/delete',
            payload: {id}
        })
    }

    return (
        <div>
            <Button type='primary' onClick={showModal} style={{marginBottom: '10px'}}>
                <FormattedMessage id="TableExample.title.create" />
            </Button>
            <TableModal 
                dispatch={dispatch}
                modalVisible={modalVisible}
                currentEdit={currentEdit}
            />
            <Table<any>
                loading={loading}
                columns={columns} 
                dataSource={userInfo} 
                rowKey={(record)=> record.id}
            />
        </div>
    )
}

export default connect(
    ({ 
        tableExample, 
        loading 
    }: {
        tableExample: StateType,
        loading: any
        //loading: { effects: { [key: string]: boolean } }
    })=> {
        return {
            tableExample, 
            loading: loading.models.tableExample
            //loading: loading.effects['tableExample/fetch'],
        }
    }
)(TableContentWithHooks);