import styled from 'styled-components';
import { darken } from 'polished';

export const StyledButton = styled.button`
  width: ${({ block }) => (block ? '100%' : 'auto')};
  padding: 5px 15px;
  margin: 10px 0;
  background: ${({ greyButton }) => (greyButton ? '#ccc' : '#7d40e7')};
  border: none;
  color: #fff;
  height: 45px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;

  text-align: center;

  &:hover {
    background: ${({ greyButton }) =>
      greyButton ? darken(0.1, '#ccc') : darken(0.1, '#7d40e7')};
  }

  svg {
    margin-right: 3px;
    vertical-align: middle;
  }
`;
