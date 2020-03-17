import React from 'react';
import { Form, Input, Button } from 'antd';
import { I18n } from 'react-redux-i18n';
import { login } from 'redux/actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as styles from '../../signin.module.scss';
const FormData = ({ login, token, isFetching }) => {
  const size = 'large';
  if (token !== null) return <Redirect
    to={{
      pathname: '/'
    }}
  />;
  return <Form
    className={styles.form}
    name="login"
    initialValues={{
      login: '',
      password: ''
    }}
    onFinish={(values) => login(values)}
  >
    <Form.Item
      name="login"
      rules={[{ required: true }]}
    >
      <Input
        prefix={<UserOutlined className={styles.icon} />}
        placeholder={I18n.t('SignIn.login')}
        size={size}
      />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[{ required: true }]}
    >
      <Input
        prefix={<LockOutlined className={styles.icon} />}
        type="password"
        placeholder={I18n.t('SignIn.password')}
        size={size}
      />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" loading={isFetching} block={true} size={size}>
        {I18n.t('SignIn.sign_in')}
      </Button>
    </Form.Item>
  </Form>;
};

const mapStateToProps = state => ({
  token: state.auth.token,
  locale: state.i18n.locale,
  isFetching: state.auth.isFetching
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(FormData);