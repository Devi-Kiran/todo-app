import "./App.css";
import React, { useEffect, useState, createContext } from "react";
import Home from "./pages/HomePage";
import axios from "axios";

export const TodoContext = createContext();

function App() {
  const element = document.documentElement;
  const [darkMode, setDarkMode] = useState(false);
  const [todosList, setTodosList] = useState([]);

  useEffect(() => {
    setDarkMode(JSON.parse(localStorage.getItem("todoDarkMode")));

    axios
      .get("http://localhost:9000/todoes")
      .then((response) => {
        setTodosList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (darkMode) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, [darkMode]);

  const addTodo = (newTask) => {
    axios
      .post("http://localhost:9000/todoes", {
        ...newTask,
      })
      .then((response) => {
        setTodosList((prev) => {
          return [...prev, response.data];
        });
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };

  const taskDeleteHandler = (id) => {
    axios
      .delete(`http://localhost:9000/todoes/${id}`)
      .then((response) => {
        console.log("Deleted:", response.data);
        setTodosList((prev) => {
          return prev?.filter((todo) => {
            return todo?._id !== id;
          });
        });
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const taskCompltedHandler = (id) => {
    const todo = todosList.find((todo) => todo?._id == id);
    const data = { completed: !todo.completed };

    axios
      .patch(`http://localhost:9000/todoes/${id}`, data)
      .then((response) => {
        console.log("Response:", response.data);
        setTodosList((prev) => {
          const completed = prev?.map((task) => {
            if (task?._id === id) {
              return { ...task, completed: !task?.completed };
            } else {
              return task;
            }
          });
          return completed;
        });
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const contextValue = {
    todosList,
    addTodo,
    taskDeleteHandler,
    taskCompltedHandler,
  };

  return (
    <div className="App min-h-screen dark:bg-darkPrimary">
      <TodoContext.Provider value={contextValue}>
        <Home darkMode={darkMode} setDarkMode={setDarkMode} />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
