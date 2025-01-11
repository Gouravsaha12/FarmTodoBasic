import os
from dotenv import load_dotenv
from schemas import Todo
import motor.motor_asyncio

load_dotenv()

client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGODB_CONNECTION_STRING"))

database = client.TodoList
Todos = database.Todos

async def fetch_one_todo(title):
    document = await Todos.find_one({"title": title})
    return document

async def fetch_all_todo():
    todos = []
    cursor = Todos.find({})
    async for document in cursor:
        todos.append(Todo(**document))
    return todos

async def create_one_todo(todo):
    await Todos.insert_one(todo)
    return await Todos.find_one({"title": todo["title"]})

async def update_todo(title, desc):
    await Todos.update_one({"title":title}, {"$set":{"description":desc}})
    doc = await Todos.find_one({"title":title})
    return Todo(**doc)

async def remove_todo(title):
    await Todos.delete_one({"title":title})
    return True

