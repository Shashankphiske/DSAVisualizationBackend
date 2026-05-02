# DSA Visualization Backend

TypeScript · Express · Redis · N-Layered Architecture

## Architecture

```
src/
├── config/          Express app factory + Redis config
├── controllers/     HTTP boundary — input validation, response shaping
├── services/        Business logic — parsing, validation, orchestration
├── repositories/    Algorithm step generation — pure computation
├── routes/          Route registration
├── middleware/      Redis cache middleware
├── types/           Shared TypeScript interfaces
├── utils/           Redis key utilities
├── logger/          Winston logger
└── tests/           Vitest unit tests (service layer)
```

## API Endpoints

### Sorting  `POST /sortingalgo/{algorithm}`
- `/bubblesort` `/selectionsort` `/insertionsort` `/mergesort` `/quicksort` `/heapsort`
- Body: `{ "arr": "[5,3,8,4,2]" }` (JSON-stringified array)
- Response: `{ "message": "success", "arr": SortStep[] }`

### Searching  `POST /searchingalgo/{algorithm}`
- `/linearsearch` `/binarysearch`
- Body: `{ "arr": "[2,5,8,12]", "num": 8 }`
- Response: `{ "message": "success", "arr": SearchStep[] }`

### Linked List  `POST /linkedlist/{operation}`
- `/singlyinsertion` `/singlydeletion` `/singlyreversal`
- `/doublyinsertion` `/doublydeletion` `/doublyreversal`
- Body varies by operation — see type definitions

### Stack  `POST /stackalgo/{operation}`
- `/stackpush`  Body: `{ "stack": [10,20], "push": [30] }`
- `/stackpop`   Body: `{ "stack": [10,20,30], "pop": 2 }`

### Queue  `POST /queuealgo/{operation}`
- `/enqueue`   Body: `{ "queue": [10,20], "enqueue": [30] }`
- `/dequeue`   Body: `{ "queue": [10,20,30], "dequeue": 2 }`

### Quiz (new)  `/quiz`
- `GET  /quiz/questions`              — all questions (sanitised, no answers)
- `GET  /quiz/questions?category=sorting&difficulty=beginner`
- `POST /quiz/answer`                 — body: `{ questionId, selectedIndex, timeSpentMs }`

### User Progress  `/users`
- `GET  /users/:dsatype`              — retrieve solved question IDs for IP
- `POST /users/:dsatype`              — save solved question IDs

## Step Response Format

Every step object now includes:
- `explanation` — plain-language description of the atomic operation
- `sorted` (sorting) — confirmed final-position indices
- `eliminated` (searching) — indices outside the active search window
- `action` (linked list, stack, queue) — operation label for animation

## Development

```bash
npm run dev        # ts-node-dev with hot reload
npm run build      # TypeScript compile to dist/
npm run test       # Vitest unit tests
npm run test:coverage
```

## Environment Variables

```
PORT=3000
REDIS_URL=redis://redis:6379
ACCOUNT=<google service account>
KEY=<private key>
SHEETID=<google sheet id>
```
