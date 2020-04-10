import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
  enabled: Platform.OS === 'ios',
})`
  flex: 1;
  background: #7d40e7;

  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const Logo = styled.Image`
  margin-bottom: 15px;
`;
