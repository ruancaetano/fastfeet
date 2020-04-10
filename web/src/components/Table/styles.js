import styled from 'styled-components';

export const Container = styled.div`
  table {
    border-collapse: separate;
    border-spacing: 0 15px;
    width: 100%;

    th {
      text-align: center;
      color: #444;
      font-weight: bold;
      font-size: 16px;
    }

    tbody {
      tr {
        background: #fff;
        margin: 10px 0;
        height: 60px;
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);

        td {
          text-align: center;
          color: #666666;
        }
      }
    }
  }

  & > ul {
    list-style-type: none;
    padding-left: 15px;
    padding-right: 15px;
    display: block;
    text-align: center;
    color: #a3a3a3;
    font-size: 17px;

    .table-pagination-active {
      color: #8146e7;
      font-weight: bold;
    }

    li {
      display: inline-block;
      margin: 0 10px;
      cursor: pointer;

      &:first-child,
      &:last-child {
        font-weight: bold;
      }
    }
  }
`;
