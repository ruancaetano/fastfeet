import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';

import api from '~/services/api';

import {
  Container,
  Background,
  Content,
  Problem,
  ProblemTitle,
  ProblemDate,
  Title,
  List,
} from './styles';

export default function ViewDeliveryProblems({ navigation }) {
  const deliveryId = navigation.getParam('deliveryId');
  const [problems, setProblems] = useState('');

  useEffect(() => {
    async function loadProblems() {
      try {
        const response = await api.get(`/deliveries/${deliveryId}/problems`);
        setProblems(
          response.data.values.map(problem => {
            const formattedCreationDate = format(
              parseISO(problem.createdAt),
              'dd/MM/yyyy'
            );

            return {
              ...problem,
              formattedCreationDate,
            };
          })
        );
      } catch (error) {
        Alert.alert(
          'Ops',
          'Encontramos um problema ao buscar os problememas dessa entrega, tente novamente!'
        );
      }
    }
    loadProblems();
  }, [deliveryId]);
  return (
    <Container>
      <Background />

      <Content>
        <Title>Encomenda 01</Title>

        <List
          data={problems}
          keyExtractor={problem => problem.id}
          renderItem={({ item }) => (
            <Problem>
              <ProblemTitle>{item.description}</ProblemTitle>
              <ProblemDate>{item.formattedCreationDate}</ProblemDate>
            </Problem>
          )}
        />
      </Content>
    </Container>
  );
}

ViewDeliveryProblems.navigationOptions = ({ navigation }) => ({
  title: 'Visualizar problemas',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
