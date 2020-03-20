import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from 'components/Table';
import { Checkbox } from 'antd';
import { getData, createOrUpdate } from 'redux/actions/accounts';
import { TABLE_SIZE } from 'constants/table';
import { I18n } from 'react-redux-i18n';
import { uniqueId } from 'lodash';
import { showModal } from 'react-redux-modal-provider';
import { MrkAccountModal } from 'components/Modals';

const Content = ({ data, count, page = 1, loading, getData, createOrUpdate }) => {

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
      return {
        onClick: () => showModal(MrkAccountModal, {
          id: record.accountId,
          onOk: createOrUpdate
        })
      };
    }}
    columns={[
      {
        title: I18n.t('MrkAggregateAccountInfo.name'),
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: I18n.t('MrkAggregateAccountInfo.code'),
        dataIndex: 'code',
        key: 'code',
        width: 150,
      },
      {
        title: I18n.t('MrkAggregateAccountInfo.ogranisation'),
        dataIndex: 'ogranisation',
        align: 'center',
        width: 120,
        render: CellChecked
      },
      {
        title: I18n.t('MrkAggregateAccountInfo.contragent'),
        dataIndex: 'contragent',
        align: 'center',
        width: 120,
        render: CellChecked
      },
      {
        title: I18n.t('MrkAggregateAccountInfo.signed'),
        dataIndex: 'signed',
        align: 'center',
        width: 120,
        render: CellChecked
      },
      {
        title: I18n.t('MrkAggregateAccountInfo.blocked'),
        dataIndex: 'blocked',
        align: 'center',
        width: 130,
        render: CellChecked
      },
      {
        title: I18n.t('MrkAggregateAccountInfo.confirmed'),
        dataIndex: 'confirmed',
        align: 'center',
        width: 140,
        render: CellChecked
      },
    ]}
  />;
};

const mapStateToProps = state => ({
  loading: state.accounts.isFetching,
  data: state.accounts.data,
  count: state.accounts.count,
  page: state.accounts.page
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getData,
      createOrUpdate
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Content);


