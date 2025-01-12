import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import EditTodo from "./components/EditTodo";

function App() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [todos, setTodos] = useState([{}]);
  const [isEdit, setIsEdit] = useState(false);

  const [editTitle, setEditTitle] = useState()
  const [editDesc, setEditDesc] = useState()

  const getAllTodo = () => {
    axios.get("http://127.0.0.1:8000/todo/all").then((res) => {
      setTodos(res.data);
    });
  };

  useEffect(() => {
    getAllTodo();
  }, []);

  const addTodoHandler = () => {
    axios
      .post("http://127.0.0.1:8000/todo/create", {
        title: title,
        description: desc,
      })
      .then((res) => {
        getAllTodo();
        console.log(res);
      });
    setTitle("");
    setDesc("");
  };

  const deleteATodo = (title) => {
    axios.delete(`http://127.0.0.1:8000/todo/delete/${title}`).then((res) => {
      getAllTodo();
      console.log(res);
    });
  };

  const editTodo = (title, desc) => {
    setEditTitle(title)
    setEditDesc(desc)
    setIsEdit(true)
  }

  const editDone = () => {
    setIsEdit(false)
    getAllTodo()
  }

  return (
    <>
      <div className=" w-screen h-screen flex flex-col justify-center items-center bg-gray-950">
        <div className="w-[550px] m-4">
          <h1 className="bg-sky-400 py-1 px-3 rounded-sm font-semibold">
            Add a Todo
          </h1>
          <input
            type="text"
            name=""
            id=""
            className="w-full p-1 my-1 mt-2"
            placeholder="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            type="text"
            name=""
            id=""
            className="w-full p-1 my-1"
            placeholder="description"
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
          />
          <button
            onClick={addTodoHandler}
            className="bg-sky-400 py-1 px-3 rounded-sm mt-1"
          >
            Add
          </button>
        </div>

        <div className="w-[550px] m-4">
          <h1 className="bg-sky-400 py-1 my-1 px-4 rounded-sm font-semibold">
            Your Todos
          </h1>
          <div className="h-[40vh] overflow-y-auto space-y-2 scrollbar-none">
            {todos.map((todo, index) => (
              <div className="w-full flex justify-between  bg-white text-blue-900 mt-1 px-4 py-1">
                <h1 key={index} className="font-semibold">
                  {todo.title} -{" "}
                  <span className="font-normal">{todo.description}</span>
                </h1>
                <div className="">
                  <button onClick={()=>{editTodo(todo.title, todo.description)}} className="text-blue-800 mr-3">
                    <CiEdit size={20} />
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => {
                      deleteATodo(todo.title);
                    }}
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isEdit ? <EditTodo editTitle={editTitle} editDesc={editDesc} onClose={editDone}/> : "" }
    </>
  );
}

export default App;
