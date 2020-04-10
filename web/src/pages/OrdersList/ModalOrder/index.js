import React from 'react';
import { MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';

import assinatura from '~/assets/assinatura.png';
import { Container } from './styles';

export default function ModalOrder({ isOpen, order, onClose }) {
  return (
    <Container isOpen={isOpen}>
      {order && (
        <div>
          <MdClose size={20} color="#444444" onClick={onClose} />
          <section>
            <h1>Informações da encomenda</h1>
            <p>
              {order.recipient.street}, {order.recipient.number}
            </p>
            <p>
              {order.recipient.city} - {order.recipient.state}
            </p>
            <p>{order.recipient.zipcode}</p>
          </section>

          <hr />

          <section>
            <h1>Datas</h1>
            <p>
              <strong>Retirada:</strong>{' '}
              {order.startDate
                ? format(parseISO(order.startDate), 'dd/MM/yyyy')
                : ''}
            </p>
            <p>
              <strong>Entrega:</strong>{' '}
              {order.endDate
                ? format(parseISO(order.endDate), 'dd/MM/yyyy')
                : ''}
            </p>
          </section>

          <hr />

          <section>
            <h1>Assinatura do destinatário</h1>
            {order.signature && (
              <img src={order.signature.path} alt="user signature" />
            )}
          </section>
        </div>
      )}
    </Container>
  );
}

ModalOrder.propTypes = {
  isOpen: PropTypes.bool,
};

ModalOrder.defaultProps = {
  isOpen: false,
};
