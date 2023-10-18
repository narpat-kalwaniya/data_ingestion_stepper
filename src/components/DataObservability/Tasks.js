import React, { useContext, useState } from "react";
import { Table } from "react-bootstrap";
import TaskDetails from "./TaskDetails";
import { mycontext } from "./DataObservability";

const Tasks = (props) => {
  const { showTaskDetails, setShowTaskDetails, steps, setSteps } =
    useContext(mycontext);
  const taskHandler = (task, index) => {
    setShowTaskDetails(true);
    const updatedSteps = [...steps.slice(0, 3)];
    updatedSteps[2] = task.task_name;
    setSteps(updatedSteps);
  };
  console.log(showTaskDetails);
  return (
    <div>
      <Table hover responsive>
        <thead>
          <tr>
            <td>Task Name</td>
            <td>header1</td>
          </tr>
        </thead>
        <tbody>
          {props.tasks.map((task, index) => (
            <tr key={index} onClick={() => taskHandler(task, index)}>
              <td>{task.task_name}</td>
              <td>val</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Tasks;
