import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
  Container,
  Background,
  Content,
  Input,
  Button,
  ButtonText,
} from './styles';

export default function CreateDeliveryProblem({ navigation }) {
  const deliveryId = navigation.getParam('deliveryId');
  const [problem, setProblem] = useState('');

  async function handleSubmit() {
    try {
      await api.post(`/deliveries/${deliveryId}/problems`, {
        description: problem,
      });
      Alert.alert('Sucesso', 'Obrigado por nos manter informado!');
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Ops',
        'Falha ao informar o problema com sua entrega, tente novamente!'
      );
    }
  }

  return (
    <Container>
      <Background />

      <Content>
        <Input
          placeholder="Inclua aqui o problema que ocorreu na entrega."
          onChangeText={text => setProblem(text)}
        />

        <Button disabled={!problem} onPress={handleSubmit}>
          <ButtonText>Enviar</ButtonText>
        </Button>
      </Content>
    </Container>
  );
}

CreateDeliveryProblem.navigationOptions = ({ navigation }) => ({
  title: 'Informar problema',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
