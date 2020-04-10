import React from 'react';
import { MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ModalProblem({ isOpen, problem, onClose }) {
  return (
    <Container isOpen={isOpen}>
      {problem && (
        <div>
          <MdClose size={20} color="#444444" onClick={onClose} />
          <h1>VISUALIZAR PROBLEMAS</h1>
          <p>{problem.description}</p>
        </div>
      )}
    </Container>
  );
}
ModalProblem.propTypes = {
  isOpen: PropTypes.bool,
};

ModalProblem.defaultProps = {
  isOpen: false,
};
