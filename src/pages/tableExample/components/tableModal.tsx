import React, { Component } from 'react';
import { Dispatch, FormattedMessage } from 'umi';
import {
    Modal,
    Form,
    Input,
    Button
} from 'antd';
import { FormInstance } from 'antd/lib/form';

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

class TableModal extends Component<TableModalType> {
    formRef = React.createRef<FormInstance>();
    
    // 旧版
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     let nc = nextProps.currentEdit;
    //     if(nc !==this.props.currentEdit && Object.keys(nc).length !==0) {
    //         setTimeout(() => {
    //             this.props.form.setFieldsValue(nc);
    //         }, 1000);
    //     }
    // }
    componentDidUpdate(prevProps: TableModalType, prevState: TableModalType) {
        let nc = this.props.currentEdit;
        if(nc !==prevProps.currentEdit && Object.keys(nc).length !==0) {
            setTimeout(() => {
                let node = this.formRef.current;
                if(node) {
                    node.setFieldsValue(nc)
                }
            }, 0);
        } 
    }

    handleSubmit=(values: { [key: string]: any })=> {
        const { dispatch }  = this.props;
        this.handleCancel();

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

    // 旧版
    // reset = () => {
    //     const fields = this.props.form.getFieldsValue();
    //     for (const item in fields) {
    //       if ({}.hasOwnProperty.call(fields, item)) {
    //         if (fields[item] instanceof Array) {
    //           fields[item] = [];
    //         } else {
    //           fields[item] = undefined;
    //         }
    //       }
    //     }
    //     this.props.form.setFieldsValue(fields);
    // }
    reset=()=> {
        let node = this.formRef.current;
        if(node) {
            node.resetFields()
        }
    }
    
    handleCancel=()=> {
        const { dispatch }  = this.props;
        this.reset();
        dispatch({
            type: 'tableExample/updataState',
            payload: {modalVisible: false, currentEdit: {}}
        })
    }

    render() {
        const {modalVisible, currentEdit} = this.props;

        const opt = {
           title: Object.keys(currentEdit).length ==0
                    ? <FormattedMessage id="TableExample.title.create" />
                    : <FormattedMessage id="TableExample.title.edit" />
                    ,
           visible: modalVisible,
           footer: null,
        //  onOk: this.handleSubmit,
            onCancel: this.handleCancel
        }

        return (
            <Modal {...opt}>
                <Form {...formItemLayout} ref={this.formRef} onFinish={this.handleSubmit}>
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
                            onClick={this.handleCancel}
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
}

export default TableModal;