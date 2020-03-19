import React, { useState, useEffect, useRef } from 'react';
import { Modal, Checkbox, Form } from 'antd';
import { I18n } from 'react-redux-i18n';
import { merge } from 'lodash';
import Loader from 'components/Loader';
import { getToken, notificationError } from 'utils/helpers';
import { MrkAdminServiceClient } from 'api';

const MrkAlmexSysUserModal = ({ show, hideModal, id, onOk }) => {
  const componentIsMounted = useRef(true);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const result = await MrkAdminServiceClient.getDetailAccountInfo(getToken(), id);
        if (componentIsMounted.current) {
          form.setFieldsValue(result);
          setAccount(setAccount);
          setLoading(false);
        }
      } catch (error) {
        notificationError(error, 'getDetailAccountInfo');
        if (componentIsMounted.current) setLoading(false);
        hideModal();
      }
    };
    getData();
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

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
        setSaving(true);
        const values = await form.validateFields();
        const result = await onOk(merge(account, values));
        if (result) hideModal();
        setSaving(false);
      } catch (error) {
        //console.log('Validate Failed:', error);
        setSaving(false);
      }
    }}
    okButtonProps={{
      loading: saving
    }}
    onCancel={hideModal}
  >
    {loading && <Loader />}
    <Form
      form={form}
      name={I18n.t('Modals.MrkAlmexSysUser')}
      {...formItemLayout}
    >
      <Form.Item
        name="contragent"
        label={I18n.t('MrkAccount.contragent')}
        valuePropName="checked"
        labelAlign="left"
      >
        <Checkbox />
      </Form.Item>
      <Form.Item
        name="confirmed"
        label={I18n.t('MrkAccount.confirmed')}
        valuePropName="checked"
        labelAlign="left"
      >
        <Checkbox />
      </Form.Item>
      <Form.Item
        name="blocked"
        label={I18n.t('MrkAccount.blocked')}
        valuePropName="checked"
        labelAlign="left"
      >
        <Checkbox />
      </Form.Item>
    </Form>
  </Modal>;
};

export default MrkAlmexSysUserModal;