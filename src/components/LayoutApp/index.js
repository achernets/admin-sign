import React from 'react';
import { Layout } from 'antd';
import classnames from 'classnames';
import AppMenu from 'components/AppMenu';
import * as styles from './layout-app.module.scss';
const { Content } = Layout;

const LayoutApp = ({ children }) => <Layout className={styles.layuot_app}>
  <AppMenu />
  {children}
</Layout>;

const SubLayout = ({ children }) => <Layout className={styles.layuot_sub}>
  <Content className={styles.content}>
    {children}
  </Content>
</Layout>;

const Header = ({ children, className }) => <Layout.Header className={classnames(className, styles.header)}>{children}</Layout.Header>;

const HeaderLogo = ({ children, className }) =>
  <Layout.Header className={classnames(className, styles.header)}>
    {children}
  </Layout.Header>;

export {
  LayoutApp,
  SubLayout,
  Header,
  HeaderLogo
};