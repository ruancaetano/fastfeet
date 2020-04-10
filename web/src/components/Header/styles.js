import styled from 'styled-components';

export const Container = styled.header`
  height: 64px;
  background: #fff;
  padding: 5px 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  main {
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: 135px;
      padding-right: 10px;
      border-right: 1px solid #979797;
    }

    ul {
      padding-left: 15px;
      list-style-type: none;
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    p {
      font-size: 14px;
      color: #666666;
      font-weight: bold;
      text-align: right;
    }

    button {
      background: none;
      border: none;
      color: #de3b3b;
      text-align: right;
    }
  }
`;

export const MenuItem = styled.li`
  display: inline-block;
  margin-right: 5px;
  font-size: 15px;
  padding: 0 5px;

  a {
    text-decoration: none;
    color: #666666;
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  }
`;
