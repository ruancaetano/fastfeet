import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: inline-block;
  padding: 0;
  margin: 0;
  vertical-align: middle;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #ddd;
  }
`;

export const Name = styled.p`
  height: 35px;
  width: 35px;
  font-size: 14px;
  border-radius: 50%;
  background: ${({ color }) => color};
  color: ${({ color }) => darken(0.5, color)};
  line-height: 35px;
  text-transform: uppercase;
`;
