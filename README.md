# Home Library Service

## Downloading

```bash
git clone https://github.com/demos-prog/nodejs2024Q3-service.git
```

## Testing and running

!!! BEFORE STARTING !!!

1. Change current work branch to `dev`

2. run:

```bash
npm i
```

3. Rename the `.env.example` file to `.env`

4. Start the server

```bash
npm start
```

5. Run tests in a separate terminal

```bash
npm run test:auth
```

6. !!! Important !!! If you encounter the error: `Authorization is not implemented`, please follow these steps:

   6.1 Run the following command to open Prisma Studio:
   ```bash
   npx prisma studio
   ```

   6.2 Open your browser and navigate to `http://localhost:5555`. 

   6.3 In Prisma Studio, manually delete all entries in the **Favorites** table and then all entries in the **User** table.

   6.4 After clearing the tables, run the tests again:
   ```bash
   npm run test:auth
   ```

## Running application

```bash
npm start
```

## Running application in Docker

```bash
npm run start:docker
```
