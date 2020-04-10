import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Name } from './styles';

const colors = [
  '#F4EFFC',
  '#FCF4EE',
  '#EBFBFA',
  '#FFEEF1',
  '#F4F9EF',
  '#FCFCEF',
];

export default function Avatar({ src, userName }) {
  const [acronyms, setAcronyms] = useState('');
  const [color, setColor] = useState('#fff');

  function nameLetters(name) {
    if (!name) return '!!';
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2);
  }

  useEffect(() => {
    if (!src) {
      setAcronyms(nameLetters(userName));
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setColor(randomColor);
    }
  }, [src, userName]);

  return (
    <Container>
      {src ? (
        <img src={src} alt={userName} />
      ) : (
        <Name color={color}>{acronyms}</Name>
      )}
    </Container>
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  userName: PropTypes.string,
};

Avatar.defaultProps = {
  src: '',
  userName: '',
};
