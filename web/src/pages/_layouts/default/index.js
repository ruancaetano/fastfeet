import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import { Wrapper, Content } from './styles';

export default function Default({ children }) {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
}

Default.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
