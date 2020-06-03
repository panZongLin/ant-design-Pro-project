import React, { Component } from 'react';
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


class TableModal extends Component {
    formRef = React.createRef();
    
    // 旧版
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     let nc = nextProps.currentEdit;
    //     if(nc !==this.props.currentEdit && Object.keys(nc).length !==0) {
    //         setTimeout(() => {
    //             this.props.form.setFieldsValue(nc);
    //         }, 1000);
    //     }
    // }

    componentDidUpdate(prevProps, prevState) {
        let nc = this.props.currentEdit;
        if(nc !==prevProps.currentEdit && Object.keys(nc).length !==0) {
            setTimeout(() => {
                this.formRef.current.setFieldsValue(nc)
            }, 1000);
        } 
    }

    handleSubmit=(values)=> {
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
        this.formRef.current.resetFields();
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
           title: Object.keys(currentEdit).length ==0? 'create' : 'edit',
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
                        label="name" 
                        name="name" 
                        rules={[{
                            required: true,
                            message: 'Please input your name',
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    {/**当表单的 Form.Item和 Input在同一行时标签之间不能有空格 ， 这是什么情况??*/}
                    <Form.Item label="username" name="username"><Input /></Form.Item>
                    <Form.Item label="website" name="website"><Input /></Form.Item>
                    <Form.Item label="phone" name="phone"><Input /></Form.Item>
                    <Form.Item label="address" name="address"><Input /></Form.Item>
                    <Form.Item {...tailLayout}>                          
                        <Button 
                            type="" 
                            style={{marginRight: 10}}
                            onClick={this.handleCancel}
                        > Cancel </Button>
                        <Button type="primary" htmlType="submit"> Submit </Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default TableModal;