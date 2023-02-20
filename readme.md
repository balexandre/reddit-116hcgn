# Reddit helper for question 116hcgn

Answer can be found on [Reddit](https://www.reddit.com/r/node/comments/116hcgn)

***

A simple project that creates a basic REST API to handle MongoDB documents via mongoose package, and provides Open API documentation as HTML page as well using it for route validation

## Project structure

One gets used to some kind of configurationless setup, and having an `index` file in each folder allows one to import only the default, and have all objects named buy file name, so when adding a new model, engine or route, one only need to add one more file and do not worry about imports paths...

## REST Client extension

It uses an `.http` file (found in the `test` folder) that creates a POSTMAN alike query with the VS Code extension [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## Documentation

One can run `npm run docs` to generate an HTML file containing the API documentation

## Route validation

Open API schema is also been used to validate the routes

## Run with Docker

you can easily have a MongoDB instance using Docker, after install [Docker Desktop](https://www.docker.com/products/docker-desktop/) or [Rancher Desktop](https://rancherdesktop.io/), run

```bash
docker run -d -p 27017:27017 --name mongoDB -d mongo:latest
```

and the application will then be able to connect via `mongodb://localhost/<db_name>` connection string