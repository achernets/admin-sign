import React from 'react';
import { notification, Modal } from 'antd';
import { uniqueId } from 'lodash';
import store from 'redux/store';
import { I18n } from 'react-redux-i18n';

export const log = (...props) => {
  /* eslint-disable-next-line */
  if (process.env.NODE_ENV === 'development' || window.showLogs) console.log(...props);
};

export const PUBLIC_URL = process.env.PUBLIC_URL;

export const getLocaleCode = (locale) => {
  switch (locale) {
    case 'en':
      return import('antd/lib/locale/en_US');
    case 'ru':
      return import('antd/lib/locale/ru_RU');
    case 'uk':
      return import('antd/lib/locale/uk_UA');
    default:
      return import('antd/lib/locale/en_US');
  }
};

export const getAntdLocale = () => {
  const state = store.getState();
  const { locale, translations } = state.i18n;
  return translations[locale].antd;
};

export const confirmationAction = (fn, title, desc) => {
  Modal.confirm({
    title: title || I18n.t('confirmation.title'),
    content: desc || null,
    okText: I18n.t('confirmation.okText'),
    okType: 'danger',
    cancelText: I18n.t('common.cancel'),
    onOk: () => fn()
  });
};

export const notificationError = (error, key = uniqueId('notification_')) => {
  if (error.preconditionExceptionKey) notification.error({
    key,
    message: error.preconditionExceptionKey,
    description: <>
      {error.message}
    </>
  });
  log(key, error);
};