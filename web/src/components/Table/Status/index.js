import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

// 0 - PENDENTE, 1 - RETIRADA, 2 - ENTREGUE, 3 - CANCELADA
const colors = ['#F0F0DF', '#BAD2FF', '#DFF0DF', '#FAB0B0'];
const texts = ['PENDENTE', 'RETIRADA', 'ENTREGUE', 'CANCELADA'];

export default function Status({ type }) {
  const [statusText, setStatusText] = useState('');
  const [color, setColor] = useState('#fff');

  useEffect(() => {
    setStatusText(texts[type]);
    setColor(colors[type]);
  }, [type]);

  return <Container color={color}>{statusText}</Container>;
}

Status.propTypes = {
  type: PropTypes.oneOf([0, 1, 2, 3]).isRequired,
};
