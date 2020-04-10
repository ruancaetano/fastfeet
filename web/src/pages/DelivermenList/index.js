import React, { useState, useEffect, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

import Title from '~/components/Title';
import Table from '~/components/Table';
import Input from '~/components/Input';
import Button from '~/components/Button';
import useDebounce from '~/hooks/useDebounce';
import history from '~/services/history';
import api from '~/services/api';

import { Container } from './styles';

const TABLE_HEADERS = ['ID', 'Foto', 'Nome', 'E-mail', 'Ações'];
const DEFAULT_PAGE_SIZE = 5;

export default function DelivermenList() {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  function handleEdit(id) {
    history.push(`/delivermen/${id}/edit`);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/deliverymen/${id}`);
      loadDeliverymen();
      toast.success('Entregador removido com sucesso!');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function loadDeliverymen() {
    try {
      const response = await api.get(
        `/deliverymen?page=${page}&pageSize=${DEFAULT_PAGE_SIZE}&name=${debouncedSearchTerm}`
      );

      const data = response.data.values.map(item => [
        { type: 'text', value: item.id },
        { type: 'avatar', value: item.avatar.path },
        { type: 'text', value: item.name },
        { type: 'text', value: item.email },
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

  const loadDeliverymenCallback = useCallback(loadDeliverymen, [
    page,
    debouncedSearchTerm,
  ]);

  useEffect(() => {
    loadDeliverymenCallback();
  }, [loadDeliverymenCallback]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  return (
    <>
      <Container>
        <Title>Gerenciando entregadores</Title>

        <section>
          <Input
            name="search-orders"
            type="search"
            placeholder="Buscar por entregadores"
            onChange={e => setSearchTerm(e.target.value)}
          />

          <Button type="button" icon={MdAdd} to="/delivermen/new">
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
