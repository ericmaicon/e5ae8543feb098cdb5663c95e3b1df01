const OAUTH_TOKEN = 'oauth_token';
const OAUTH_TOKEN_SECRET = 'oauth_token_secret';

/**
 * set tokens in local storage
 * @param {string} oauth_token
 * @param {string} oauth_token_secret
 */
export function setToken(oauth_token, oauth_token_secret) {
  localStorage.setItem(OAUTH_TOKEN, oauth_token);
  localStorage.setItem(OAUTH_TOKEN_SECRET, oauth_token_secret);
};

/**
 * get both tokens
 * @return {object}
 */
export function getToken() {
  return {
    oauth_token: localStorage.getItem(OAUTH_TOKEN) || '',
    oauth_token_secret: localStorage.getItem(OAUTH_TOKEN_SECRET) || ''
  };
};

/**
 * check whether the token exists or not
 *
 * @return {Boolean}
 */
export function hasToken() {
  const tokenString = localStorage.getItem(OAUTH_TOKEN);
  if (tokenString) {
    return true;
  }

  return false;
};

/**
 * drop tokens from local storage
 */
export function dropToken() {
  localStorage.removeItem(OAUTH_TOKEN);
  localStorage.removeItem(OAUTH_TOKEN_SECRET);
};
