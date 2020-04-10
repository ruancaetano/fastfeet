import React, { useState, useEffect, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

import Title from '~/components/Title';
import Table from '~/components/Table';
import Input from '~/components/Input';
import Button from '~/components/Button';
import useDebounce from '~/hooks/useDebounce';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

const TABLE_HEADERS = ['ID', 'Nome', 'Endereço', 'Ações'];
const DEFAULT_PAGE_SIZE = 5;

export default function RecipientsList() {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  function handleEdit(id) {
    history.push(`/recipients/${id}/edit`);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/recipients/${id}`);
      loadRecipients();
      toast.success('Entregador removido com sucesso!');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function loadRecipients() {
    try {
      const response = await api.get(
        `/recipients?page=${page}&pageSize=${DEFAULT_PAGE_SIZE}&name=${debouncedSearchTerm}`
      );

      const data = response.data.values.map(item => [
        { type: 'text', value: item.id },
        { type: 'text', value: item.name },
        {
          type: 'text',
          value: `${item.street},${item.number},${item.city}-${item.state} (${item.zipcode})`,
        },
        {
          type: 'actions',
          value: {
            id: item.id,
            onEdit: id => handleEdit(id, response.data.values),
            onDelete: id => handleDelete(id, response.data.values),
          },
        },
      ]);
      setTableData(data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const loadRecipientsCallback = useCallback(loadRecipients, [
    page,
    debouncedSearchTerm,
  ]);

  useEffect(() => {
    loadRecipientsCallback();
  }, [loadRecipientsCallback]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  return (
    <>
      <Container>
        <Title>Gerenciando destinatários</Title>

        <section>
          <Input
            name="search-orders"
            type="search"
            placeholder="Buscar por destinatários"
            onChange={e => setSearchTerm(e.target.value)}
          />

          <Button type="button" icon={MdAdd} to="/recipients/new">
            Cadastrar
          </Button>
        </section>

        <Table
          totalPages={totalPages}
          headers={TABLE_HEADERS}
          data={tableData}
          onPageChange={setPage}
        />
      </Container>
    </>
  );
}
