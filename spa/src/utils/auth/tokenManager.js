const OAUTH_TOKEN = 'oauth_token';
const OAUTH_TOKEN_SECRET = 'oauth_token_secret';

export function setToken(oauth_token, oauth_token_secret) {
  localStorage.setItem(OAUTH_TOKEN, oauth_token);
  localStorage.setItem(OAUTH_TOKEN_SECRET, oauth_token_secret);
};

export function getToken() {
  return {
    oauth_token: localStorage.getItem(OAUTH_TOKEN) || '',
    oauth_token_secret: localStorage.getItem(OAUTH_TOKEN_SECRET) || ''
  };
};

export function hasToken() {
  const tokenString = localStorage.getItem(OAUTH_TOKEN);
  if (tokenString) {
    return true;
  }

  return false;
};

export function dropToken() {
  localStorage.removeItem(OAUTH_TOKEN);
  localStorage.removeItem(OAUTH_TOKEN_SECRET);
};
