# Store-online-project

A Store online API written in NodeJS for Udacity. This application has APIs for Users, Products, and Orders.
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.
### Prerequisites

You need the following modules and dependencies installed to run this project:

```bash
node          # To run the server
npm              # For dependency
```
### Installing

Simply, run the following command to install the project dependencies:

```bash
npm
```
### Setup environment

First, create a `.env` file with all the required environment variables:

```bash
# .env
POSTGRES_DRIVER=pg
host=127.0.0.1
pg_port=5000
pg_db=store
DB_TEST=store_t
pg_user=postgres
pg_password=postgres
ENV=dev
BCRYPT_PASSWORD=secret-hash-password-123
SALT_ROUNDS=10
TOKEN_SECRET=wicked-witch-of-the-west
```

Next, start the Postgres server:

```bash
npm run start
```

Now, create the database


```bash


# Postgres shell
create database  store; 
create database  store_t;

```

Next, you need to run the database migrations:

```bash
db-migrate up
```
## Running the application

Use the following command to run the application in using node:

```bash
npm run start
```

The application will run on <http://localhost:5000/>.
## Running the unit tests

Use the following command to run the unit tests:

```bash
npm run test
```

You may also use the Postman collection present in the repository for testing.
## Built With

- [NodeJS](https://nodejs.org/) - The JavaScript runtime
- [npm](https://npm.com/) - The dependency manager
- [db-migrate](https://db-migrate.readthedocs.io/en/latest/) - The database migration tool
- [Express](https://expressjs.com) - The web framework
- [TypeScript](https://www.typescriptlang.org/) - Types JS extension
- [Jasmine](https://jasmine.github.io/) - The unit testing framework
## Endpoints

- See [REQUIREMENTS.md](./REQUIREMENTS.md) file


## Database Schema

 - See [REQUIREMENTS.md](./REQUIREMENTS.md) file
