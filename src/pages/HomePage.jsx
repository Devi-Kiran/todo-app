import React, { useState, useEffect } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import TodoItem from "../components/TodoItem";

function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [all, setAll] = useState(true);
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);

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

  return (
    <>
      <header
        style={{ backgroundImage: "url('/images/day.jpeg')" }}
        className="h-72 bg-center py-8 md:py-16 px-4"
      >
        <div className="sm:max-w-[512px] mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="tracking-widest text-4xl uppercase text-white font-bold px-2">
              today tasks...
            </h1>
            <span
              className="text-white text-2xl"
              onClick={() => setDarkMode((prev) => !prev)}
            >
              {darkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
            </span>
          </div>
          <div className="bg-white flex items-center p-3 rounded-md dark:bg-darkSecondary dark:text-white">
            <button className="text-red-500 text-xl w-6 h-6 border-[1px] border-slate-500 rounded-full flex justify-center items-center">
              <MdCancel />
            </button>
            <input
              className="pl-3 p-1 focus:outline-0 font-medium bg-transparent"
              placeholder="Create a new task"
            />
          </div>
        </div>
      </header>
      <section>
        <div className="sm:max-w-[512px] mx-auto bg-white p-4 mt-[-50px] shadow-2xl rounded dark:bg-darkSecondary dark:text-white">
          <p className="mb-4">Total tasks 1, completed 1.</p>
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

          <div className="">
            <TodoItem />
            <TodoItem />
            <TodoItem />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;