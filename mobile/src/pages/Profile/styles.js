import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  margin: 20px;
`;

export const Avatar = styled.Image`
  height: 120px;
  width: 120px;
  border-radius: 60px;
  margin: 15px auto;
  border: 1px solid #dfdfdf;
`;

export const Label = styled.Text`
  font-size: 18px;
  color: #666;
  margin-top: 20px;
`;

export const Text = styled.Text`
  font-size: 23px;
  color: #666;
  font-weight: bold;
`;

export const LogoutButton = styled(RectButton)`
  width: 100%;
  height: 45px;
  background: #e74040;
  margin-top: 15px;
  border-radius: 4px;

  justify-content: center;
  align-items: center;
`;

export const LogoutButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
