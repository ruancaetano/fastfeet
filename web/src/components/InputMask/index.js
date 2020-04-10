import React, { useRef, useEffect } from 'react';
import ReactInputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';

import { Container } from './styles';

const InputMask = ({ name, label, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.setInputValue('');
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <ReactInputMask
        ref={inputRef}
        defaultValue={defaultValue}
        name={name}
        {...rest}
      />
      <span>{error}</span>
    </Container>
  );
};
export default InputMask;

InputMask.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

InputMask.defaultProps = {
  label: '',
};
