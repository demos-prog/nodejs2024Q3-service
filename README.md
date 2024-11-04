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

## Testing

!!! BEFORE STARTING TESTS !!!

1. Rename the '.env.example' file to '.env'

2. run:

```
npx prisma migrate dev --name init
```

3. run:

```
npm run seed
```

4. Start the server

```
npm start
```

5. Run tests in a separate terminal

```
npm run test
```
