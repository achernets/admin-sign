import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from 'components/Table';
import { Checkbox, notification } from 'antd';
import { getData, createOrUpdate, remove } from 'redux/actions/systemUsers';
import { TABLE_SIZE } from 'constants/table';
import moment from 'moment';
import { uniqueId } from 'lodash';
import { DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import { I18n } from 'react-redux-i18n';
import { showModal } from 'react-redux-modal-provider';
import { MrkAlmexSysUserModal } from 'components/Modals';
const Content = ({ data, count, page = 1, loading, getData, createOrUpdate, remove }) => {

  useEffect(() => {
    getData();
  }, []);

  const CellChecked = checked => <Checkbox checked={checked} onChange={() => { }} />;

  return <Table
    dataSource={data}
    count={count}
    loading={loading}
    rowKey={() => uniqueId('rowKey_')}
    pagination={{
      defaultPageSize: TABLE_SIZE,
      total: count,
      current: page,
      onChange: getData
    }}
    onRow={(record) => {
      const key = uniqueId('notification_');
      return {
        onClick: () => record.deleteDate !== -1 ? notification.info({
          key: key,
          duration: 3,
          message: I18n.t('notification.info'),
          description: I18n.t('notification.MrkAlmexSysUser_removed', { name: record.login })
        }) : showModal(MrkAlmexSysUserModal, {
          entity: record,
          onOk: createOrUpdate
        })
      };
    }}
    columns={[
      {
        title: I18n.t('MrkAlmexSysUser.login'),
        dataIndex: 'login',
        key: 'login'
      },
      {
        title: I18n.t('MrkAlmexSysUser.createDate'),
        dataIndex: 'createDate',
        align: 'center',
        width: 120,
        render: date => moment(date).format('DD.MM.YYYY')
      },
      {
        title: I18n.t('MrkAlmexSysUser.contragent'),
        dataIndex: 'contragent',
        align: 'center',
        width: 100,
        render: CellChecked
      },
      {
        title: I18n.t('MrkAlmexSysUser.confirmed'),
        dataIndex: 'confirmed',
        align: 'center',
        width: 140,
        render: CellChecked
      },
      {
        title: () => <UserAddOutlined style={{ cursor: 'pointer' }} />,
        dataIndex: 'deleteDate',
        align: 'center',
        width: 40,
        onHeaderCell: () => {
          return {
            onClick: () => showModal(MrkAlmexSysUserModal, {
              entity: new MrkAlmexSysUser({
                login: 'Broker_',
                contragent: true,
                confirmed: true
              }),
              onOk: createOrUpdate
            })
          };
        },
        onCell: (record) => {
          return {
            onClick: e => {
              e.stopPropagation();
              remove(record.id);
            }
          };
        },
        render: (deleteDate) => deleteDate === -1 ? <DeleteOutlined style={{ cursor: 'pointer' }} /> : null
      }
    ]}
  />;
};

const mapStateToProps = state => ({
  loading: state.systemUsers.isFetching,
  data: state.systemUsers.data,
  count: state.systemUsers.count,
  page: state.systemUsers.page
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getData,
      createOrUpdate,
      remove
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Content);


