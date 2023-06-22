import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Trash } from "react-bootstrap-icons";
import "./Scheduling.css";
import { Stack } from "react-bootstrap";

const Scheduling = () => {
  const [dagName, setDagName] = useState([]);
  const [moduleName, setModuleName] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const { register, handleSubmit, watch, setValue, resetField } = useForm({
    defaultValues: {
      tasks: [
        {
          task_name: "",
          module_name: "",
          arguments: {},
          dependency: [],
        },
      ],
    },
  });
  const scheduleType = watch("schedule_type");
  const tasks = watch("tasks");

  const addTask = () => {
    const newTasks = [
      ...(tasks || []),
      {
        task_name: "",
        module_name: "",
        arguments: {},
        dependency: [],
      },
    ];
    setValue("tasks", newTasks);
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
      setValue("tasks", updatedTasks);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://ec2-54-197-121-247.compute-1.amazonaws.com:27022/api/v1/job/dagname/"
        );
        const data = await response.json();
        setDagName(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchModuleName = async () => {
      try {
        const response = await fetch(
          "http://ec2-54-197-121-247.compute-1.amazonaws.com:27022/api/v1/job/modulename/"
        );
        const data = await response.json();
        setModuleName(data);
      } catch (error) {
        console.error("Error fetching module name:", error);
      }
    };

    fetchModuleName();
  }, []);

  useEffect(() => {
    const fetchTimezones = async () => {
      try {
        const response = await fetch(
          "http://ec2-54-197-121-247.compute-1.amazonaws.com:27022/api/v1/job/timezones/"
        );
        const data = await response.json();
        setTimezones(data);
      } catch (error) {
        console.error("Error fetching timezones:", error);
      }
    };

    fetchTimezones();
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
    fetch(
      "http://ec2-54-197-121-247.compute-1.amazonaws.com:27022/api/v1/job/create",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      }
    ).then((result) => {
      console.log("result", updatedFormData);
    });
  };
  const { onChange: onScheduleChange, ...otherFiled } =
    register("schedule_type");

  return (
    <div className="container JobFormContainer">
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        {/* Form fields */}
        <Row className="mb-3">
          <Form.Label column className="sm-2" for="job_name">
            Job Name:
          </Form.Label>
          <Col sm="4">
            <Form.Control
              className="jobFormItem"
              size="sm"
              id="job_name"
              name="job_name"
              {...register("job_name")}
            />
          </Col>
          <Form.Label column className="sm-2" for="job_desc">
            Job Description:
          </Form.Label>
          <Col sm="4">
            <Form.Control
              className="jobFormItem"
              size="sm"
              id="job_desc"
              name="job_desc"
              {...register("job_desc")}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Label column className="sm-2" for="start_timestamp">
            Start Timestamp:
          </Form.Label>
          <Col sm="4">
            <Form.Control
              className="jobFormItem"
              size="sm"
              id="start_timestamp"
              name="start_timestamp"
              {...register("start_timestamp")}
              type="datetime-local"
            />
          </Col>
          <Form.Label column className="sm-2" for="end_timestamp">
            End Timestamp:
          </Form.Label>
          <Col sm="4">
            <Form.Control
              className="jobFormItem"
              size="sm"
              id="end_timestamp"
              name="end_timestamp"
              {...register("end_timestamp")}
              type="datetime-local"
              defaultValue={null}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Label column className="sm-2" for="parent_dag_id">
            Parent DAG ID:
          </Form.Label>
          <Col sm="4">
            <Form.Select
              size="sm"
              id="parent_dag_id"
              name="parent_dag_id"
              {...register("parent_dag_id")}
            >
              <option value={null}></option>
              {options}
            </Form.Select>
          </Col>
          <Form.Label column className="sm-2" for="timezone">
            Timezone:
          </Form.Label>
          <Col sm="4">
            <Form.Select
              className="jobFormItem"
              size="sm"
              id="timezone"
              name="timezone"
              {...register("timezone")}
            >
              <option value="GMT">GMT</option>
              {timezoneOptions}
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Label column className="sm-2" for="schedule_type">
            Schedule Type:
          </Form.Label>
          <Col sm="4">
            <Form.Select
              className="jobFormItem"
              size="sm"
              id="schedule_type"
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
            </Form.Select>
          </Col>

          {/* Render schedule_value based on schedule_type */}
          {scheduleType === "preset" && (
            <>
              <Form.Label column className="sm-2" for="schedule_value">
                Schedule Value:
              </Form.Label>
              <Col sm="4">
                <Form.Select
                  className="jobFormItem"
                  size="sm"
                  id="schedule_value"
                  name="schedule_value"
                  {...register("schedule_value")}
                >
                  <option value="once">once</option>
                  <option value="daily">daily</option>
                  <option value="monthly">monthly</option>
                  <option value="yearly">yearly</option>
                </Form.Select>
              </Col>
            </>
          )}
          {scheduleType === "cron" && (
            <>
              <Form.Label column className="sm-2" for="schedule_value">
                Schedule Value:
              </Form.Label>
              <Col sm="4">
                <Form.Control
                  size="sm"
                  id="schedule_value"
                  name="schedule_value"
                  {...register("schedule_value")}
                />
              </Col>
            </>
          )}
          {scheduleType === "delta_value" && (
            <>
              <Form.Label column className="sm-2" for="schedule_value">
                Schedule Value:
              </Form.Label>
              <Col sm="4">
                <Form.Control
                  className="jobFormItem"
                  size="sm"
                  id="schedule_value"
                  name="schedule_value"
                  {...register("schedule_value")}
                  value='{"hours":"","days":"","weekdays":""}'
                />
              </Col>
            </>
          )}
        </Row>
        {/* Task fields */}
        <h3>Tasks</h3>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Module Name</th>
              <th>Arguments</th>
              <th>Dependency</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(tasks || []).map((task, index) => (
              <tr key={index}>
                <td>
                  <Form.Control
                    size="sm"
                    className="jobFormItem"
                    placeholder="Enter Task Name..."
                    id={`tasks[${index}].task_name`}
                    name={`tasks[${index}].task_name`}
                    {...register(`tasks[${index}].task_name`)}
                  />
                </td>
                <td>
                  <Form.Select
                    className="jobFormItem"
                    size="sm"
                    placeholder="Select Module Name..."
                    id={`tasks[${index}].module_name`}
                    name={`tasks[${index}].module_name`}
                    {...register(`tasks[${index}].module_name`)}
                  >
                    {moduleName.map((module, moduleIndex) => (
                      <option key={moduleIndex} value={module}>
                        {module}
                      </option>
                    ))}
                  </Form.Select>
                </td>
                <td>
                  <Form.Control
                    size="sm"
                    className="jobFormItem"
                    placeholder="Enter Arguments..."
                    id={`tasks[${index}].arguments`}
                    name={`tasks[${index}].arguments`}
                    {...register(`tasks[${index}].arguments`)}
                  />
                </td>
                <td>
                  <Form.Control
                    className="jobFormItem"
                    size="sm"
                    placeholder="Enter Dependency..."
                    id={`tasks[${index}].dependency`}
                    name={`tasks[${index}].dependency`}
                    {...register(`tasks[${index}].dependency`)}
                  />
                </td>
                <td>
                  <Button variant="danger" onClick={() => removeTask(index)}>
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Stack gap={2} direction="horizontal">
          <Button
            className="jobFormBtn"
            variant="primary mr-1"
            type="button"
            onClick={addTask}
          >
            Add Task
          </Button>
          <Button className="jobFormBtn" variant="primary" type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </div>
  );
};

export default Scheduling;
