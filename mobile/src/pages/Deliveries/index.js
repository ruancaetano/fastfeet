import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StepIndicator from 'react-native-step-indicator';
import { format, parseISO } from 'date-fns';

import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  Content,
  Header,
  User,
  Avatar,
  Text,
  FilterTabs,
  Options,
  Option,
  OptionText,
  Delivery,
  DeliveryHeader,
  DeliveryHeaderText,
  DeliveryInfos,
  DeliveryInfo,
  DeliveryInfoLabel,
  DeliveryInfoValue,
  DeliveryDetailsText,
  List,
} from './styles';

const stepConfiguration = {
  stepIndicatorSize: 15,
  currentStepIndicatorSize: 15,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeWidth: 3,
  stepStrokeCurrentColor: '#7D40E7',
  stepStrokeFinishedColor: '#7D40E7',
  stepStrokeUnFinishedColor: '#7D40E7',
  separatorFinishedColor: '#7D40E7',
  separatorUnFinishedColor: '#7D40E7',
  stepIndicatorFinishedColor: '#7D40E7',
  stepIndicatorUnFinishedColor: '#fff',
  stepIndicatorCurrentColor: '#7D40E7',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#7D40E7',
  stepIndicatorLabelFinishedColor: '#7D40E7',
  stepIndicatorLabelUnFinishedColor: '#fff',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#999999',
};

export default function Deliveries({ navigation }) {
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.user.profile);
  const [deliveredFilter, setDeliveredFilter] = useState(false);
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    async function loadDeliveries() {
      try {
        const response = await api.get(
          `/deliverymen/${userProfile.id}/deliveries?delivered=${deliveredFilter}`
        );
        setDeliveries(
          response.data.values.map(delivery => {
            let deliveryStatusIndex = 0;
            let deliveryStatus = 'Aguardando Retirada';

            const formattedCreationDate = format(
              parseISO(delivery.createdAt),
              'dd/MM/yyyy'
            );

            const formattedWithdrawalDate = delivery.startDate
              ? format(parseISO(delivery.startDate), 'dd/MM/yyyy')
              : '--/--/----';

            const formattedDeliveryConfirmationDate = delivery.endDate
              ? format(parseISO(delivery.endDate), 'dd/MM/yyyy')
              : '--/--/----';

            if (delivery.endDate) {
              deliveryStatusIndex = 2;
              deliveryStatus = 'Entregue';
            } else if (delivery.startDate) {
              deliveryStatusIndex = 1;
              deliveryStatus = 'Retirada';
            }

            return {
              ...delivery,
              deliveryStatus,
              deliveryStatusIndex,
              formattedCreationDate,
              formattedWithdrawalDate,
              formattedDeliveryConfirmationDate,
            };
          })
        );
      } catch (error) {
        Alert.alert(
          'Ops',
          'Encontramos um problema ao buscar suas entregas, tente novamente!'
        );
      }
    }

    loadDeliveries();
  }, [deliveredFilter, userProfile.id]);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <Header>
          <User>
            <Avatar
              source={{
                uri: userProfile.avatar.path,
              }}
            />

            <View>
              <Text>Bem vindo de volta,</Text>
              <Text bold large>
                {userProfile.name}
              </Text>
            </View>
          </User>

          <TouchableOpacity onPress={handleLogout}>
            <Icon name="exit-to-app" color="#E74040" size={30} />
          </TouchableOpacity>
        </Header>

        <FilterTabs>
          <Text large bold>
            Entregas
          </Text>
          <Options>
            <Option
              onPress={() => {
                setDeliveredFilter(false);
              }}
            >
              <OptionText selected={!deliveredFilter}>Pendentes</OptionText>
            </Option>
            <Option
              onPress={() => {
                setDeliveredFilter(true);
              }}
            >
              <OptionText selected={deliveredFilter}>Entregues</OptionText>
            </Option>
          </Options>
        </FilterTabs>

        <List
          data={deliveries}
          keyExtractor={delivery => delivery.id}
          renderItem={({ item }) => (
            <Delivery>
              <DeliveryHeader>
                <MaterialCommunityIcons
                  name="truck"
                  size={35}
                  color="#7D40E7"
                />
                <DeliveryHeaderText>{item.product}</DeliveryHeaderText>
              </DeliveryHeader>

              <StepIndicator
                stepCount={3}
                customStyles={stepConfiguration}
                currentPosition={item.deliveryStatusIndex}
                labels={['Aguardando Retirada', 'Retirada', 'Entregue']}
              />

              <DeliveryInfos>
                <DeliveryInfo>
                  <DeliveryInfoLabel>Data</DeliveryInfoLabel>
                  <DeliveryInfoValue>
                    {item.formattedCreationDate}
                  </DeliveryInfoValue>
                </DeliveryInfo>
                <DeliveryInfo>
                  <DeliveryInfoLabel>Cidade</DeliveryInfoLabel>
                  <DeliveryInfoValue>{item.recipient.city}</DeliveryInfoValue>
                </DeliveryInfo>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DeliveryDetails', {
                      delivery: item,
                    })
                  }
                >
                  <DeliveryDetailsText>Ver detalhes</DeliveryDetailsText>
                </TouchableOpacity>
              </DeliveryInfos>
            </Delivery>
          )}
        />
      </Content>
    </Container>
  );
}

Deliveries.navigationOptions = {
  header: null,
};
