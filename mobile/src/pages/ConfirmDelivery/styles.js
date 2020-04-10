import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';

export const Container = styled.SafeAreaView`
  background: #fff;
  flex: 1;
`;

export const Background = styled.View`
  background: #7d40e7;
  height: 180px;
`;

export const Content = styled.View`
  width: 100%;
  height: 100%;
  padding: 30px;

  position: absolute;
  justify-content: center;

  border-radius: 5px;
`;

export const ImagePreview = styled.ImageBackground.attrs({
  resizeMode: 'stretch',
})`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  border: 1px solid #dfdfdf;
  border-radius: 5px;
  padding: 10px;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  border: 1px solid #dfdfdf;
  border-radius: 5px;
  padding: 10px;
`;

export const CamButton = styled.TouchableOpacity`
  background: rgba(0, 0, 0, 0.5);
  height: 80px;
  width: 80px;
  border-radius: 40px;

  justify-content: center;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: #7d40e7;
  margin: 15px 0px;
  height: 45px;
  border-radius: 5px;
`;

export const ButtonText = styled.Text`
  text-align: center;
  color: #fff;
  font-weight: bold;
`;
