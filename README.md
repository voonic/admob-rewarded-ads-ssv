# admob-rewarded-ads-ssv

Server-side verification callbacks for admob rewarded ads in nodeJS

### Prerequisites 📋
* Node >= 12.0.0

If you are using firebase cloud functions, you can safely choose to have nodejs 12 runtime.
Add a function to listent to incoming http requests.

### Installing 🔧
Install via NPM

```
$ npm install --save admob-rewarded-ads-ssv
```

### How to use

Example with express

```JavaScript
const admobSSV = require('admob-rewarded-ads-ssv');

//Add callback to your rewarded ads in your admob account.
//Make sure you listen to 'get' request.

app.get('/ssv-verify', (req, res, next) => {
    // If you want to debug then send second param as true
    // admobSSV.verify(req.url, true);
    admobSSV.verify(req.url)
        .then(() => {
          //Verification Successful
        })
        .catch((e) => {
          //Verification Failed
          //console.error(e.message);
        });
});

```