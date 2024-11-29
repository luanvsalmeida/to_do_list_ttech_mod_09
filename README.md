# TODO App with JWT Authentication

This is a simple TODO application built using **Express.js**, **JWT authentication**, and **Joi validation**. The app allows users to manage tasks, with features for adding, updating, deleting, and listing tasks. User authentication is handled using JSON Web Tokens (JWT), which ensures secure access to the task management endpoints.

## Features

- **User Login**: Users can log in by providing a username and password. Upon successful login, a JWT token is issued.
- **Task Management**: Users can add, view, update, and delete tasks. All task operations are secured by JWT authentication.
- **Task Validation**: Task data is validated using **Joi** to ensure correct data format before storing or updating tasks.
- **JWT Authentication**: The app uses JWT to authenticate users, ensuring only authorized users can perform task operations.

## Requirements

- Node.js (v14 or later)
- npm (Node Package Manager)

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Run the application

To start the server, run:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## API Endpoints

### **POST /login**
- **Request Body**: 
    ```json
    {
      "user": "username",
      "password": "password"
    }
    ```
- **Response**: 
    - `status: true, token: <jwt-token>` (on success)
    - `status: false, msg: "Usuario/Senha invalidos"` (on failure)

### **GET /tasks**
- **Response**: 
    ```json
    {
      "status": true,
      "list": [ { "id": 1, "nome": "Task 1" }, { "id": 2, "nome": "Task 2" }]
    }
    ```

### **GET /tasks/:id**
- **Params**: `id` (task ID)
- **Response**: 
    - `status: true, task: { "id": 1, "nome": "Task 1" }` (on success)
    - `status: false, msg: "Tarefa não encontrada"` (on failure)

### **POST /tasks**
- **Headers**: 
    - `Authorization: Bearer <jwt-token>`
- **Request Body**: 
    ```json
    {
      "nome": "New Task"
    }
    ```
- **Response**: 
    - `status: true, task: { "id": 3, "nome": "New Task" }` (on success)
    - `status: false, msg: "Falha ao criar a tarefa"` (on failure)

### **PUT /tasks/:id**
- **Params**: `id` (task ID)
- **Headers**: 
    - `Authorization: Bearer <jwt-token>`
- **Request Body**: 
    ```json
    {
      "nome": "Updated Task Name"
    }
    ```
- **Response**: 
    - `status: true, task: { "id": 1, "nome": "Updated Task Name" }` (on success)
    - `status: false, msg: "Falha ao alterar a tarefa"` (on failure)

### **DELETE /tasks/:id**
- **Params**: `id` (task ID)
- **Headers**: 
    - `Authorization: Bearer <jwt-token>`
- **Response**: 
    - `status: true` (on success)
    - `status: false, msg: "Falha ao excluir a tarefa"` (on failure)

## Frontend

The app includes a simple frontend with two forms:

1. **Login Form**: Allows users to log in with a username and password. Upon successful login, a JWT token is stored in `localStorage`.
2. **Task Management Form**: After logging in, users can add, update, and delete tasks. Tasks are displayed in a list with buttons for editing and deletion.

## Technologies Used

- **Express.js**: Web framework for building the backend API.
- **JWT (JSON Web Token)**: Used for securing the API endpoints and user authentication.
- **Joi**: Used for validating the task data (ID and name).
- **Bootstrap**: Used for styling the frontend.
