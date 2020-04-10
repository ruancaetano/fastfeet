import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.p`
  width: 150px;
  margin: auto;
  padding: 3px;
  border-radius: 30px;
  font-weight: bold;
  font-size: 13px;
  background: ${({ color }) => color};
  color: ${({ color }) => darken(0.5, color)};

  text-align: center;

  &::before {
    display: inline-block;
    content: '';
    -webkit-border-radius: 0.25rem;
    border-radius: 0.25rem;
    height: 0.5rem;
    width: 0.5rem;
    margin-right: 0.5rem;
    background-color: ${({ color }) => darken(0.5, color)};
  }
`;
