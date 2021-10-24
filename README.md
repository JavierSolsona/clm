# CLM Interview Javier Solsona

![sloth](https://media.giphy.com/media/7c8zUY2t0dsEcxu5on/giphy.gif)

Solution to CLM development challenge by Javier Solsona.

## Requirements

* docker >= 20.10.9
* docker-compose >= 2.0.1
* node >= 16.0.0
* npm >= 7.10.0 
* Available ports 8080, 8081

In the 8080 port the app will be running and in the 8081 a web viewer for the mongodb data.

## Environment creation

```sh
$ docker-compose build
$ docker-compose up -d
```

## Test the applicacion

![sloth](https://media.giphy.com/media/UDjF1zMreMld6/giphy.gif)

```sh
$ curl --location --request GET 'http://localhost:8080/api/movies/find/{title}'

$ curl --location --request GET 'http://localhost:8080/api/movies/find-all' \
--header 'index: {value}'

$ curl --location --request POST 'http://localhost:8080/api/movies/replace' \
--header 'Content-Type: application/json' \
--data-raw '{
    "movie": {title},
    "find": {value},
    "replace": {replace}
}'
```

Examples:


```sh
$ curl --location --request GET 'http://localhost:8080/api/movies/find/star%20wars'

$ curl --location --request GET 'http://localhost:8080/api/movies/find-all' \
--header 'index: 0'

$ curl --location --request POST 'http://localhost:8080/api/movies/replace' \
--header 'Content-Type: application/json' \
--data-raw '{
    "movie": "star wars",
    "find": "jedi",
    "replace": "Dev clm"
}'
```

## Turn off the application

```sh
$ docker-compose down
```
