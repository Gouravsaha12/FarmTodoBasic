import React, { useRef, useState } from "react";
import axios from "axios";

const EditTodo = ({editTitle, editDesc, onClose}) => {
  const newReviewRef = useRef();
  const [title, setTitle] = useState(editTitle);
  const [desc, setDesc] = useState(editDesc);

  const closeNewReview = (e) => {
    if (newReviewRef.current === e.target) {
      onClose();
    }
  };

  const handleEdit = () => {
    axios.put(`http://127.0.0.1:8000/todo/update/${title}`, {desc})
    .then(res=>{
        console.log(res)
        onClose();
    })
  };

  return (
    <div
      ref={newReviewRef}
      onClick={closeNewReview}
      className="fixed inset-0 bg-black text-black bg-opacity-30 backdrop-blur-sm z-50 flex flex-col justify-center items-center"
    >
      <div>
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
          readOnly
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
        <button onClick={handleEdit} className="bg-sky-400 py-1 px-3 rounded-sm mt-1">Edit</button>
      </div>
    </div>
  );
};

export default EditTodo;
