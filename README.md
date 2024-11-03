# Home Library Service

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

!!! BEFORE STARTING TESTS !!!

1. run:

```
npm run seed
```

2. Start the server

```
npm start
```

3. Create a User manualy (using Postman):

- method: POST
- url: http://localhost:4000/user
- body: {"login": "userName", "password": "userPassword"}

4. Create a Track manualy (using Postman):

- method: POST
- url: http://localhost:4000/track
- body: {"name": "trackName", "duration": 123}
- Save reurned trackId

5. Create a Favorites List manualy (using Postman):

- method: POST
- url: http://localhost:4000/favs/track/"trackId"

6. Run tests in separate terminal

```
npm run test
```
