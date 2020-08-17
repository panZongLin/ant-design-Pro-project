import React, { FC, useEffect } from 'react';
import { Dispatch, FormattedMessage } from 'umi';
import {
    Modal,
    Form,
    Input,
    Button
} from 'antd';

const formItemLayout = {
    labelCol: {
      xs: { span: 12},
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 18 },
    },
};
const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 16,
    },
};


export interface TableModalType {
    dispatch: Dispatch,
    modalVisible: boolean,
    currentEdit: object
}

const TableModalWithHooks: FC<TableModalType> = (props)=> {
    const {dispatch, modalVisible, currentEdit} = props;
    const [form] = Form.useForm();

    useEffect(()=>{
        if(currentEdit && Object.keys(currentEdit).length !=0) {
            form.setFieldsValue(currentEdit);
        }
    }, [currentEdit])

    const handleSubmit = (values: { [key: string]: any })=> {
        handleCancel();
        if(values.id) {
            dispatch({
                type: 'tableExample/edit',
                payload: values
            })
        }else {
            dispatch({
                type: 'tableExample/create',
                payload: values
            })
        }
    }
    const reset = ()=> {
        form.resetFields()
    }   
    const handleCancel = ()=> {
        reset();
        dispatch({
            type: 'tableExample/updataState',
            payload: {modalVisible: false, currentEdit: {}}
        })
    }

    const opt = {
        title: Object.keys(currentEdit).length ==0
                 ? <FormattedMessage id="TableExample.title.create" />
                 : <FormattedMessage id="TableExample.title.edit" />
                 ,
        visible: modalVisible,
        footer: null,
        onCancel: handleCancel
     }

    return (
        <Modal {...opt}>
            <Form {...formItemLayout} form={form} onFinish={handleSubmit}>
                <Form.Item label="id" name="id" style={{display: 'none'}}>
                    <Input />
                </Form.Item>
                <Form.Item 
                    label={<FormattedMessage id="TableExample.columns.name" />}
                    name="name" 
                    rules={[{
                        required: true,
                        message: 'Please input your name',
                    }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label={<FormattedMessage id="TableExample.columns.username" />} name="username">
                    <Input />
                </Form.Item>
                <Form.Item label={<FormattedMessage id="TableExample.columns.website" />} name="website">
                    <Input />
                </Form.Item>
                <Form.Item label={<FormattedMessage id="TableExample.columns.phone" />} name="phone">
                    <Input />
                </Form.Item>
                <Form.Item label={<FormattedMessage id="TableExample.columns.address" />} name="address">
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>                          
                    <Button 
                        style={{marginRight: 10}}
                        onClick={handleCancel}
                    > 
                        <FormattedMessage id="TableExample.title.cancel" />
                    </Button>
                    <Button type="primary" htmlType="submit"> 
                        <FormattedMessage id="TableExample.title.submit" />
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default TableModalWithHooks;