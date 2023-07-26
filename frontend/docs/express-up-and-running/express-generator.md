---
sidebar_position: 1
---

# Minimal express server

For convenience with executing **npm** modules existing in the public npm repository, without having to explicitly 
install the required libraries, then using **npx** is an excellent way to go. Having said that, the easiest way to 
generate a barebones express server project is to use **express-generator**

To view other options available with **express-generator**, you should run

```npm
npx express-generator --help
```

The options we care about for this illustration are just **--no-view**, because the point is to focus on REST endpoints.

```npm
mkdir bbexpress && cd bbexpress
npx express-generator --no-view
```

The directory structure created looks like shown here

```html
│   app.js
│   package.json
├───bin
│       www
├───public
│   │   index.html
│   ├───images
│   ├───javascripts
│   └───stylesheets
│           style.css
└───routes
home.js
data.js
```

In the **public** directory, feel free to delete everything except the **index.html** file. This will be the default 
content to serve when testing for the server liveliness

In the **routes** folder, rename **home.js** to **home.js**. This will contain two routes for liveliness testing.

In the **routes** folder, create an empty **home.js** file to serve as the entry point for all other routes in the 
application. 


```js title="routes/index.js"
const express = require('express');
const router = express.Router();
const homeRouter = require('./home');
const usersRouter = require('./users');

router.use('/', homeRouter);
router.use('/users', usersRouter);
```

Update the **home** module to serve endpoints for liveliness testing

```js title="routes/home.js"
const express = require('express');
const router = express.Router();

function homePage(req, res, next) {
    try {
        const content = fs.readFileSync(
            path.join(process.cwd(), 
            'public/index.html'), 
            { encoding: 'utf8', flag: 'r' },
        )
        res.send(content);
    }
    catch (e) {
        next(e);
    }
}

function healthCheck(req, res, next) {
    try {
        res.send(`${process.env.HEALTHY_MESSAGE}\n`);
    }
    catch (e) {
        next(e);
    }
}

router.get('/', homePage);

router.get('/health', healthCheck);

module.exports = router;
```

You can optionally update the **users** module

```jsx title="routes/data.js"
var express = require('express');
var router = express.Router();

function handleGetUsers(req, res, next) {
    res.send('respond with a resource');
}

/* GET users listing. */
router.get('/', handleGetUsers);

module.exports = router;

```

Update the **app.js** to accommodate the changes in the routes

```js title="app.js"
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var router = require('./routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);

module.exports = app;
```

## Update dependencies in **package.json**

For good measure, update the dependencies in **package.json** since the default ones can be quite outdated

```npm
npm i
npm audit fix --force
```

A barebones express server is now reach for serving content witht he **/api** entry point. The completed directory
structure now looks like this.

```html
│   app.js
│   package.json
├───bin
│       www
├───public
│       index.html
└───routes
        home.js
        index.js
        data.js
```
