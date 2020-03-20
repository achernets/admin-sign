import React from 'react';
import moment from 'moment';
import { DatePicker } from 'formik-antd';
import { isDate } from 'utils/helpers';
import { useField } from 'formik';

const DatePickerCustom = (props) => {
  const [field, , helpers] = useField(props);
  return <DatePicker
    name={field.name}
    {...props}
    value={isDate(field.value) ? moment(field.value) : null}
    onChange={e => helpers.setValue(e === null ? null : e.valueOf())}
  />;
};

export default DatePickerCustom;