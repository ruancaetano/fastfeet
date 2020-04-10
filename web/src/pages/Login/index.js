import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { authentication } from '~/store/modules/auth/actions';

export default function Login() {
  const dispatch = useDispatch();
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string().required(),
  });

  function handleSubmit(data) {
    dispatch(authentication(data));
  }
  return (
    <>
      <img src={logo} alt="FastFeet Logo" />

      <Form onSubmit={handleSubmit} schema={schema}>
        <Input
          type="email"
          name="email"
          label="Seu E-mail"
          placeholder="email@email.com"
        />

        <Input
          type="password"
          name="password"
          label="Sua senha secreta"
          placeholder="********"
        />

        <Button type="submit" block type="submit">
          Entrar no sistema
        </Button>
      </Form>
    </>
  );
}
