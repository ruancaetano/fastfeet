import React, { useEffect, useState, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import addPhoto from '~/assets/addPhoto.png';
import api from '~/services/api';

import { Container, Content } from './styles';

export default function FileInput({ name, ...rest }) {
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [preview, setPreview] = useState(defaultValue && defaultValue.path);
  const [file, setFile] = useState(defaultValue && defaultValue.id);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, name, registerField]);

  async function handleChange(event) {
    const data = new FormData();

    data.append('file', event.target.files[0]);

    const response = await api.post('/files', data);

    const { id, path } = response.data;

    setFile(id);
    setPreview(path);
  }

  return (
    <Container>
      <Content htmlFor={name}>
        {preview && <img src={preview} alt="Preview" />}
        {!preview && (
          <div>
            <img src={addPhoto} alt="add user avatar" />
            <p>Adicionar foto</p>
          </div>
        )}
        <input
          type="file"
          ref={ref}
          data-file={file}
          onChange={handleChange}
          name={name}
          id={name}
          {...rest}
        />
      </Content>
      <span>{error && 'Campo obrigatório'}</span>
    </Container>
  );
}

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
};
