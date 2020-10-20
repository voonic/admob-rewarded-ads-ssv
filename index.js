async function verify(queryUrl) {

  if (typeof queryUrl !== "string") throw new TypeError("queryUrl needs to be string!");

  /**
   * Request coming as callback from admob must contain the 'signature' and the 'user_id'.
   * For more info https://developers.google.com/admob/android/rewarded-video-ssv
   */
  const {signature, key_id, user_id} = req.query;
  if (!signature || !user_id) {
    throw new Error('Invalid Key Signature or User Supplied');
  }


};

module.exports.verify = verify;
