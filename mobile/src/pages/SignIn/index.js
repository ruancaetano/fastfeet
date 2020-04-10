import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';
import Button from '~/components/Button';
import Input from '~/components/Input';
import logo from '~/assets/logo.png';

import { Container, Logo } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const [userId, setUserId] = useState('');

  function handleSubmit() {
    Keyboard.dismiss();
    dispatch(signInRequest(userId));
  }

  return (
    <Container>
      <Logo source={logo} />

      <Input
        keyboardType="numeric"
        placeholder="Informe seu ID de cadastro"
        value={userId}
        onChangeText={setUserId}
      />

      <Button
        enabled={userId && !loading}
        onPress={handleSubmit}
        loading={loading}
      >
        Entrar no sistema
      </Button>
    </Container>
  );
}
