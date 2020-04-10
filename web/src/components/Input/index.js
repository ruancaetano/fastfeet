import React from 'react';
import { Input as InputUnform } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Input({ label, name, ...rest }) {
  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <InputUnform name={name} {...rest} />
    </Container>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

Input.defaultProps = {
  label: '',
};
