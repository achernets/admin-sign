import React, { useState, useEffect, useRef } from 'react';
import { Modal, Row, Col, Typography } from 'antd';
import { I18n } from 'react-redux-i18n';
import { map, get } from 'lodash';
import Loader from 'components/Loader';
import { getToken, notificationError, stringIsRequired } from 'utils/helpers';
import { MrkAdminServiceClient } from 'api';
import { Formik, FieldArray } from 'formik';
import { Form, FormItem, Input, Checkbox } from 'formik-antd';
import * as Yup from 'yup';
import { DatePicker } from 'components/Form';
import Scrollbar from 'components/Scrollbar';


const MrkAccountModal = ({ show, hideModal, id, onOk }) => {
  const componentIsMounted = useRef(true);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [account, setAccount] = useState(null);
  const form = useRef(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const result = await MrkAdminServiceClient.getDetailAccountInfo(getToken(), id);
        if (componentIsMounted.current) {
          setAccount(result);
          setLoading(false);
        }
      } catch (error) {
        notificationError(error, 'getDetailAccountInfo');
        if (componentIsMounted.current) setLoading(false);
        hideModal();
      }
    };
    getData();
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  return <Modal
    title={I18n.t('Modals.MrkAccount')}
    visible={show}
    width={720}
    centered
    bodyStyle={{
      height: 'calc(100vh - 180px)',
      padding: 0
    }}
    onOk={() => form.current.handleSubmit()}
    okButtonProps={{
      loading: saving
    }}
    onCancel={hideModal}
  >
    <Scrollbar >
      <div style={{
        padding: 24
      }}>
        {loading ?
          <Loader /> : <>
            <Formik
              innerRef={form}
              initialValues={account}
              validationSchema={Yup.object().shape({
                organization: Yup.object().shape({
                  name: stringIsRequired(),
                  edrpo: stringIsRequired(),
                  adress: stringIsRequired(),
                  regAdress: stringIsRequired(),
                }),
                clientList: Yup.array().of(Yup.object().shape({
                  login: stringIsRequired(),
                  firstName: stringIsRequired(),
                  lastName: stringIsRequired(),
                  middleName: stringIsRequired(),
                  position: stringIsRequired(),
                  inn: stringIsRequired(),
                }))
              })}
              onSubmit={async (values, ) => {
                try {
                  setSaving(true);
                  const result = await onOk(values);
                  if (result) hideModal();
                  setSaving(false);
                } catch (error) {
                  setSaving(false);
                }
              }}
            >
              {({ values, setValues }) => <Form {...formItemLayout}>
                {get(values, 'organization', null) !== null && <>
                  <Row gutter={[0, 16]}>
                    <Col>
                      <Typography.Text strong>Информация о Юр. Лице</Typography.Text>
                    </Col>
                  </Row>
                  <FormItem
                    name={'organization.name'}
                    label={I18n.t('MrkOrganization.name')}
                    labelAlign="left"
                    required
                  >
                    <Input name={'organization.name'} />
                  </FormItem>
                  <FormItem
                    name={'organization.edrpo'}
                    label={I18n.t('MrkOrganization.edrpo')}
                    labelAlign="left"
                    required
                  >
                    <Input name={'organization.edrpo'} />
                  </FormItem>
                  <FormItem
                    name={'organization.adress'}
                    label={I18n.t('MrkOrganization.adress')}
                    labelAlign="left"
                    required
                  >
                    <Input name={'organization.adress'} />
                  </FormItem>
                  <FormItem
                    name={'organization.regAdress'}
                    label={I18n.t('MrkOrganization.regAdress')}
                    labelAlign="left"
                    required
                  >
                    <Input name={'organization.regAdress'} />
                  </FormItem>
                </>}
                <FieldArray name="clientList">
                  {() => map(values.clientList, (_, index) => <div key={index}>
                    {get(values, 'organization', null) !== null && <Row gutter={[0, 16]}>
                      <Col>
                        <Typography.Text strong>Сотрудник {index + 1}</Typography.Text>
                      </Col>
                    </Row>}
                    <FormItem
                      name={`clientList.${index}.login`}
                      label={I18n.t('MrkClient.login')}
                      labelAlign="left"
                      required
                    >
                      <Input name={`clientList.${index}.login`} />
                    </FormItem>
                    <FormItem
                      name={`clientList.${index}.lastName`}
                      label={I18n.t('MrkClient.lastName')}
                      labelAlign="left"
                      required
                    >
                      <Input name={`clientList.${index}.lastName`} />
                    </FormItem>
                    <FormItem
                      name={`clientList.${index}.firstName`}
                      label={I18n.t('MrkClient.firstName')}
                      labelAlign="left"
                      required
                    >
                      <Input name={`clientList.${index}.firstName`} />
                    </FormItem>
                    <FormItem
                      name={`clientList.${index}.middleName`}
                      label={I18n.t('MrkClient.middleName')}
                      labelAlign="left"
                      required
                    >
                      <Input name={`clientList.${index}.middleName`} />
                    </FormItem>
                    <FormItem
                      name={`clientList.${index}.position`}
                      label={I18n.t('MrkClient.position')}
                      labelAlign="left"
                      required
                    >
                      <Input name={`clientList.${index}.position`} />
                    </FormItem>
                    <FormItem
                      name={`clientList.${index}.inn`}
                      label={I18n.t('MrkClient.inn')}
                      required
                      labelAlign="left"
                    >
                      <Input name={`clientList.${index}.inn`} />
                    </FormItem>
                    <FormItem
                      name={`clientList.${index}.birthDate`}
                      label={I18n.t('MrkClient.birthDate')}
                      labelAlign="left"
                    >
                      <DatePicker format={'DD.MM.YYYY'} name={`clientList.${index}.birthDate`} />
                    </FormItem>
                    {get(values, 'organization', null) !== null && <FormItem
                      name={`clientList.${index}.chief`}
                      label={I18n.t('MrkClient.chief')}
                      valuePropName="checked"
                      labelAlign="left"
                    >
                      <Checkbox
                        name={`clientList.${index}.chief`}
                        onChange={e => setValues({
                          ...values,
                          clientList: values.clientList.map((item, idx) => ({
                            ...item,
                            chief: e.target.checked ? index === idx : idx === 0
                          }))
                        })}
                      />
                    </FormItem>}
                  </div>)}
                </FieldArray>

                <FormItem
                  name="contragent"
                  label={I18n.t('MrkAccount.contragent')}
                  valuePropName="checked"
                  labelAlign="left"
                >
                  <Checkbox name="contragent" />
                </FormItem>
                <FormItem
                  name="confirmed"
                  label={I18n.t('MrkAccount.confirmed')}
                  valuePropName="checked"
                  labelAlign="left"
                >
                  <Checkbox name="confirmed" />
                </FormItem>
                <FormItem
                  name="blocked"
                  label={I18n.t('MrkAccount.blocked')}
                  valuePropName="checked"
                  labelAlign="left"
                >
                  <Checkbox name="blocked" />
                </FormItem>
              </Form>}
            </Formik>
          </>}
      </div>
    </Scrollbar>
  </Modal>;
};

export default MrkAccountModal;