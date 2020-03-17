import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from 'redux/actions/auth';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { I18n } from 'react-redux-i18n';
import { Menu, Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import * as styles from './index.module.scss';
import { ROUTING } from 'constants/navs';

const { Sider } = Layout;

const AppMenu = ({ logout, location }) => {
  const [collapsed, setCollapsed] = useState(true);
  return <Sider
    width={256}
    collapsible
    className={styles.sider}
    collapsed={collapsed}
    trigger={null}
  >
    <div className={styles.container}>
      <div>
        <Menu
          selectedKeys={null}
          mode="vertical"
          theme="dark"
        >
          <Menu.Item key="1" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            <span>{I18n.t(collapsed ? 'navigations.open' : 'navigations.hide')}</span>
          </Menu.Item>
        </Menu>
      </div>
      <div>
        <Menu
          selectedKeys={[location.pathname]}
          mode="vertical"
          theme="dark"
        >
          {ROUTING.map(nav => <Menu.Item key={nav.link}>
            <NavLink exact to={nav.link}>
              {nav.icon}
              <span>{I18n.t(nav.label)}</span>
            </NavLink>
          </Menu.Item>)}
        </Menu>
      </div>
      <div>
        <Menu
          selectedKeys={null}
          mode="vertical"
          theme="dark"
        >
          <Menu.Item key="1" onClick={() => logout()}>
            <LogoutOutlined />
            <span>{I18n.t('navigations.logout')}</span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  </Sider>;
};

const mapStateToProps = state => ({
  user: state.auth.user,
  location: state.router.location
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);