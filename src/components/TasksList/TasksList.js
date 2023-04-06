import React, { useEffect } from "react";
import { useState } from "react";
import FormTask from "../FormTask";
import "./TasksList.css";

function TasksList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const storageTasks = JSON.parse(localStorage.getItem("tasks"));
    return storageTasks ?? [];
  });
  const [select, setSelect] = useState(false);
  const [statusSelect, setStatusSelect] = useState("all");
  const [statusList, setStatusList] = useState(-1);

  useEffect(() => {
    const jsonTasks = JSON.stringify(tasks);
    localStorage.setItem("tasks", jsonTasks);
    // console.log("fixxed");
  }, [tasks]);
  // console.log(tasks);

  const addTask = () => {
    if (task === "") return;
    setTasks((prev) => [
      ...prev,
      {
        id: new Date().getTime(),
        text: task,
        isCompleted: false,
      },
    ]);
    setTask("");
  };

  const handleDelete = (currentTask) => {
    // console.log(currentTask);
    setTasks((prev) => prev.filter((task) => task.id !== currentTask.id));
  };

  const handleEdit = (currentTask, newText) => {
    if (newText === "") {
      handleDelete(currentTask);
      return;
    }
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === currentTask.id) return { ...task, text: newText };
        return task;
      })
    );
  };

  const handleCheck = (currentTask) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === currentTask.id)
          return { ...task, isCompleted: !currentTask.isCompleted };
        return task;
      })
    );
  };

  return (
    <div className="tasks-list">
      <div className="tasks-list-header">
        <div className="task-input" tabindex="1">
          <input
            type="text"
            required
            id=""
            tabindex="1"
            className="task-input_add"
            placeholder="    Add your task ... :3"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
            autoFocus
          />
          <i
            onClick={addTask}
            className="task-input_icon fa-solid fa-circle-plus"
          ></i>
        </div>
        <div className="task-select">
          <div
            onClick={() => {
              setSelect(!select);
            }}
            className="task-select-single"
          >
            <div className="task-select-text">{statusSelect}</div>
            <i className="task-select-icon fa-solid fa-chevron-down"></i>
          </div>

          <div
            className={
              select ? "task-select-list" : "task-select-list no-display"
            }
          >
            <div
              onClick={() => {
                setSelect(false);
                setStatusSelect("all");
                setStatusList(-1);
              }}
              className="task-sub-select"
            >
              all
            </div>
            <div
              onClick={() => {
                setSelect(false);
                setStatusSelect("unfinsh");
                setStatusList(0);
              }}
              className="task-sub-select"
            >
              unfinish
            </div>
            <div
              onClick={() => {
                setSelect(false);
                setStatusSelect("done");
                setStatusList(1);
              }}
              className="task-sub-select"
            >
              done
            </div>
          </div>
        </div>
      </div>

      <div className="tasks-list-body">
        {
          // eslint-disable-next-line
          tasks.map((task, index) => {
            // console.log(task.isCompleted);
            // console.log(statusList);
            // eslint-disable-next-line
            if (statusList === -1 || task.isCompleted == statusList)
              return (
                <FormTask
                  key={index}
                  taskProp={task}
                  deleteTaskProp={handleDelete}
                  editTaskProp={handleEdit}
                  checkTaskProp={handleCheck}
                />
              );
          })
        }
      </div>
    </div>
  );
}

export default TasksList;
