export function authentication(payload) {
  return {
    type: '@AUTH/AUTHENTICATION',
    payload,
  };
}

export function authenticationSuccess(payload) {
  return {
    type: '@AUTH/AUTHENTICATION_SUCCESS',
    payload,
  };
}

export function logout() {
  return {
    type: '@AUTH/LOGOUT',
  };
}
