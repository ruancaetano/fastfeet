import React, { useEffect, useState } from 'react';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import api from '~/services/api';
import history from '~/services/history';
import Title from '~/components/Title';
import Input from '~/components/Input';
import AsyncSelect from '~/components/AsyncSelect';
import Button from '~/components/Button';

import { Container } from './styles';

export default function OrdersForm({
  match: {
    params: { orderId },
  },
}) {
  const schema = Yup.object().shape({
    product: Yup.string().required('Campo obrigatório'),
    deliveryman: Yup.object()
      .shape({
        label: Yup.string().required(),
        value: Yup.number().required(),
      })
      .required('Campo obrigatório'),
    recipient: Yup.object()
      .shape({
        label: Yup.string(),
        value: Yup.number(),
      })
      .required('Campo obrigatório'),
  });

  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadOrder() {
      try {
        const response = await api.get(`/orders/${orderId}`);
        const data = {
          product: response.data.product,
          deliveryman: {
            label: response.data.deliveryman.name,
            value: response.data.deliveryman.id,
          },
          recipient: {
            label: response.data.recipient.name,
            value: response.data.recipient.id,
          },
        };
        setInitialData(data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    if (orderId) {
      setLoading(true);
      loadOrder();
    }
  }, [orderId]);

  async function loadOptions(type, inputValue, callback) {
    try {
      const response = await api.get(`/${type}?name=${inputValue}`);
      callback(
        response.data.values.map(item => ({
          label: item.name,
          value: item.id,
        }))
      );
    } catch (error) {
      callback([]);
    }
  }

  async function handleSubmit(data) {
    try {
      const body = {
        product: data.product,
        deliverymanId: data.deliveryman.value,
        recipientId: data.recipient.value,
      };

      if (orderId) {
        await api.put(`/orders/${orderId}`, body);
      } else {
        await api.post('/orders', body);
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
          <Title>
            {orderId ? 'Edição De Encomenda' : 'Cadastro De Encomendas'}
          </Title>

          <aside>
            <Button
              type="button"
              greyButton
              icon={MdChevronLeft}
              onClick={history.goBack}
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
              <section>
                <AsyncSelect
                  name="recipient"
                  loadOptions={(inputValue, callback) =>
                    loadOptions('recipients', inputValue, callback)
                  }
                  label="Destinatário"
                  placeholder=""
                />

                <AsyncSelect
                  name="deliveryman"
                  loadOptions={(inputValue, callback) =>
                    loadOptions('deliverymen', inputValue, callback)
                  }
                  label="Entregador"
                  placeholder=""
                />
              </section>

              <Input name="product" label="Nome do produto" />
            </>
          )}
        </main>
      </Form>
    </Container>
  );
}

OrdersForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
};
