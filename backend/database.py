import os
from dotenv import load_dotenv
from schemas import Todo
import motor.motor_asyncio
from typing import List, Optional

# Load environment variables
load_dotenv()

# MongoDB connection
client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGODB_CONNECTION_STRING"))
database = client.TodoList
Todos = database.Todos

# Database operations
async def fetch_one_todo(title: str) -> Optional[Todo]:
    """
    Fetch a single todo item by title.
    Args:
        title (str): The title of the todo item.
    Returns:
        Optional[Todo]: The found todo item, or None if not found.
    """
    document = await Todos.find_one({"title": title})
    return Todo(**document) if document else None

async def fetch_all_todo() -> List[Todo]:
    """
    Fetch all todo items.
    Returns:
        List[Todo]: A list of all todo items.
    """
    todos = []
    cursor = Todos.find({})
    async for document in cursor:
        todos.append(Todo(**document))
    return todos

async def create_one_todo(todo: dict) -> Todo:
    """
    Create a new todo item.
    Args:
        todo (dict): The todo item to create.
    Returns:
        Todo: The created todo item.
    """
    await Todos.insert_one(todo)
    document = await Todos.find_one({"title": todo["title"]})
    return Todo(**document)

async def update_todo(title: str, desc: str) -> Optional[Todo]:
    """
    Update the description of a todo item.
    Args:
        title (str): The title of the todo item to update.
        desc (str): The new description for the todo item.
    Returns:
        Optional[Todo]: The updated todo item, or None if not found.
    """
    result = await Todos.update_one({"title": title}, {"$set": {"description": desc}})
    if result.matched_count:
        document = await Todos.find_one({"title": title})
        return Todo(**document)
    return None

async def remove_todo(title: str) -> bool:
    """
    Remove a todo item by title.
    Args:
        title (str): The title of the todo item to remove.
    Returns:
        bool: True if the item was removed, False otherwise.
    """
    result = await Todos.delete_one({"title": title})
    return result.deleted_count > 0