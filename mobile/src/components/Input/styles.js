import styled from 'styled-components/native';
import {} from 'react-native';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  background: #fff;

  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: '#7D40E7',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #7d40e7;
`;
