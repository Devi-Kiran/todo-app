import React, { useState, useContext } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import TodoItem from "../components/TodoItem";
import { TodoContext } from "../App";

function Home({ darkMode, setDarkMode }) {
  const { todosList, updateTodos } = useContext(TodoContext);
  const [all, setAll] = useState(true);
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [task, setTask] = useState({
    id: "",
    todoTask: "",
    completed: false,
  });

  const countCompleted = todosList?.reduce((count, task) => {
    if (task.completed === true) {
      count++;
    }
    return count;
  }, 0);

  function allListHandler() {
    setAll(true);
    setActive(false);
    setCompleted(false);
  }

  function activeListHandler() {
    setActive(true);
    setAll(false);
    setCompleted(false);
  }

  function completedListHandler() {
    setCompleted(true);
    setAll(false);
    setActive(false);
  }

  function taskSubmitHandler(e) {
    e.preventDefault();
    if (task.todoTask) {
      let taskCopy = task;
      taskCopy = { ...task, id: Math.random() };
      setTask(taskCopy);
      updateTodos(taskCopy);
      setTask({ id: "", todoTask: "", completed: false });
    }
  }

  return (
    <>
      <header
        style={{
          backgroundImage: darkMode
            ? "url('/images/night.jpeg')"
            : "url('/images/day.jpeg')",
        }}
        className="bg-center"
      >
        <div class="h-72 bg-purple-500 py-8 md:py-16 px-4 bg-opacity-50">
          <div className="sm:max-w-[512px] mx-auto">
            <div className="flex justify-between items-start mb-8">
              <h1 className="tracking-widest text-4xl uppercase text-white font-bold px-2">
                today tasks...
              </h1>
              <span
                className="text-white text-2xl"
                onClick={() =>
                  setDarkMode((prev) => {
                    localStorage.setItem("todoDarkMode", JSON.stringify(!prev));
                    return !prev;
                  })
                }
              >
                {darkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
              </span>
            </div>
            <div className="bg-white flex items-center p-3 rounded-md dark:bg-darkSecondary dark:text-white">
              <button
                onClick={() =>
                  setTask({
                    id: "",
                    todoTask: "",
                    active: true,
                    completed: false,
                  })
                }
                className={`text-red-500 ${
                  !task.todoTask && "cursor-no-drop"
                } text-xl w-6 h-6 border-[1px] border-slate-500 rounded-full flex justify-center items-center`}
              >
                {task.todoTask && <MdCancel />}
              </button>
              <form onSubmit={taskSubmitHandler}>
                <input
                  className="pl-3 p-1 focus:outline-0 font-medium bg-transparent"
                  placeholder="Create a new task"
                  value={task.todoTask}
                  onChange={(e) =>
                    setTask((prev) => ({ ...prev, todoTask: e.target.value }))
                  }
                />
              </form>
            </div>
          </div>
        </div>
      </header>
      <section>
        <div className="sm:max-w-[512px] mx-auto bg-white p-4 pb-1 mt-[-50px] shadow-2xl rounded dark:bg-darkSecondary dark:text-white">
          <p className="mb-4">
            Total tasks {todosList?.length}, completed {countCompleted}.
          </p>
          <div className="mb-8">
            <button
              onClick={allListHandler}
              className={`${
                all ? "bg-primary text-white" : "bg-transparent text-primary"
              } mr-2 border-2 border-primary rounded-md px-3 py-1 font-semibold capitalize`}
            >
              all
            </button>
            <button
              onClick={activeListHandler}
              className={`${
                active ? "bg-primary text-white" : "bg-transparent text-primary"
              } mr-2 border-2 border-primary rounded-md px-3 py-1 font-semibold capitalize`}
            >
              active
            </button>
            <button
              onClick={completedListHandler}
              className={`${
                completed
                  ? "bg-primary text-white"
                  : "bg-transparent text-primary"
              } mr-2 border-2 border-primary rounded-md px-3 py-1 font-semibold capitalize`}
            >
              completed
            </button>
          </div>

          {all && (
            <div>
              {todosList?.map((task) => {
                return (
                  <TodoItem
                    key={task.id}
                    id={task.id}
                    todoTask={task.todoTask}
                    active={task.active}
                    completed={task.completed}
                  />
                );
              })}
            </div>
          )}

          {(active || completed) && (
            <div>
              {todosList?.map((task) => {
                if (task.completed === completed) {
                  return (
                    <TodoItem
                      key={task.id}
                      id={task.id}
                      todoTask={task.todoTask}
                      active={task.active}
                      completed={task.completed}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
