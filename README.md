# REST API for quiz Real Smart

[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

  Fast, unopinionated, minimalist web framework for [Node.js](http://nodejs.org).

## Description
This REST API and Vue.js is designed for quiz Real Smart a Mongodb database.

## Installation and Setup

1. Install API dependencies:
   ```bash
   $ npm install
   ```

2. Create a `.env` file from the `.env.example`.

3. Start the API server:
   ```bash
   $ npm run dev # for development
   $ npm run start # for production
   ```

## Endpoints

### User Management

- **POST `/user/login`**: Login user
- **GET `/user/getAll`**: Retrieve all users
- **GET `/user/:id`**: Retrieve a user by ID
- **POST `/user/createUser`**: Create a new user
- **POST `/user/changePassword/:id`**: Change a user's password
- **PUT `/user/updateUser/:id`**: Update user details
- **DELETE `/user/deleteUser/:id`**: Delete a user

## License

  [MIT](LICENSE)