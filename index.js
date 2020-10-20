const crypto = require('crypto');
const axios = require('axios');
const GOOGLE_AD_KEY_URL = 'https://gstatic.com/admob/reward/verifier-keys.json';

/**
 * Fetches the google public keys for the admob providers.
 * These keys changes time to time.
 */
const getGoogleKeysMap = async () => {
  let googleKeyRes = await axios.get(GOOGLE_AD_KEY_URL);
  let {keys} = googleKeyRes.data;
  if (!keys) {
    throw new Error('No keys found from google keys');
  }
  /** For each of the keys array save it base 64 in decoded form in the key map */
  let keyMap = {};
  keys.forEach(k => {
    keyMap[`${k.keyId}`] = crypto.createPublicKey(k.pem);
  });
  return keyMap;
};

/**
 * Checks whether a url is absolute URL.
 * @param {String} url
 */
const isAbsoluteURL = (url) => {
  var pattern = /^((http|https):\/\/)/;
  return pattern.test(url);
};

/**
 * Verifies the callback url query params string,
 * Resolves the promise if verification was successful, else fails.
 * @param {String} queryUrl 
 */
async function verify(queryUrl) {

  if (typeof queryUrl !== "string") throw new TypeError("queryUrl needs to be string!");

  /**
   * Request coming as callback from admob must contain the 'signature' and the 'user_id'.
   * For more info https://developers.google.com/admob/android/rewarded-video-ssv
   */
  const {signature, key_id} = req.query;
  if (!signature) {
    throw new Error('Invalid Key Signature Supplied');
  }

  let queryParamsString = queryUrl;
  /* If url passed is absolute then extract the query params URL. */
  if (isAbsoluteURL(queryUrl)) {
    queryParamsString = queryUrl.split('?')[1];
  }

  /**
   * As per admob, 
   * The last two query parameters of rewarded video SSV callbacks are always signature and key_id, in that order.
   * The remaining query parameters specify the content to be verified. 
   */
  let contentToVerify = queryParamsString.substring(0, rawURL.indexOf('signature') -1);

  let keyMap = await getGoogleKeysMap();

  if(keyMap[`${key_id}`]) {
    let publicKey = keyMap[`${key_id}`];
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(contentToVerify);
    let result = verifier.verify(publicKey, signature, 'base64');
    if (result) {
      return true;
    } else {
      throw new Error('Invalid Signature Supplied');
    }
  } else {
    throw new Error('Key id provided doesn\'t exist in the google public keys');
  }
};

module.exports.verify = verify;
