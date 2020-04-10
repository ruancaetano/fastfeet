import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import history from '~/services/history';
import logo from '~/assets/logo.png';
import { logout } from '~/store/modules/auth/actions';

import { Container, MenuItem } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Container>
      <main>
        <img src={logo} alt="FastFeet Logo" />

        <ul>
          <MenuItem active={history.location.pathname.includes('orders')}>
            <Link to="/orders">ENCOMENDAS</Link>
          </MenuItem>
          <MenuItem active={history.location.pathname.includes('delivermen')}>
            <Link to="/delivermen">ENTREGADORES</Link>
          </MenuItem>
          <MenuItem active={history.location.pathname.includes('recipients')}>
            <Link to="/recipients">DESTINATÁRIOS</Link>
          </MenuItem>
          <MenuItem active={history.location.pathname.includes('problems')}>
            <Link to="/problems">PROBLEMAS</Link>
          </MenuItem>
        </ul>
      </main>

      <aside>
        <p>Admin FastFeet</p>
        <button type="button" onClick={handleLogout}>
          sair do sistema
        </button>
      </aside>
    </Container>
  );
}
