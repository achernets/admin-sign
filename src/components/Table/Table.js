import React from 'react';
import { Table as ATable } from 'antd';
import Empty from 'components/Empty';
import { isEmpty } from 'lodash';
import classnames from 'classnames';
import * as styles from './table.module.scss';
import Scrollbar from 'components/Scrollbar';
const Table = ({
  loading = false,
  size = 'middle',
  tableLayout = 'fixed',
  bordered = true,
  columns = [],
  dataSource = [],
  rowKey = record => record.id,
  locale = {},
  pagination = {},
  ellipsis = true,
  className,
  components,
  ref,
  ...props
}) => {
  const { emptyText } = locale;

  return (
    <div className={classnames(styles.table, className)}>
      <ATable
        tableLayout={tableLayout}
        bordered={bordered}
        size={size}
        loading={loading}
        locale={{
          ...locale,
          emptyText: isEmpty(emptyText) ? <Empty /> : emptyText
        }}
        pagination={false}
        scroll={{ y: '100%', x: true }}
        columns={columns}
        rowKey={rowKey}
        hasData={dataSource.length === 0}
        dataSource={dataSource}
        components={{
          ...components,
          table: ({ children, ...props }) => {
            return (
              <Scrollbar>
                <table {...props}>{children}</table>
              </Scrollbar>
            );
          }
        }}
        {...props}
      />
    </div>
  );
};

export default Table;
