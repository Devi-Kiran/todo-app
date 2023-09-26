import React, { useContext } from "react";
import { TodoContext } from "../App";

function TodoItem({ id, todoTask, completed }) {
  const { taskDeleteHandler, taskCompltedHandler } = useContext(TodoContext);

  return (
    <div className="py-3 border-b-2 border-slate-300 rounded">
      <div className="flex">
        <button
          onClick={() => taskCompltedHandler(id)}
          className="text-lg w-7 h-7 border-[2px] border-slate-500 rounded-full flex justify-center items-center"
        >
          {completed && (
            <svg
              className="w-7 h-7 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full cursor-pointer text-white flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          )}
        </button>
        <p className={`grow ml-3 ${completed && "line-through decoration-2"}`}>
          {todoTask}
        </p>
        <button
          onClick={() => taskDeleteHandler(id)}
          className="w-7 h-7 p-1 text-white border-[2px] bg-orange-600 border-white rounded-full flex justify-center items-center shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
