# Back-End Setup Guide

Follow these steps to set up and run the back-end source:

---

## Steps to Run the Project

1. **Install Dependencies**
   ```bash
   yarn
   ```

2. **Initialize Prisma**
   ```bash
   yarn prisma init
   ```

3. **Update Environment Variables**
   - Open \`.env\` and replace the database URL:
     ```env
     DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
     ```
     **with:**
     ```env
     DATABASE_POSTGRES_URL="postgresql://postgres:<your-password>@localhost:5432/baemin_db"
     ```

4. **Create the Database**
   - Go to your PostgreSQL DB management tool and create a database named \`baemin_db\`.

5. **Run SQL Scripts**
   - Execute the required **DDL** and **DML** scripts on the \`baemin_db\` database.

6. **Generate Prisma Client**
   ```bash
   yarn prisma generate --schema src/prisma/schema-postgres.prisma
   ```

7. **Run the development server**
    ```bash
   yarn start:dev
   ```
---

## Swagger Documentation

Access the Swagger API documentation at the following path:

```
http://localhost:8080/api-baemin
```

---

### Notes

- Ensure PostgreSQL is running on your local machine and the credentials match the \`.env\` file configuration.
- Make sure to execute the DDL before DML to avoid errors in database initialization.
`



# Front-End Setup Guide

Follow these steps to set up and run the front-end source:

---

## Steps to Run the Project

1. **Install Dependencies**
   ```bash
   yarn
   # or
   npm install
   ```

2. **Run the development server**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```