import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const JobForm = () => {
  const [tasks, setTasks] = useState([
    {
      task_name: "",
      module_name: "",
      arguments: {},
      dependency: [],
    },
  ]);
  const [dagName, setDagName] = useState([]);
  const [moduleName, setModuleName] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const { register, handleSubmit, watch, setValue, resetField } = useForm();
  const scheduleType = watch("schedule_type");

  const addTask = () => {
    setTasks([
      ...tasks,
      {
        task_name: "",
        module_name: "",
        arguments: {},
        dependency: [],
      },
    ]);
  };
  /*
        const removeTask = (index) => {
            const filteredTasks = [...tasks];
            filteredTasks.splice(index, 1);
            setTasks(filteredTasks);
        };

            const removeTask = (index) => {
                setTasks(tasks.filter((task, i) => i !== index));
            };
        */
  const removeTask = (index) => {
    if (tasks.length > 1) {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    }
  };

  useEffect(() => {
    fetch("http://localhost:27022/api/v1/job/dagname/").then((result) => {
      result.json().then((resp) => {
        setDagName(resp);
      });
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:27022/api/v1/job/modulename/").then((result) => {
      result.json().then((resp) => {
        setModuleName(resp);
      });
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:27022/api/v1/job/timezones/")
      .then((result) => result.json())
      .then((resp) => {
        setTimezones(resp);
      });
  }, []);

  const options = dagName.map((dag, index) => (
    <option key={index} value={dag}>
      {dag}
    </option>
  ));

  const timezoneOptions = timezones.map((timezone, index) => (
    <option key={index} value={timezone}>
      {timezone}
    </option>
  ));

  const onSubmitForm = (data) => {
    // Parse tasks arguments to JSON
    const updatedTasks = data.tasks.map((task) => ({
      ...task,
      arguments: JSON.parse(task.arguments),
    }));
    if (!data["parent_dag_id"]) {
      data["parent_dag_id"] = "none";
    }
    if (!data["end_timestamp"]) {
      data["end_timestamp"] = "none";
    }
    // Update the form data with parsed tasks
    const updatedFormData = {
      ...data,
      tasks: updatedTasks,
    };

    // Send the data to the POST API
    fetch("http://localhost:27022/api/v1/job/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    }).then((result) => {
      console.log("result", updatedFormData);
    });
  };
  const { onChange: onScheduleChange, ...otherFiled } =
    register("schedule_type");

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        {/* Form fields */}
        <div>
          <label>Job Name</label>
          <input name="job_name" {...register("job_name")} />
        </div>
        <div>
          <label>Job Description</label>
          <input name="job_desc" {...register("job_desc")} />
        </div>
        <div>
          <label>Start Timestamp</label>
          <input
            name="start_timestamp"
            {...register("start_timestamp")}
            type="datetime-local"
          />
        </div>
        <div>
          <label>End Timestamp</label>
          <input
            name="end_timestamp"
            {...register("end_timestamp")}
            type="datetime-local"
            defaultValue={null}
          />
        </div>
        <div>
          <label>Parent DAG ID</label>
          <select name="parent_dag_id" {...register("parent_dag_id")}>
            <option value={null}></option>
            {options}
          </select>
        </div>
        <div>
          <label>Timezone</label>
          <select name="timezone" {...register("timezone")}>
            <option value="GMT">GMT</option>
            {timezoneOptions}
          </select>
        </div>
        <div>
          <label>Schedule Type</label>
          <select
            name="schedule_type"
            {...otherFiled}
            onChange={(e) => {
              onScheduleChange(e);
              resetField("schedule_value");
            }}
          >
            <option value="cron">cron</option>
            <option value="preset">preset</option>
            <option value="delta_value">delta_value</option>
          </select>
        </div>

        {/* Render schedule_value based on schedule_type */}
        {scheduleType === "preset" && (
          <div>
            <label>Schedule Value</label>
            <select name="schedule_value" {...register("schedule_value")}>
              <option value="once">once</option>
              <option value="daily">daily</option>
              <option value="monthly">monthly</option>
              <option value="yearly">yearly</option>
            </select>
          </div>
        )}
        {scheduleType === "cron" && (
          <div>
            <label>Schedule Value</label>
            <input name="schedule_value" {...register("schedule_value")} />
          </div>
        )}
        {scheduleType === "delta_value" && (
          <div>
            <label>Schedule Value</label>
            <input
              name="schedule_value"
              {...register("schedule_value")}
              value='{"hours":"","days":"","weekdays":""}'
            />
          </div>
        )}

        {/* Task fields */}
        <h3>Tasks</h3>
        {tasks.map((task, index) => (
          <div key={index}>
            <label>Task Name</label>
            <input
              name={`tasks[${index}].task_name`}
              {...register(`tasks[${index}].task_name`)}
            />
            <label>Module Name</label>
            <select
              name={`tasks[${index}].module_name`}
              {...register(`tasks[${index}].module_name`)}
            >
              {moduleName.map((module, moduleIndex) => (
                <option key={moduleIndex} value={module}>
                  {module}
                </option>
              ))}
            </select>
            <label>Arguments</label>
            <input
              name={`tasks[${index}].arguments`}
              {...register(`tasks[${index}].arguments`)}
            />
            <label>Dependency</label>
            <input
              name={`tasks[${index}].dependency`}
              {...register(`tasks[${index}].dependency`)}
            />
            <button onClick={() => removeTask(index)}>Remove Task</button>
          </div>
        ))}
        <button type="button" onClick={addTask}>
          Add Task
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobForm;
