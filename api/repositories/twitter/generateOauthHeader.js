const generateNonce = require('./generateNonce');
const generateSignature = require('./generateSignature');

/**
 * [generateHeader description]
 * @param  {[type]}   url      [description]
 * @param  {[type]}   method   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
module.exports = (url, method, callback) => {
  if (!url || !method || !callback) {
    return '';
  }

  callback = encodeURIComponent(callback);
  const authObject = {
    oauth_callback: callback,
    oauth_consumer_key: process.env.TWITTER_CONSUMER_KEY,
    oauth_nonce: generateNonce(),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(new Date() / 1000),
    oauth_version: '1.0'
  };

  authObject.oauth_signature = generateSignature(
    url,
    method,
    authObject,
    process.env.TWITTER_SECRET_KEY
  );

  let authorizationHeader = 'OAuth ';
  Object.keys(authObject).map((key) => {
    const value = encodeURIComponent(authObject[key]);
    authorizationHeader += `${key}="${value}", `;
  });

  return authorizationHeader.substr(0, authorizationHeader.length-1);
};
