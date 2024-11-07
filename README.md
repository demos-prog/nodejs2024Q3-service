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

4. run:

```
npx prisma migrate dev --name init
```

5. run:

```
npm run seed
```

6. Start the server

```
npm start
```

7. Run tests in a separate terminal

```
npm run test
```

## Running application

```
npm start
```

## Running application in Docker

```
npm run start:docker
```
