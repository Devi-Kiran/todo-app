import "./App.css";
import React, { useEffect, useState, createContext } from "react";
import Home from "./pages/HomePage";

export const TodoContext = createContext();

function App() {
  const element = document.documentElement;
  const [darkMode, setDarkMode] = useState(false);
  const [todosList, setTodosList] = useState([]);

  const updateTodos = (newTask) => {
    setTodosList((prev) => {
      const updatedData = [...prev, newTask];
      localStorage.setItem("todoTasks", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const taskDeleteHandler = (id) => {
    setTodosList((prev) => {
      const filtered = prev?.filter((task) => {
        return task?.id !== id;
      });
      localStorage.setItem("todoTasks", JSON.stringify(filtered));
      return filtered;
    });
  };

  const taskCompltedHandler = (id) => {
    setTodosList((prev) => {
      const completed = prev?.map((task) => {
        if (task?.id === id) {
          return { ...task, completed: !task?.completed };
        } else {
          return task;
        }
      });
      localStorage.setItem("todoTasks", JSON.stringify(completed));
      return completed;
    });
  };

  const contextValue = {
    todosList,
    updateTodos,
    taskDeleteHandler,
    taskCompltedHandler,
  };

  useEffect(() => {
    if (darkMode) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    setDarkMode(JSON.parse(localStorage.getItem("todoDarkMode")));
    setTodosList(
      JSON.parse(localStorage.getItem("todoTasks"))
        ? JSON.parse(localStorage.getItem("todoTasks"))
        : []
    );
  }, []);

  return (
    <div className="App min-h-screen dark:bg-darkPrimary">
      <TodoContext.Provider value={contextValue}>
        <Home darkMode={darkMode} setDarkMode={setDarkMode} />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
