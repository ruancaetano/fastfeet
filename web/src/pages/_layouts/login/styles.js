import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #7d40e7;
  min-height: 100vh;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background: #fff;
  width: 360px;
  max-width: 100%;
  border-radius: 4px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin: 15px 0;
  }
  form {
    width: 100%;
    margin: 15px;
  }
`;
