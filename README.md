# API documentation

There are currently two approaches being pursued towards this goal

1. using postman - this is a widely used tool for testing RESTful APIs and does a nice job of capturing a lot of information
2. using swagger - this is a documentation tool which has some testing capabilities embedded within it. It is very useful because of the vast amount of information it can capture

**postman**

The collection of postman endpoints can be found in *[root-dir]/schema/postman.json*. Simply import this into postman and you will be ready for testing.

Navigate to the project folder from the command line. When ready, simply execute *npm run start:watch*. This will start the development server and get it ready for testing alongside postman

**swagger**

The swagger specifications can be found in *[root-dir]/api-docs/specs/swagger.js*.

Start the development server *(npm run start:watch)* and from a browser, navigate to [/api-docs](http://localhost:5000/api-docs). You will be greated with the documentation page, and should be ready for testing

---

# Color schema

Check out **_frontend\src\css\custom.css_** for the proposed color scheme. The primary color is a soft shade of *red* with a *white* contrast.

---

to create a random sequence of characters, like secrets, you can use the _crypto_ library that ships with nodejs

```js
node
require('crypto').randomBytes(64).toString('hex');
.exit
```

## Database deployment notes

```bash
docker pg client

docker run -it --rm jbergknoff/postgresql-client postgres://postgres:4dA6nkzWKpo4N3d@mind-flip-db.flycast:5432
```

## connect to fly.io postgres

```fly postgres connect -a mind-flip-db```

## list databases

```\l```

## create a database

```create database <database-name>```

## switch database (connect to database)

```\c <database-name>```

## list (describe) database tables

```\dt```

## describe a database table

```\dt <table-name>```

## generate jwt_secret string

```js
node <hit enter key>
require("crypto").randomBytes(35).toString("hex")
```

