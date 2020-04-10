import styled from 'styled-components';

export const Container = styled.div`
  form {
    & > section {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      aside {
        display: flex;
        flex-direction: row;

        button {
          margin-left: 5px;
        }
      }
    }

    & > main {
      background: #fff;
      padding: 20px;
      border-radius: 4px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

      & > section {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
      }
    }
  }
`;
