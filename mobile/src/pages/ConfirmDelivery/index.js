import React, { useState } from 'react';
import { TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RNCamera } from 'react-native-camera';

import api from '~/services/api';

import {
  Container,
  Background,
  Content,
  ImagePreview,
  CamButton,
  Button,
  ButtonText,
  Camera,
} from './styles';

export default function ViewDeliveryProblems({ navigation }) {
  let camera = null;
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const userProfile = useSelector(state => state.user.profile);

  const deliveryId = navigation.getParam('deliveryId');

  async function takePicture() {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      setImage(data);
    }
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      const uploadFormaData = new FormData();
      uploadFormaData.append('file', {
        uri: image.uri,
        type: 'image/jpeg',
        name: `${deliveryId}.jpg`,
      });
      const uploadResponse = await api.post('files', uploadFormaData);
      await api.patch(
        `/deliverymen/${userProfile.id}/deliveries/${deliveryId}`,
        {
          endDate: new Date(),
          signatureId: uploadResponse.data.id,
        }
      );
      Alert.alert('Sucesso', 'Confirmação de entrega realizada com sucesso!');
      navigation.navigate('Deliveries');
      setLoading(false);
    } catch (error) {
      Alert.alert(
        'Ops',
        'Falha ao tentar realizar confirmação de entrega, tente novamente!'
      );
      setLoading(false);
    }
  }
  return (
    <Container>
      <Background />

      <Content>
        {image ? (
          <ImagePreview source={{ uri: image.uri }}>
            <CamButton onPress={() => setImage(null)}>
              <Icon name="close" size={40} color="#fff" />
            </CamButton>
          </ImagePreview>
        ) : (
          <Camera
            ref={ref => {
              camera = ref;
            }}
            type={RNCamera.Constants.Type.front}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle="Permission to use camera"
            permissionDialogMessage="We need your permission to use your camera phone"
          >
            <CamButton onPress={takePicture}>
              <Icon name="camera-alt" size={40} color="#fff" />
            </CamButton>
          </Camera>
        )}

        <Button disabled={!image} onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <ButtonText>Enviar</ButtonText>
          )}
        </Button>
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
