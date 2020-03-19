import React from 'react';
import * as styles from './table.module.scss';
import classnames from 'classnames';
import Table from './Table';
import Pagination from 'components/Pagination';
import { map, isString, get } from 'lodash';
import { I18n } from 'react-redux-i18n';

const WrapperTable = ({
  pagination,
  showPagination = true,
  columns = [],
  useTranslate = true,
  ellipsis = true,
  ...props
}) => {
  return (
    <div className={styles.wrapper}>
      <Table
        className={classnames({ [styles.without_pagination]: !showPagination })}
        columns={map(columns, col => ({
          ...col,
          ellipsis: get(col, 'ellipsis', ellipsis),
          title:
            useTranslate && isString(col.title) ? I18n.t(col.title) : col.title
        }))}
        {...props}
      />
      {showPagination && <Pagination {...pagination} />}
    </div>
  );
};

export default WrapperTable;
