import React, { useState, useEffect } from 'react';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Title from '~/components/Title';
import Input from '~/components/Input';
import InputMask from '~/components/InputMask';
import Button from '~/components/Button';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

export default function RecipientsForm({
  match: {
    params: { recipientId },
  },
}) {
  const schema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    street: Yup.string().required('Campo obrigatório'),
    number: Yup.number()
      .typeError('Digite um número válido')
      .required('Campo obrigatório'),
    city: Yup.string().required('Campo obrigatório'),
    state: Yup.string().required('Campo obrigatório'),
    complement: Yup.string().required('Campo obrigatório'),
    zipcode: Yup.string()
      .test('is-zipcode', 'CEP inválido', value => {
        if (!value) return false;
        return new RegExp(/^[0-9]{5}-[0-9]{3}$/).test(value);
      })
      .required('Campo obrigatório'),
  });

  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadOrder() {
      try {
        const response = await api.get(`/recipients/${recipientId}`);

        setInitialData(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    if (recipientId) {
      setLoading(true);
      loadOrder();
    }
  }, [recipientId]);

  async function handleSubmit(data) {
    try {
      if (recipientId) {
        await api.put(`/recipients/${recipientId}`, data);
      } else {
        await api.post('/recipients', data);
      }

      toast.success('Destinatário salvo com sucesso!');
      history.goBack();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema} initialData={initialData}>
        <section>
          <Title>
            {recipientId
              ? 'Edição De Destinatário'
              : 'Cadastro de Destinatários'}
          </Title>

          <aside>
            <Button
              type="button"
              onClick={history.goBack}
              greyButton
              icon={MdChevronLeft}
            >
              Voltar
            </Button>
            <Button type="submit" icon={MdCheck}>
              Salvar
            </Button>
          </aside>
        </section>

        <main>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <>
              {' '}
              <Input name="name" label="Nome do destinário" />
              <section>
                <Input name="street" label="Logradouro" />
                <Input name="number" label="Número" />
                <Input name="complement" label="Complemento" />
              </section>
              <section>
                <Input name="city" label="Cidade" />
                <Input name="state" label="Estado" />
                <InputMask name="zipcode" mask="99999-999" label="CEP" />
              </section>
            </>
          )}
        </main>
      </Form>
    </Container>
  );
}
