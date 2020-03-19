import React, { useState } from 'react';
import { Modal, Checkbox, Input, Form } from 'antd';
import { I18n } from 'react-redux-i18n';
import { get, merge } from 'lodash';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const MrkAlmexSysUserModal = ({ show, hideModal, entity, onOk }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  return <Modal
    title="MrkAlmexSysUser"
    visible={show}
    onOk={async () => {
      try {
        setLoading(true);
        const values = await form.validateFields();
        const result = await onOk(merge(entity, values));
        if (result) hideModal();
        setLoading(false);
      } catch (error) {
        //console.log('Validate Failed:', error);
        setLoading(false);
      }
    }}
    okButtonProps={{
      loading: loading
    }}
    onCancel={hideModal}
  >
    <Form
      form={form}
      name={I18n.t('Modals.MrkAlmexSysUser')}
      {...formItemLayout}
      initialValues={{
        ...entity,
        password: null
      }}
    >
      <Form.Item
        name="login"
        label={I18n.t('MrkAlmexSysUser.login')}
        labelAlign="left"
        rules={[{ required: true }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder={I18n.t('MrkAlmexSysUser.login')}
        />
      </Form.Item>
      {get(entity, 'id', null) === null && <Form.Item
        name="password"
        label={I18n.t('SignIn.password')}
        labelAlign="left"
        rules={[{ required: true }]}
      >
        <Input
          type="password"
          prefix={<LockOutlined />}
          placeholder={I18n.t('SignIn.password')}
        />
      </Form.Item>}
      <Form.Item
        name="contragent"
        label={I18n.t('MrkAlmexSysUser.contragent')}
        valuePropName="checked"
        labelAlign="left"
      >
        <Checkbox />
      </Form.Item>
      <Form.Item
        name="confirmed"
        label={I18n.t('MrkAlmexSysUser.confirmed')}
        valuePropName="checked"
        labelAlign="left"
      >
        <Checkbox />
      </Form.Item>
    </Form>
  </Modal>;
};

export default MrkAlmexSysUserModal;