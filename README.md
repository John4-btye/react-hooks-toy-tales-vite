# Toy Tales: Full CRUD Implementation

This project now supports full CRUD-style data interaction for toys using:

- `GET` on app load
- `POST` on form submit
- `DELETE` on donate
- `PATCH` on like

The implementation follows the required workflow pattern:

- `When X event occurs` -> `Make Y fetch request` -> `Update Z state`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the API server (`json-server`) at `http://localhost:3001`:

```bash
npm run server
```

3. In another terminal, start the Vite app:

```bash
npm run dev
```

4. Run tests:

```bash
npm test -- --run
```

## What Changed

### 1. Display All Toys (`GET /toys`)

Event:
- App loads.

Request:
- `App` makes `fetch("http://localhost:3001/toys")` inside `useEffect`.

State update:
- Response data is stored in `toys` state in `App`.

UI update:
- `App` passes `toys` into `ToyContainer`.
- `ToyContainer` maps over toys and renders one `ToyCard` per item.
- `ToyCard` now displays real toy details (`name`, `image`, `likes`) instead of placeholders.

### 2. Add a Toy (`POST /toys`)

Event:
- User submits the `ToyForm`.

Request:
- `App.handleAddToy` sends a `POST` request with:
  - `name`
  - `image`
  - `likes: 0` (always initialized to zero)

State update:
- The created toy from the server response is appended to `toys` state.

UI update:
- New toy appears immediately on the page without reload.

### 3. Donate a Toy (`DELETE /toys/:id`)

Event:
- User clicks `Donate to GoodWill` on a card.

Request:
- `App.handleDonateToy` sends `DELETE` to `/toys/:id`.

State update:
- The deleted toy is removed from `toys` with `filter`.

UI update:
- Card is removed from the list after successful delete.

### 4. Like a Toy (`PATCH /toys/:id`)

Event:
- User clicks `Like <3`.

Request:
- `App.handleLikeToy` sends `PATCH` to `/toys/:id` with `{ likes: currentLikes + 1 }`.

State update:
- The returned toy is merged with `map`, replacing only the matching toy by `id`.

UI update:
- Likes increment immediately.
- Toy order is preserved because `map` replaces in place rather than re-sorting or re-appending.

## Component Responsibilities

- `App.jsx`
  - Owns app-level state (`toys`, `showForm`)
  - Handles all fetch requests (`GET`, `POST`, `DELETE`, `PATCH`)
  - Passes data and callbacks to child components

- `ToyForm.jsx`
  - Uses controlled inputs (`name`, `image`)
  - Sends form data up to `App` on submit
  - Clears inputs after submit

- `ToyContainer.jsx`
  - Renders the toy list
  - Passes each toy and handlers down to `ToyCard`

- `ToyCard.jsx`
  - Displays toy details
  - Triggers like and donate callbacks

## Code Commenting Notes

Comments were intentionally added only where logic was multi-step or easy to misread (for example, preserving list order during like updates). Basic self-explanatory lines were left uncommented to keep the code clean.

## Validation

Test results after implementation:

- `AllToys.test.jsx` passed
- `ToyForm.test.jsx` passed
- `Donate.test.jsx` passed
- `Like.test.jsx` passed

Total: `4` test files, `5` tests passed.
