import React, { Component } from 'react';
import { connect } from 'umi';
import {
    Button,
    Table, 
    Divider, 
    Tag,
    Popconfirm
} from 'antd';

import TableModal from './tableModal';

class TableContent extends Component {
    constructor(props) {
        super(props);

    }
    showModal=()=> {
        const {dispatch} = this.props;
        dispatch({
            type: 'tableExample/updataState', 
            payload: {modalVisible: true}
        })
    }
    handleEdit=(record)=> {
        const {dispatch} = this.props;
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
    handleDelete=(id)=> {
        const {dispatch} = this.props;
        dispatch({
            type: 'tableExample/delete',
            payload: {id}
        })
    }

    render() {
        const {dispatch, loading, tableExample } = this.props;
        const {page, limit, userInfo, modalVisible, currentEdit} = tableExample;
        const columns = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'username',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: 'website',
                dataIndex: 'website',
                key: 'website',
            },
            {
                title: 'phone',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: 'address',
                key: 'address',
                dataIndex: 'address',
                render: (text) => {
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
                render: (text, record) => (
                    <span>
                        <a href="javascript:;" onClick={()=>this.handleEdit(record)}>edit</a>
                        <Divider type="vertical" />
                        <Popconfirm title="Are you sure delete this task?" onConfirm={()=>this.handleDelete(record.id)}>
                            <a href="javascript:;">Delete</a>
                        </Popconfirm>
                    </span>
                ),
            },
        ];
        return (
            <div>
                <Button type='primary' onClick={this.showModal}>create</Button>
                <TableModal 
                    dispatch={dispatch}
                    modalVisible={modalVisible}
                    currentEdit={currentEdit}
                />
                <Table 
                    loading={loading.models.tableExample}
                    columns={columns} 
                    dataSource={userInfo} 
                    rowKey={(record)=> record.id}
                />
            </div>
        );
    }
}

export default connect(({ tableExample, loading })=> {
    return {
        tableExample, loading
    }
})(TableContent);