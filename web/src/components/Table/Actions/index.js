import React, { useState } from 'react';
import { MdMoreHoriz, MdRemoveRedEye, MdEdit, MdDelete } from 'react-icons/md';

import { Container, DropDown } from './styles';

export default function Actions({
  itemId,
  onView,
  onEdit,
  onDelete,
  viewActionText,
  editActionText,
  deleteActionText,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container isOpen={isOpen}>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        <MdMoreHoriz size={25} color="#dfdfdf" />
      </button>

      <DropDown isOpen={isOpen}>
        {onView && (
          <li>
            <button
              type="button"
              onClick={() => {
                onView(itemId);
                setIsOpen(false);
              }}
            >
              <MdRemoveRedEye size={15} color="#8E5BE8" />{' '}
              {viewActionText || 'Visualizar'}
            </button>
          </li>
        )}

        {onEdit && (
          <li>
            <button
              type="button"
              onClick={() => {
                onEdit(itemId);
                setIsOpen(false);
              }}
            >
              <MdEdit size={15} color="#4D85EE" /> {editActionText || 'Editar'}
            </button>
          </li>
        )}

        {onDelete && (
          <li>
            <button
              type="button"
              onClick={() => {
                onDelete(itemId);
                setIsOpen(false);
              }}
            >
              <MdDelete size={15} color="#DE3B3B" />{' '}
              {deleteActionText || 'Excluir'}
            </button>
          </li>
        )}
      </DropDown>
    </Container>
  );
}
