# Notes

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


