import Mail from '../../lib/Mail';

class NewOrderEmailJob {
  get key() {
    return 'NewOrderEmailJob';
  }

  async handle({ data }) {
    const { deliveryman, order, recipient } = data;
    const emailData = {
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Você tem uma nova encomenda a ser entregue!',
      template: 'newOrder',
      context: {
        deliveryman: deliveryman.name,
        product: order.product,
        recipient: recipient.name,
        address: `${recipient.street}, ${recipient.number} - ${recipient.city}/${recipient.state} (${recipient.zipcode})`,
      },
    };

    return Mail.send(emailData);
  }
}

export default new NewOrderEmailJob();
