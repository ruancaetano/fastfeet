import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import Title from '~/components/Title';
import Table from '~/components/Table';
import api from '~/services/api';
import history from '~/services/history';

import ModalProblem from './ModalProblem';
import { Container } from './styles';

const TABLE_HEADERS = ['Encomenda', 'Problema', 'Ações'];
const DEFAULT_PAGE_SIZE = 5;

export default function ProblemsList() {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showViewModal, setShowViewModal] = useState(null);

  function handleView(id, problems) {
    const problem = problems.find(item => item.id === id);
    setSelectedProblem(problem);
    setShowViewModal(true);
  }

  async function handleCancel(id, problems) {
    try {
      await api.post(`/problems/${id}/cancel-delivery`);
      loadProblematicOrders();
      toast.success('Encomenda cancelada com sucesso!');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function loadProblematicOrders() {
    try {
      const response = await api.get(
        `/problematic-orders?page=${page}&pageSize=${DEFAULT_PAGE_SIZE}`
      );

      const data = response.data.values.map(item => [
        { type: 'text', value: item.order.id },
        { type: 'text', value: item.description },
        {
          type: 'actions',
          value: {
            id: item.id,
            onView: id => handleView(id, response.data.values),
            onDelete: id => handleCancel(id, response.data.values),
            deleteActionText: 'Cancelar encomenda',
          },
        },
      ]);
      setTableData(data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const loadProblematicOrdersCallback = useCallback(loadProblematicOrders, [
    page,
  ]);

  useEffect(() => {
    loadProblematicOrdersCallback();
  }, [loadProblematicOrdersCallback]);

  return (
    <>
      <Container>
        <Title>Gerenciando encomendas</Title>

        <Table
          totalPages={totalPages}
          headers={TABLE_HEADERS}
          data={tableData}
          onPageChange={setPage}
        />
      </Container>
      <ModalProblem
        isOpen={showViewModal}
        problem={selectedProblem}
        onClose={() => {
          setShowViewModal(false);
          setSelectedProblem(null);
        }}
      />
    </>
  );
}
