import React, { useState, useEffect, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

import Title from '~/components/Title';
import Table from '~/components/Table';
import Input from '~/components/Input';
import Button from '~/components/Button';
import api from '~/services/api';
import history from '~/services/history';
import useDebounce from '~/hooks/useDebounce';

import ModalOrder from './ModalOrder';
import { Container } from './styles';

const TABLE_HEADERS = [
  'ID',
  'Produto',
  'Destinatário',
  'Entregador',
  'Cidade',
  'Estado',
  'Status',
  'Ações',
];
const DEFAULT_PAGE_SIZE = 5;

export default function OrdersList() {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  function mapStatusByDates(startDate, endDate, canceledAt) {
    if (canceledAt) return 3;
    if (startDate && endDate) return 2;
    if (startDate && !endDate) return 1;
    return 0;
  }

  function handleView(id, orders) {
    const order = orders.find(item => item.id === id);
    setSelectedOrder(order);
    setShowViewModal(true);
  }

  function handleEdit(id) {
    history.push(`/orders/${id}/edit`);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/orders/${id}`);
      loadOrders();
      toast.success('Encomenda removida com sucesso!');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function loadOrders() {
    try {
      const response = await api.get(
        `/orders?page=${page}&pageSize=${DEFAULT_PAGE_SIZE}&product=${debouncedSearchTerm}`
      );

      const data = response.data.values.map(item => [
        { type: 'text', value: item.id },
        { type: 'text', value: item.product },
        { type: 'text', value: item.recipient.name },
        {
          type: 'user',
          value: {
            name: item.deliveryman.name,
            avatar: item.deliveryman.avatar ? item.deliveryman.avatar.path : '',
          },
        },
        { type: 'text', value: item.recipient.city },
        { type: 'text', value: item.recipient.state },
        {
          type: 'status',
          value: mapStatusByDates(
            item.startDate,
            item.endDate,
            item.canceledAt
          ),
        },
        {
          type: 'actions',
          value: {
            id: item.id,
            onView: id => handleView(id, response.data.values),
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

  const loadOrdersCallback = useCallback(loadOrders, [
    page,
    debouncedSearchTerm,
  ]);

  useEffect(() => {
    loadOrdersCallback();
  }, [loadOrdersCallback]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  return (
    <>
      <Container>
        <Title>Gerenciando encomendas</Title>

        <section>
          <Input
            name="search-orders"
            type="search"
            placeholder="Buscar por produtos"
            onChange={e => setSearchTerm(e.target.value)}
          />

          <Button type="button" icon={MdAdd} to="/orders/new">
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
      <ModalOrder
        isOpen={showViewModal}
        order={selectedOrder}
        onClose={() => {
          setShowViewModal(false);
          setSelectedOrder(null);
        }}
      />
    </>
  );
}
