# Home Library Service

## Downloading

```
git clone https://github.com/demos-prog/nodejs2024Q3-service.git
```

## Testing and running

!!! BEFORE STARTING !!!

1. Change current work branch to `dev`

2. run:

```
npm i
```

3. Rename the `.env.example` file to `.env`

4. Start the server

```
npm start
```

5. Run tests in a separate terminal

```
npm run test:auth
```

6. !!! Important !!! If you got an error: `Authorization is not implemented`

6.1 run:

```
npx prisma studio
```

6.2 Open browser on `http://localhost:5555` and delete manualy all favorites (in FAvorites table) then all users (in User table)

6.3 run:

```
npm run test:auth
```

## Running application

```
npm start
```

## Running application in Docker

```
npm run start:docker
```
