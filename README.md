# admob-rewarded-ads-ssv

Server-side verification callbacks for admob rewarded ads in nodeJS

### Prerequisites 📋
* Node >= 12.0.0

If you are using firebase functions, you can safely chose to have nodejs 12 as runtime.

### Installing 🔧
Install via NPM

```
$ npm install --save admob-rewarded-ads-ssv
```

### Usage 📦

Example with express

```JavaScript
const admobSSV = require('admob-rewarded-ads-ssv');

app.get('/ssv-verify', (req, res, next) => {
    admobSSV.verify(req.url)
        .then(() => {
          //Verification Successful
        })
        .catch((e) => {
            //Verification Failed
        });
});

```