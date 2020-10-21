const admobSSV = require('./index');

/** Signed URL from google */
const testURL = 'verify?ad_network=5450213213286189855&ad_unit=3826813800&reward_amount=5&reward_item=coins&timestamp=1603301304534&transaction_id=147f17287596c1e105dc48686abaaf5e&user_id=hIUa1gWJKIhyoD2QMYxzog521O62&signature=MEQCIFbibACS03osaK1Xt__gaNaA7tHz4RSRKMvK7tkHmdYKAiA_LNgYMvIM6CVPxDJkRXER7pFbO7Rihvjd_RHTujiimg&key_id=3335741209';
/** Google keys from which this was signed */
const googleKeys = {"keys":[{"keyId":3335741209,"pem":"-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE+nzvoGqvDeB9+SzE6igTl7TyK4JB\nbglwir9oTcQta8NuG26ZpZFxt+F2NDk7asTE6/2Yc8i1ATcGIqtuS5hv0Q==\n-----END PUBLIC KEY-----","base64":"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE+nzvoGqvDeB9+SzE6igTl7TyK4JBbglwir9oTcQta8NuG26ZpZFxt+F2NDk7asTE6/2Yc8i1ATcGIqtuS5hv0Q=="}]};

admobSSV.verify(testURL, true).then(() => {
  console.log('Wow verification was successful');
}).catch(error => {
  console.error(error.message);
});