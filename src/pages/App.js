import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ModalProvider from 'react-redux-modal-provider';
import SignIn from 'pages/SignIn';
import Loader from 'components/Loader';
import { LayoutApp } from 'components/LayoutApp';
import PrivateRoute from 'components/PrivateRoute';
import { get } from 'lodash';
import { getAntdLocale } from 'utils/helpers';
import { ROUTING } from 'constants/navs';

const App = ({ loading, translations, locale }) => {

  const validateMessages = get(translations, `${locale}.form`, {});

  return (<>
    {loading ? <Loader /> :
      <ConfigProvider form={{ validateMessages }} locale={getAntdLocale()}>
        <Switch>
          <Route path="/signIn" component={SignIn} />
          <LayoutApp>
            <Switch>
              {ROUTING.map(item => <PrivateRoute
                key={item.link}
                path={item.link}
                component={item.component}
                componentProps={item.props}
                role={item.role}
              />)}
              <Redirect to={get(ROUTING, '0.link', '/')} />
            </Switch>
          </LayoutApp>
          <Redirect to="/" />
        </Switch>
        {process.env.NODE_ENV !== 'development' && <ModalProvider />}
      </ConfigProvider>}
  </>
  );
};


const mapStateToProps = state => ({
  loading: state.asyncInitialState.loading,
  locale: state.i18n.locale,
  translations: state.i18n.translations,
  error: state.asyncInitialState.error
});

export default connect(mapStateToProps)(App);
