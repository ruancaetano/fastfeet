import React from 'react';
import { TouchableOpacity, View, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '~/services/api';

import {
  Container,
  Background,
  Content,
  Card,
  CardTitleWrapper,
  CardTitle,
  CardLabel,
  CardText,
  CardGrid,
  Buttons,
  Button,
  ButtonText,
} from './styles';

export default function DeliveryDetails({ navigation }) {
  const delivery = navigation.getParam('delivery');

  const userProfile = useSelector(state => state.user.profile);

  function formatRecipientAddress(recipient) {
    return `${recipient.street}, ${recipient.number}, ${recipient.city}-${recipient.state}, ${recipient.zipcode} (${recipient.complement})`;
  }

  async function handleDeliveryWithdrawal() {
    try {
      const withdrawalDate = new Date();
      await api.patch(
        `/deliverymen/${userProfile.id}/deliveries/${delivery.id}`,
        {
          startDate: withdrawalDate,
        }
      );
      delivery.deliveryStatus = 'Retirada';
      delivery.startDate = withdrawalDate;
      Alert.alert('Sucesso', 'Retirada de entrega realizada com sucesso!');
    } catch (error) {
      Alert.alert(
        'Ops',
        'Falha ao tentar realizar retirada de entrega, tente novamente!'
      );
    }
  }

  return (
    <Container>
      <Background />

      <Content>
        <Card>
          <CardTitleWrapper>
            <IconCommunity name="truck" size={25} color="#7D40E7" />
            <CardTitle>Informações da entrega</CardTitle>
          </CardTitleWrapper>

          <CardLabel>DESTINATÁRIO</CardLabel>
          <CardText>{delivery.recipient.name}</CardText>

          <CardLabel>ENDEREÇO DE ENTREGA</CardLabel>
          <CardText>{formatRecipientAddress(delivery.recipient)}</CardText>

          <CardLabel>PRODUTO</CardLabel>
          <CardText>{delivery.product}</CardText>
        </Card>

        <Card>
          <CardTitleWrapper>
            <IconCommunity name="calendar" size={25} color="#7D40E7" />
            <CardTitle>Situação da entrega</CardTitle>
          </CardTitleWrapper>

          <CardLabel>STATUS</CardLabel>
          <CardText>{delivery.deliveryStatus}</CardText>

          <CardGrid>
            <View>
              <CardLabel>DATA DE RETIRADA</CardLabel>
              <CardText>{delivery.formattedWithdrawalDate}</CardText>
            </View>

            <View>
              <CardLabel>DATA DE ENTREGA</CardLabel>
              <CardText>{delivery.formattedDeliveryConfirmationDate}</CardText>
            </View>
          </CardGrid>
        </Card>

        <Buttons>
          <Button
            onPress={() =>
              navigation.navigate('CreateDeliveryProblem', {
                deliveryId: delivery.id,
              })
            }
          >
            <IconCommunity
              name="close-circle-outline"
              size={25}
              color="#E74040"
            />
            <ButtonText>Informar Problema</ButtonText>
          </Button>

          <Button
            onPress={() =>
              navigation.navigate('ViewDeliveryProblems', {
                deliveryId: delivery.id,
              })
            }
          >
            <IconCommunity
              name="information-outline"
              size={25}
              color="#E7BA40"
            />
            <ButtonText>Visualizar Problemas</ButtonText>
          </Button>

          {delivery.deliveryStatus === 'Aguardando Retirada' ? (
            <Button
              disabled={delivery.endDate}
              onPress={handleDeliveryWithdrawal}
            >
              <IconCommunity
                name="check-circle-outline"
                size={25}
                color="#7D40E7"
              />
              <ButtonText>Confirmar retirada</ButtonText>
            </Button>
          ) : (
            <Button
              disabled={delivery.endDate}
              onPress={() =>
                navigation.navigate('ConfirmDelivery', {
                  deliveryId: delivery.id,
                })
              }
            >
              <IconCommunity
                name="check-circle-outline"
                size={25}
                color="#7D40E7"
              />
              <ButtonText>
                {delivery.deliveryStatus === 'Retirada'
                  ? 'Confirmar Entrega'
                  : 'Entrega Finalizada'}
              </ButtonText>
            </Button>
          )}
        </Buttons>
      </Content>
    </Container>
  );
}

DeliveryDetails.navigationOptions = ({ navigation }) => ({
  title: 'Confirme o agendamento',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
