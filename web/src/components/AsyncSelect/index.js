import React, { useRef, useEffect } from 'react';
import Select from 'react-select/async';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { Container } from './styles';

const AsyncSelect = ({ name, label, ...rest }) => {
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const selectRef = useRef(defaultValue);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(option => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <Select
        cacheOptions
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
      <span>{error && 'Campo obrigatório'}</span>
    </Container>
  );
};
export default AsyncSelect;

AsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

AsyncSelect.defaultProps = {
  label: '',
};
