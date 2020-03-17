import React from 'react';
import { notification } from 'antd';
import { uniqueId } from 'lodash';
import store from 'redux/store';

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