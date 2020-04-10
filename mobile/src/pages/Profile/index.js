import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';

import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  Avatar,
  Label,
  Text,
  LogoutButton,
  LogoutButtonText,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.user.profile);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Avatar
        source={{
          uri: userProfile.avatar.path,
        }}
      />

      <Label>Nome completo</Label>
      <Text>{userProfile.name}</Text>

      <Label>E-mail</Label>
      <Text>{userProfile.email}</Text>

      <Label>Data de cadastro</Label>
      <Text>{format(parseISO(userProfile.createdAt), 'dd/MM/yyyy')}</Text>

      <LogoutButton onPress={handleLogout}>
        <LogoutButtonText>Logout</LogoutButtonText>
      </LogoutButton>
    </Container>
  );
}
