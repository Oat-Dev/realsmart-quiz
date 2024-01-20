# REST API for quiz Real Smart

[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

  Fast, unopinionated, minimalist web framework for [Node.js](http://nodejs.org).

## Description
This REST API and Nuxt.js is designed for quiz Real Smart a Mongodb database.

## Installation and Setup API and WWW

1. Using Node version 16^

2. Install dependencies:
   ```bash
   $ npm install
   ```

3. Create a `.env` file from the `.env.example`.

4. Start the server:
   ```bash
   $ npm run dev # for development
   $ npm run start # for production
   ```

## Endpoints

### User Management

- **POST `/user/login`**: Login user
- **GET `/user/getAll`**: Retrieve all users
- **POST `/user/createUser`**: Create a new user
- **POST `/user/changePassword/:id`**: Change a user's password
- **PUT `/user/updateUser/:id`**: Update user details
- **DELETE `/user/deleteUser/:id`**: Delete a user

## License

  [MIT](LICENSE)