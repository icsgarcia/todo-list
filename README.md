# Todo List API

A RESTful API for a Todo List application with user authentication, built with React, Node.js, Express, and MySQL (Amazon RDS compatible).

---

## 🚀 Features

-   User registration & login (JWT authentication)
-   Access & refresh token mechanism
-   CRUD operations for todos
-   User-based authorization
-   Error handling & security best practices
-   Data validation
-   Pagination, filtering, and sorting for todos

---

## 🗂️ Endpoints

### **Auth**

-   `POST /auth/register` — Register a new user
-   `POST /auth/login` — Login and receive tokens
-   `POST /auth/logout` — Logout and invalidate refresh token

### **Todos**

-   `GET /todos` — Get all todos (with pagination/filtering)
-   `POST /todos` — Create a new todo
-   `GET /todos/:id` — Get a single todo
-   `PUT /todos/:id` — Update a todo
-   `DELETE /todos/:id` — Delete a todo

---

## 🛠️ Tech Stack

-   **Frontend:** React
-   **Backend:** Node.js, Express
-   **Database:** MySQL (Amazon RDS/Aurora compatible)
-   **Authentication:** JWT (access & refresh tokens)
-   **ORM/Query:** mysql2

---

## ⚙️ Setup & Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/icsgarcia/todo-list.git
    cd todo-list
    ```

2. **Install dependencies:**

    For client:

    ```sh
    cd client
    npm install
    ```

    For server:

    ```sh
    cd ../server
    npm install
    ```

3. **Configure environment variables:**

    In `client/.env`:

    ```
    VITE_APP_API_URL=backend-url
    ```

    In `server/.env`:

    ```
    PORT=3000
    DB_HOST=your-db-host
    DB_NAME=your-db-name
    DB_USER=your-db-user
    DB_PASS=your-db-password
    DB_PORT=3306
    ACCESS_TOKEN_SECRET=your-access-secret
    REFRESH_TOKEN_SECRET=your-refresh-secret
    FRONTEND_URL=frontend-url
    ```

4. **Run the apps:**

    For client:

    ```sh
    npm run dev
    ```

    For server:

    ```sh
    npm run dev
    # or
    npm start
    ```

---

## 🧪 Testing

-   Unit tests: _Coming soon!_

---

## 📝 Requirements

-   User authentication (JWT)
-   RESTful API design
-   CRUD for todos
-   Error handling & security
-   Data validation
-   Pagination, filtering, and sorting

**Bonus:**

-   Unit tests
-   Rate limiting/throttling

---

## 🙋‍♂️ Author

-   [Ivan Christopher Garcia](https://github.com/icsgarcia)
