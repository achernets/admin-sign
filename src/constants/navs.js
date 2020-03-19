import React from 'react';
import SystemUsers from 'pages/SystemUsers';
import Accounts from 'pages/Accounts';
import { UserSwitchOutlined, AccountBookOutlined } from '@ant-design/icons';
export const ROUTING = [
  {
    label: 'navigations.accounts',
    link: '/accounts',
    icon: <AccountBookOutlined />,
    role: [],
    component: Accounts
  },
  {
    label: 'navigations.systemUsers',
    link: '/systemUsers',
    icon: <UserSwitchOutlined />,
    role: [],
    component: SystemUsers
  }
];
