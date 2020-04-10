import styled from 'styled-components';

export const Container = styled.div`
  margin: 15px 0;
  label {
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    color: #444;
  }

  input {
    display: block;
    width: 100%;
    border: 1px solid #ddd;
    height: 45px;
    border-radius: 4px;
    margin-top: 5px;
    padding: 5px;
    font-size: 15px;
  }

  span {
    color: red;
    font-size: 14px;
  }
`;
