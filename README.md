# watchman
watchman is a package that will reload its js file with every change you make.

It is worth mentioning that to carry out this project, the author was inspired by existing packages such as nodemon, restart etc...

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# installation
to start using watchman, in your projects you can use:

```bash
npm i watchman --save-dev
```

or with shortcuts:

```bash
npm i watchman -D
```

# usage
to implement watchman in your project, you can call watchman as a function and pass it the file name you want to monitor.

> [!NOTE]
> for now it only supports ECMAScript modules

```js
// src/index.js
import watchman from 'watchman'

if(process.env.NODE_ENV === 'developement'){
    watchman('./app.js')
}
```

and look like this, into package.json:

```json
{
    "scripts": {
        "start:dev": "NODE_ENV=development node ./app.js"
    }
}
```
# example - wachman in action
![watchman output](./docs/watchman-output.png)

# license
watchman was developed under the MIT license