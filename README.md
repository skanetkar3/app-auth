## Description

Authentication application build on top of Nest

## Getting Started

First clone the codebase and install dependencies via

```bash
$ npm install
```

Next run the server via

```bash
$ npm run start
```

When the server is running you'll be able to access the two endpoints at `http://localhost:3000/YOURENDPOINT`

## API Endpoints

The `/authenticate` endpoint returns a JWT after recieving a request body with the following properties. This is the username and password used to generate the user info in the .env file

```json
{
  "username": "user",
  "password": "password"
}
```

The `/welcome` endpoint returns a welcome string after recieving a request with the following header property

```json
{
  "Bearer": "examplejwttokenstring1234"
}
```

## Testing

Two examples unit tests were written for the auth.controller file. Both these tests examine the success conditions of the two routes. As the application grows it will become important to develop the testing suite futher as laid out below.

- Test failure cases (wrong user, invalid password, etc)
- End to end testing (simulating user actions)
- Use a test db and dynamically generate values

Run the example unit tests via

```bash
# unit tests
$ npm run test
```

## Design Considerations

1. Three layer design

```
   - The application uses the Controller, Service, Database convention
   - Controllers handle routes and http logic
   - Services handle business logic
   - Databases handle data access and manipulation (Because a database was not required, this layer was ommitted in place of the .env file)
```

2. Nest vs Express

```
   - Nest was chosen due to the scalability it adds to the application
   - Built in decorators for Controllers can help to simplify routing
   - Injectable decorators for Services allow dependency injection to be used across the application
   - Nest also comes with the Jest test engine out of the box, simplifying automated testing
```

3. Typescript vs JS

```
   - Typescript was chosen due to its ability to make code more maintainable in the long run
   - Strong typing also assists during development with autocomplete and typeErros
```
