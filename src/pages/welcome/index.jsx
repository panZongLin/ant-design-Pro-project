import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch, FormattedMessage, formatMessage } from 'umi';
import { Card, Typography, Alert } from 'antd';
import styles from './index.less'; 


export default () => (
  <PageHeaderWrapper>
    <Card>
      <Alert
        message={<FormattedMessage id="Welcome.Alert.message" />}
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
    </Card>
  </PageHeaderWrapper>
);
