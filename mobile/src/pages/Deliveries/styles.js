import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #fff;
  flex: 1;
`;
export const Content = styled.View`
  padding: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const User = styled.View`
  flex-direction: row;
`;

export const Avatar = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  margin-right: 10px;
  border: 1px solid #dfdfdf;
`;

export const WelcomeMessage = styled.View``;

export const Text = styled.Text`
  font-size: ${({ large }) => (large ? '25px' : '18px')};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: #666;
`;

export const FilterTabs = styled.View`
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Options = styled.View`
  flex-direction: row;
`;

export const Option = styled.TouchableOpacity`
  margin: 0 5px;
`;

export const OptionText = styled.Text`
  font-size: 16px;
  color: ${({ selected }) => (selected ? '#7D40E7' : '#666')};
  text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')};
  text-decoration-color: #7d40e7;
`;

export const List = styled.FlatList``;

export const Delivery = styled.View`
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin: 15px 0;
  border-radius: 5px;
`;

export const DeliveryHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 15px 0;
  padding: 5px;
`;

export const DeliveryHeaderText = styled.Text`
  font-size: 17px;
  color: #7d40e7;
  font-weight: bold;
  margin-left: 5px;
`;

export const DeliveryInfos = styled.View`
  background: #f8f9fd;
  height: 100px;
  padding: 5px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DeliveryInfo = styled.View``;

export const DeliveryInfoLabel = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #999999;
`;

export const DeliveryInfoValue = styled.Text`
  color: #444444;
  font-weight: bold;
  font-size: 16px;
`;

export const DeliveryDetailsText = styled.Text`
  color: #7d40e7;
  font-weight: bold;
  font-size: 16px;
`;
