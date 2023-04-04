import React from "react";
import { useState } from "react";
import "./FormTask.css";
import img1 from "../../img/hair-clips_tick.png";
import img2 from "../../img/bloop_delete.png";

function FormTask({ taskProp, deleteTaskProp, editTaskProp, checkTaskProp }) {
  const [isDone, setIsDone] = useState(taskProp.isCompleted);
  const [toggle, setToggle] = useState(true);
  const [text, setText] = useState(taskProp.text);

  const url1 = `url(${img1})`;

  const endEdit = () => {
    if (taskProp.text === "") {
      deleteTaskProp(taskProp);
    }
  };

  return (
    <div className="form-task">
      <div
        className="btn_check"
        onClick={() => {
          setIsDone(!isDone);
          checkTaskProp(taskProp);
        }}
      >
        <div
          className={isDone ? "btn_check-img img-check" : "btn_check-img"}
          style={{ backgroundImage: isDone ? url1 : "none" }}
        ></div>
      </div>

      {toggle ? (
        <div
          onDoubleClick={() => {
            setToggle(!toggle);
          }}
          className={isDone ? "btn_text task-done" : "btn_text"}
        >
          {taskProp.text}
        </div>
      ) : (
        <input
          className="btn_text-edit"
          type="text"
          maxLength={32}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.keyCode === 27) {
              editTaskProp(taskProp, text);
              setToggle(!toggle);
              endEdit();
            }
          }}
          onBlur={() => {
            editTaskProp(taskProp, text);
            setToggle(!toggle);
            endEdit();
          }}
          autoFocus
        />
      )}

      <div
        className="btn_delete"
        onClick={(e) => {
          e.stopPropagation();
          deleteTaskProp(taskProp);
        }}
      >
        <div
          className="btn_delete-img"
          style={{ backgroundImage: `url(${img2})` }}
        ></div>
      </div>
    </div>
  );
}

export default FormTask;
