import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import DefaultLayout from '~/pages/_layouts/default';
import LoginLayout from '~/pages/_layouts/login';

export default function CustomRoute({
  path,
  isPrivate,
  component: Component,
  ...rest
}) {
  const isAuthenticated = useSelector(state => !!state.auth.token);

  if (isPrivate && isAuthenticated) {
    return (
      <DefaultLayout>
        <Route path={path} component={Component} {...rest} />
      </DefaultLayout>
    );
  }

  if (!isPrivate && !isAuthenticated) {
    return (
      <LoginLayout>
        <Route path={path} component={Component} {...rest} />
      </LoginLayout>
    );
  }

  if (isPrivate && !isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (!isPrivate && isAuthenticated) {
    return <Redirect to="/orders" />;
  }
}

CustomRoute.propTypes = {
  isPrivate: PropTypes.bool,
  path: PropTypes.string.isRequired,
  component: PropTypes.PropTypes.func.isRequired,
};

CustomRoute.defaultProps = {
  isPrivate: false,
};
