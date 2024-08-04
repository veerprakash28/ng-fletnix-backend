# ng-fletnix-backend

Backend Repository of Fletnix Webapp Made using MongoDB and Node.js. This server handles authentication, and listing of tv shows and movies along with pagination, filter and search functionality.

## Links

Before you jump on to coding, Here is the live link for the App. Do give a star to the repo if you like :)

- [Live Link](https://ng-fletnix.netlify.app/home) (Fletnix - What to watch)
- [Frontend Repo](https://github.com/veerprakash28/ng-fletnix-frontend) (Repository of Frontend made using Angular 17)

## Prerequisites

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (installed and running)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/veerprakash28/ng-fletnix-backend.git
cd ng-fletnix-backend
```

### 2. Configure Environment Variables

- Create a `.env` file in the root directory of the project and add the following configuration:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/your-database-name
```

- Replace `your-database-name` with the name of your MongoDB database (preferred fletnix-auth).

### 3. Install Dependencies

- Run the following command to install the required dependencies:

```bash
npm install
```

### 4. Set Up MongoDB Collections

You need to create two collections in your MongoDB database:

- `users`
- `shows`

- Import Data into the shows Collection
  Download the CSV file from the provided link. [CSV Link](https://drive.google.com/file/d/1a9S-Qfs1Mc_SutljdvOEAnJ5QJLEAebB/view)
  Use a tool MongoDb Compass for easy import process

### 5. Start the Server

Start the server by running:
`npm start`

- The server will be running on the port specified in your .env file (default: 3000).

## API Endpoints

### Authentication

- **Signup:** `POST /users/signup` - Register a new user

  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string",
      "age": "number"
    }
    ```
  - **Validations:**
    - Email format and unique
    - Password strength
    - Age should be a number and greater than 0

- **Login:** `POST /users/login` - Login an existing user
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Validations:**
    - Email format
    - Password strength

### Shows

- **List Shows:** `POST shows/fetchShows` - List all shows with optional pagination, filtering, and search

  - **Request Body:**
    - `page` [Default 1] (number)
    - `search` [Title or Cast] (string)
    - `type` [TV Show / Movie] (string)

- **Show Details:** `GET /shows/:id` - Get details of a specific show by ID
  - **Query Params:**
    - `id` (MongoDB ObjectId)

## Contributing

1. **Fork the repository** and create a new branch for your changes.
2. **Make your changes** and ensure that they do not break existing functionality.
3. **Submit a pull request** with a description of the changes and any relevant information.

## License

This project is licensed under the [MIT License](LICENSE) - see the `LICENSE` file for details.
