import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';

export default function Login({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

Login.propTypes = {
  children: PropTypes.oneOf([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
    .isRequired,
};
