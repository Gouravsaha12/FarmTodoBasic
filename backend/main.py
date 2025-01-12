from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas import Todo, UpdateTodoBody

from database import (
    fetch_one_todo,
    fetch_all_todo,
    remove_todo,
    update_todo,
    create_one_todo
)

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/todo/all")
async def get_all_todo():
    response = await fetch_all_todo()
    return response

@app.get("/todo/{title}", response_model=Todo)
async def get_all_todo(title):
    response = await fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(404, f"there is no todo item with this title {title}")

@app.post("/todo/create", response_model=Todo)
async def add_todo(todo:Todo):
    response = await create_one_todo(todo.model_dump())
    if response:
        return response
    raise HTTPException(404, f"there is a problem while creating")

@app.put("/todo/update/{title}")
async def update_todo_route(title: str, body: UpdateTodoBody):
    response = await update_todo(title, body.desc)
    if response:
        return response
    raise HTTPException(404, f"there is a problem while updating")

@app.delete("/todo/delete/{title}")
async def delete_todo(title):
    response = await remove_todo(title)
    if response:
        return response
    raise HTTPException(404, f"there is a problem while deleting")

