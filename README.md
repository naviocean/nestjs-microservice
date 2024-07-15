# NestjsMicroservice


## Generate Prisma Schema
```yarn nx run prisma-schema:generate-types ```

## Migrate 
```yarn nx run prisma-schema:migrate ```

Note: Need to run postgresql and setup `DATABASE_URL` in `.env`

## Start the Gateway API

```yarn nx run gateway-api:serve ```


## Start the Auth Service

```yarn nx run auth-sv:serve ```

