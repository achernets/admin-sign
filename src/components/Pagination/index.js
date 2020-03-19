import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Typography, Pagination as APagination } from 'antd';
import { I18n } from 'react-redux-i18n';

const Pagination = ({
  total = 0,
  current = 1,
  onChange,
  defaultPageSize = 25,
  ...props
}) => (
    <Row
      style={{
        height: 32,
        padding: '0 18px',
        fontSize: 12,
        borderLeft: '1px solid #f0f0f0',
        borderTop: '1px solid #f0f0f0'
      }}
      type="flex"
      align="middle"
      justify="space-between"
    >
      <Col span={12}>
        <Typography.Text strong={true}>
          {`${I18n.t('common.find_total')}: ${total}`}
        </Typography.Text>
      </Col>
      <Col span={12}>
        <Row type="flex" justify="end" align="middle">
          <APagination
            simple
            size="small"
            current={current}
            total={total}
            onChange={onChange}
            pageSize={defaultPageSize}
            defaultPageSize={defaultPageSize}
            {...props}
          />
        </Row>
      </Col>
    </Row>
  );

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultPageSize: PropTypes.number
};
export default Pagination;
