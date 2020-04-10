import React from 'react';
import ReactPaginate from 'react-paginate';

import Avatar from './Avatar';
import Status from './Status';
import Actions from './Actions';
import { Container } from './styles';

export default function Table({
  headers = [],
  data = [],
  onPageChange,
  totalPages,
}) {
  function renderItem({ type, value }) {
    switch (type) {
      case 'text':
        return <td>{value}</td>;
      case 'user':
        return (
          <td>
            <Avatar src={value.avatar} userName={value.name} /> {value.name}
          </td>
        );
      case 'status':
        return (
          <td>
            <Status type={value} />
          </td>
        );
      case 'avatar':
        return (
          <td>
            <Avatar src={value} />
          </td>
        );
      case 'actions':
        return (
          <td>
            <Actions itemId={value.id} {...value} />
          </td>
        );
      default:
        return <td />;
    }
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            {headers.map(item => (
              <th key={item} id={item}>
                {item}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map(line => (
            <tr>{line.map(item => renderItem(item))}</tr>
          ))}
        </tbody>
      </table>

      {data && data.length > 0 && totalPages && (
        <ReactPaginate
          pageCount={totalPages}
          previousLabel="Anterior"
          nextLabel="Próximo"
          breakLabel="..."
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={({ selected }) => {
            onPageChange(selected + 1);
          }}
          breakClassName="table-pagination-break"
          containerClassName="table-pagination-container"
          subContainerClassName="table-pagination-content"
          activeClassName="table-pagination-active"
        />
      )}
    </Container>
  );
}
