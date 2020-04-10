import styled from 'styled-components';

export const Container = styled.div`
  & > button {
    background: none;
    border: none;
  }
`;

export const DropDown = styled.ul`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  padding: 5px 15px;
  background: #fff;
  border: 1px solid #eeeeee;
  border-radius: 5px;

  li {
    padding: 7px 0;

    &:hover {
      opacity: 0.7;
    }
  }

  li + li {
    border-top: 1px solid #eeeeee;
  }

  button {
    background: none;
    border: none;

    display: flex;
    align-items: center;
    font-size: 15px;

    svg {
      margin-right: 5px;
    }
  }
`;
