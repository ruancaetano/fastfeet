import React, { useState, useEffect } from 'react';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import Title from '~/components/Title';
import Input from '~/components/Input';
import Button from '~/components/Button';
import FileInput from '~/components/FileInput';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

export default function DelivermenForm({
  match: {
    params: { delivermanId },
  },
}) {
  const schema = Yup.object().shape({
    avatarId: Yup.number().required('Campo obrigatório'),
    name: Yup.string().required('Campo obrigatório'),
    email: Yup.string()
      .email()
      .required('Campo obrigatório'),
  });

  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDeliveryman() {
      try {
        const response = await api.get(`/deliverymen/${delivermanId}`);
        setInitialData({
          name: response.data.name,
          avatarId: response.data.avatar,
          email: response.data.email,
        });
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    if (delivermanId) {
      setLoading(true);
      loadDeliveryman();
    }
  }, [delivermanId]);

  async function handleSubmit(data) {
    try {
      if (delivermanId) {
        await api.put(`/deliverymen/${delivermanId}`, data);
      } else {
        await api.post('/deliverymen', data);
      }

      toast.success('Encomenda salva com sucesso!');
      history.goBack();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema} initialData={initialData}>
        <section>
          <Title>Cadastro de entregadores</Title>

          <aside>
            <Button
              type="button"
              onClick={history.goBack}
              greyButton
              icon={MdChevronLeft}
            >
              Voltar
            </Button>
            <Button type="submit  " icon={MdCheck}>
              Salvar
            </Button>
          </aside>
        </section>

        <main>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <>
              <FileInput name="avatarId" accept="image/*" />

              <Input name="name" label="Nome do entregador" />
              <Input type="email" name="email" label="E-mail do entregador" />
            </>
          )}
        </main>
      </Form>
    </Container>
  );
}

DelivermenForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      delivermanId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
};
