import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  background: #fff;
`;

export const Background = styled.View`
  background: #7d40e7;
  height: 180px;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 30,
  },
})`
  width: 100%;
  position: absolute;
`;

export const Input = styled.TextInput.attrs({
  multiline: true,
  textAlignVertical: 'top',
})`
  justify-content: flex-start;
  height: 300px;
  background: #fff;
  border-radius: 5px;
  color: #999;
  padding: 10px;
  font-size: 17px;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #7d40e7;
  margin: 10px 0px;
  height: 45px;
  border-radius: 5px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const ButtonText = styled.Text`
  text-align: center;
  color: #fff;
  font-weight: bold;
`;
