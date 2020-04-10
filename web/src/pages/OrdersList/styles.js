import styled from 'styled-components';

export const Container = styled.div`
  & > section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    input {
      width: 230px;
    }
  }
`;
