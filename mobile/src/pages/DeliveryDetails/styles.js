import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background: #fff;
`;

export const Background = styled.View`
  background: #7d40e7;
  height: 160px;
`;

export const Content = styled.ScrollView`
  margin-top: -120px;
  padding: 0 20px;
`;

export const Card = styled.View`
  background: #fff;
  padding: 5px;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid #dfdfdf;
`;

export const CardTitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CardTitle = styled.Text`
  font-size: 17px;
  font-weight: bold;
  margin-left: 10px;
  margin-bottom: 5px;
  color: #7d40e7;
`;

export const CardLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
  color: #999999;
`;

export const CardText = styled.Text`
  font-size: 16px;
  margin: 5px 0;
  color: #666;
`;

export const CardGrid = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Buttons = styled.View`
  flex-direction: row;
  background: #e5e5e5;
  border-radius: 5px;
  margin: 10px 0;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #fff;
  margin: 2px 1px;
  height: 80px;
  padding: 5px;
`;

export const ButtonText = styled.Text`
  text-align: center;
  color: #666;
`;
