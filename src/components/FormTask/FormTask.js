import React, { useEffect } from "react";
import { useState } from "react";
import "./FormTask.css";
import img1 from "../../img/hair-clips_tick.png";
import img2 from "../../img/bloop_delete.png";

function FormTask({ taskProp, deleteTaskProp, editTaskProp, checkTaskProp }) {
  const isDone = taskProp.isCompleted;
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [text, setText] = useState(taskProp.text);

  const url1 = `url(${img1})`;

  return (
    <div className="form-task">
      <div
        className="btn_check"
        onClick={(e) => {
          checkTaskProp(taskProp);
          console.log(taskProp.isCompleted);
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
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.keyCode === 27) {
              editTaskProp(taskProp, text);
              setToggle(!toggle);
            }
          }}
          onBlur={() => {
            editTaskProp(taskProp, text);
            setToggle(!toggle);
          }}
          autoFocus
        />
      )}

      <div
        className="btn_delete"
        onClick={(e) => {
          e.stopPropagation();
          // console.log(isDone);
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
