import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  span {
    color: red;
    font-size: 14px;
  }
`;

export const Content = styled.label`
  width: 150px;
  height: 150px;
  border: 1px #ccc dashed;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  margin: auto;

  & > img {
    width: 100%;
    height: 100%;
  }
  input[type='file'] {
    display: none;
  }
`;
