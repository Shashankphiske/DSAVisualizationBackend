# DSA Visualization Backend

A robust Node.js/TypeScript backend providing step-by-step execution snapshots for various Data Structures and Algorithms. Built with a focus on performance, maintainability, and clean logging.

## Features

- **Algorithm Snapshots**: Detailed state tracking for Sorting, Searching, Graphs, Trees, and Dynamic Programming.
- **Service Layer Pattern**: Decoupled business logic from repository-based algorithm implementations.
- **Robust Testing**: 100% unit test coverage using **Vitest**.
- **Observability**: Integrated **Winston** & **Morgan** for request tracing and execution time logging.
- **Safety**: Built-in **Rate Limiting** (50 req/min) to prevent abuse.

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Logging**: Winston & Morgan
- **Testing**: Vitest
- **Rate Limiting**: express-rate-limit

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shashankphiske/DSAVisualizationBackend.git
   ```

2. Install Dependencies:
    ```bash
    cd DSAVisualizationBackend
    npm i
    ```

3. Setup environment variables:
    ```bash
    PORT=3000
    NODE_ENV="development"
    REDIS_URL="redis://localhost:6379
    ```

4. Running the app:
    ```bash
    npm run dev
    ```
5. Make sure you have local redis server installed

## Testing

1. Run all tests:
    ```bash
    npm run test
    ```

2. Run test with UI:
    ```bash
    npm run test:ui
    ```

3. Run test with coverage:
    ```bash
    npm run test:coverage
    ```

## Logging configuration

Logs are stored in /logs directory:

1. combined.log: All application level logs
2. error.log: All error logs

## Docker Configuration

```bash
    docker compose up --build --scale node-app=2
    # Make sure that in .env:
    REDIS_URL:"redis://redis:6379"
```

## View Docker Logs
```bash
    docker compose logs -f
```

## Project Structure:
```
/DSAVisualizationBackend/
├── src/
│   ├── config/      
│   ├── controllers/
│   ├── repository/ 
|   ├── middleware/
│   ├── routes/  
│   ├── services/ 
│   ├── types/  
│   ├── tests/  
│   ├── utils/  
│   └── server.ts
├── logs/  
├── coverage/ 
└── vitest.config.ts
```