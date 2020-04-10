import React from 'react';
import PropTypes from 'prop-types';

import history from '~/services/history';
import { StyledButton } from './styles';

export default function Button({
  icon: Icon,
  greyButton,
  block,
  children,
  onClick,
  to,
  ...rest
}) {
  function handleOnClick() {
    if (to) {
      history.push(to);
    } else {
      onClick();
    }
  }
  return (
    <StyledButton
      block={block}
      greyButton={greyButton}
      onClick={handleOnClick}
      {...rest}
    >
      {Icon && <Icon size={20} color="#fff" />}
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  icon: PropTypes.func,
  to: PropTypes.string,
  greyButton: PropTypes.bool,
  block: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Button.defaultProps = {
  icon: null,
  block: false,
  greyButton: false,
  onClick: () => null,
  to: '',
};
