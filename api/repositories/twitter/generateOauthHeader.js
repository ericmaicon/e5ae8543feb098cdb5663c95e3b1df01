const generateNonce = require('./generateNonce');
const generateSignature = require('./generateSignature');

/**
 * generate oauth header object
 *
 * @param  string url endpoint that will be hit
 * @param  string method the HTTP method
 * @param  object oauthToken token used to generate signature
 * @param  object extraHeaders to be included in the header
 * @param  object formData used to calculate signature
 * @return object
 */
function generateOauthHeader(url, method, oauthToken = '', extraHeaders = {}, formData = {}) {
  if (!url || !method) {
    return '';
  }

  const authObject = Object.assign({
    oauth_consumer_key: process.env.TWITTER_CONSUMER_KEY,
    oauth_nonce: generateNonce(),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(new Date() / 1000),
    oauth_version: '1.0'
  }, extraHeaders);

  authObject.oauth_signature = generateSignature(
    url,
    method,
    Object.assign(authObject, formData),
    process.env.TWITTER_SECRET_KEY,
    oauthToken
  );

  return authObject;
}

/**
 * get the oauth header object and convert to a string
 * @param  object authObject
 * @return string
 */
function parseToString(authObject) {
  let authorizationHeader = 'OAuth ';
  Object.keys(authObject).map((key) => {
    const value = encodeURIComponent(authObject[key]);
    authorizationHeader += `${key}="${value}", `;
  });

  return authorizationHeader.substr(0, authorizationHeader.length-1);
}

module.exports = {
  generateOauthHeader,
  parseToString
};
