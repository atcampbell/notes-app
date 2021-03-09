Node application create, update, view and delete notes. Created with express, mongodb and typescript.

Run:

`docker-compose up -d`

The application will be available at localhost:8080

API:

`GET /api/notes`

- get all notes

`GET /api/notes/{id}`

- get a single note by ID. ID created by mongo

`POST /api/notes`

- create a note
- note title must be unique
- example request body

```json
{
    "title": "my note",
    "content": "my note content"
}
```

`PUT /api/notes/{id}`

- update a note with id
- example request body

```json
{
    "content": "my new note content"
}
```

`DEL /api/notes/{id}`

- delete a note with id

Tests can be run with `npm run test`

