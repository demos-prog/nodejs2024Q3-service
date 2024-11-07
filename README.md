# Home Library Service

## Downloading

```
git clone https://github.com/demos-prog/nodejs2024Q3-service.git
```

## Installing NPM modules

```
npm i
```

## Testing and running

!!! BEFORE STARTING !!!

1. Change current work branch to `dev`

2. Rename the `.env.example` file to `.env`

3. run:

```
npx prisma migrate dev --name init
```

4. run:

```
npm run seed
```

5. Start the server

```
npm start
```

6. Run tests in a separate terminal

```
npm run test
```

## Running application

```
npm start
```

## Running Docker

```
npm run start:docker
```
