import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #fff;
  flex: 1;
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

export const List = styled.FlatList``;

export const Problem = styled.View`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #dddddd;
  background: #fff;
  height: 60px;
  border-radius: 5px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProblemTitle = styled.Text.attrs({
  numberOfLines: 1,
})`
  flex: 3;
  font-size: 16px;
  color: #999999;
  font-weight: bold;
`;

export const ProblemDate = styled.Text`
  font-size: 15px;
  color: #999999;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;
