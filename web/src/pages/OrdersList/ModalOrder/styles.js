import styled from 'styled-components';

export const Container = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);

  position: fixed;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  & > div {
    width: 450px;
    max-width: 100%;
    background: #fff;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7);

    svg {
      float: right;
      cursor: pointer;

      &:hover {
        opacity: 0.5;
      }
    }

    h1 {
      color: #444444;
      font-size: 16px;
      margin: 10px 0;
    }

    p,
    strong {
      color: #666666;
      margin: 5px 0;
      font-size: 14px;
    }

    img {
      max-width: 100%;
      margin: 5px auto;
    }
  }
`;
