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
import "../styles/main.css";
import { Stack } from "react-bootstrap";
import SchedulingPopupPages from "./SchedulingPopupPages";
import "./SchedulingPopupPages.css";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router-dom";

const SchedulingPipeline = () => {
  const location = useLocation();
  const [field, setField] = useState([]);
  const [show, setShow] = useState(false);
  const [dagName, setDagName] = useState([]);
  const [moduleName, setModuleName] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [togggleState, settogggleState] = useState(false);
  const [tasks, settasks] = useState([]);

  const isPathCheck = () => {
    if (location.pathname === "/scheduling/edit/job-name") {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("schedulingUserData")) {
      setTimeout(() => {
        const storedData = sessionStorage.getItem("schedulingUserData");
        const userData = JSON.parse(storedData);
        sessionStorage.removeItem("schedulingUserData");
        if (userData?.parent_dag_id)
          setValue("parent_dag_id", userData?.parent_dag_id);
        if (userData?.timezone) setValue("timezone", userData?.timezone);
        if (userData?.schedule_value)
          setValue(
            "schedule_value",
            typeof userData.schedule_value === "object"
              ? JSON.stringify(userData.schedule_value)
              : userData.schedule_value
          );
        if (userData?.tasks) {
          userData.tasks = userData?.tasks?.map?.((item) => {
            item.arguments = JSON.stringify(item.arguments);
            item.dependency =
              item?.dependency?.map?.((item) => {
                return {
                  label: item,
                  value: item,
                };
              }) || [];
            return item;
          });
          settasks(userData?.tasks);
        }
      }, 1500);
    }
  });

  const storedData = sessionStorage.getItem("schedulingUserData");
  const userData = JSON.parse(storedData);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: userData || {},
  });

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const scheduleType = watch("schedule_type");
  const parentDagId = watch("parent_dag_id");
  const jobName = watch("job_name");
  const startStamp = watch("start_timestamp");

  const addTask = () => {
    const newTasks = [
      ...(tasks || []),
      {
        task_name: "",
        module_name: "",
        arguments: "",
        dependency: [],
      },
    ];
    settasks(newTasks);
  };

  const removeTask = (index) => {
    if (tasks.length > 1) {
      let currenttask = JSON.parse(JSON.stringify(tasks[index]));
      let updatedTasks = JSON.parse(JSON.stringify(tasks)).filter(
        (_, i) => i !== index
      );
      updatedTasks = updatedTasks.map((task) => {
        const taskDependency =
          task.dependency?.filter((item) => {
            return item.label != currenttask.task_name;
          }) || [];
        return { ...task, dependency: taskDependency };
      });
      settasks(updatedTasks);
      settogggleState(!togggleState);
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

  const fetchDataParentId = async (dag_name) => {
    try {
      const response = await fetch(
        `http://ec2-54-197-121-247.compute-1.amazonaws.com:27022/api/v1/job/getschedule/${dag_name}`
      );
      const jsonParentIDData = await response.json();
      setValue("schedule_type", jsonParentIDData.schedule_type);
      setValue(
        "schedule_value",
        typeof jsonParentIDData.schedule_value === "object"
          ? JSON.stringify(jsonParentIDData.schedule_value)
          : jsonParentIDData.schedule_value
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputParentIdChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue) {
      fetchDataParentId(inputValue);
    }
    setValue("parent_dag_id", inputValue);
  };

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
    let updatedTasks = JSON.parse(JSON.stringify(tasks));
    updatedTasks = updatedTasks.map((item) => {
      item.arguments = JSON.parse(item.arguments || "{}");
      item.dependency = item.dependency.map((subitem) => {
        return subitem.label;
      });
      return item;
    });

    if (!data["parent_dag_id"]) {
      delete data["parent_dag_id"];
    }
    if (!data["end_timestamp"]) {
      delete data["end_timestamp"];
    }
    // Update the form data with parsed tasks
    const updatedFormData = {
      ...data,
      tasks: updatedTasks,
    };

    if (data.schedule_type === "delta_values") {
      JSON.parse(
        (updatedFormData.schedule_value = updatedFormData.schedule_value)
      );
    }

    // Send the data to the POST API
    fetch("http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/createdag/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }
        const error = await response.json();
        if (error?.detail) {
          throw new Error(error?.detail);
        }
        throw new Error(error);
      })
      .then((result) => {
        if (result?.status == 200 || result?.status == 201) {
          handleShowModal();
          setErrorMessage("");
        } else {
          setErrorMessage(result?.message || result?.[0]?.message);
        }
      })
      .catch((err) => {
        setErrorMessage(
          typeof err.message === "string" ? err.message : "Something went wrong"
        );
      });
  };
  const { onChange: onScheduleChange, ...otherFiled } =
    register("schedule_type");

  const handleClose = () => {
    window.location.href = "/scheduling/pipeline";
    handleCloseModal();
  };

  const handleCloseSchedulingModal = () => {
    setShow(false);
  };
  const handleShowSchedulingModal = () => setShow(true);

  const handleDataChange = (selectedItems) => {
    const diInject = moduleName.find(
      (moduleName) => moduleName === "di_ingest"
    );
    selectedItems = selectedItems.map((item) => {
      return {
        task_name: item.task_name,
        module_name: diInject,
        arguments: JSON.stringify(item.arguments),
        dependency: [],
      };
    });
    const newTasks = [...(tasks || []), ...selectedItems];
    settasks(newTasks);
  };

  const checkIfValidJson = (inputData) => {
    if (inputData) {
      try {
        let parsedata = JSON.parse(inputData);
        return false;
      } catch (e) {
        return true;
      }
    } else {
      return false;
    }
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body> The Job {jobName} is scheduled successfully.</Modal.Body>
        <Modal.Footer>
          <button variant="primary" onClick={handleClose} className="btn-c">
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <div className="container JobFormContainer">
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          {/* Form fields */}
          <Row className="mb-3">
            <Form.Label column className="sm-2" for="job_name">
              Job Name:
            </Form.Label>
            <Col sm="4">
              <Form.Control
                disabled={isPathCheck()}
                className="jobFormItem"
                size="sm"
                id="job_name"
                name="job_name"
                isInvalid={!!errors.job_name}
                {...register("job_name", { required: true })}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid job name.
              </Form.Control.Feedback>
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
                isInvalid={!!errors.job_desc}
                {...register("job_desc", { required: true })}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid job description.
              </Form.Control.Feedback>
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
                value={startStamp}
                id="start_timestamp"
                name="start_timestamp"
                isInvalid={!!errors.start_timestamp}
                {...register("start_timestamp", {
                  required: true,
                })}
                type="datetime-local"
                step="any"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid start timestamp.
              </Form.Control.Feedback>
            </Col>
            <Form.Label column className="sm-2" for="end_timestamp">
              End Timestamp:
            </Form.Label>
            <Col sm="4">
              <Form.Control
                className="jobFormItem"
                size="sm"
                min={startStamp}
                step="any"
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
                onChange={handleInputParentIdChange}
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
                isInvalid={!!errors.timezone}
                {...register("timezone", { required: true })}
              >
                <option value=""></option>
                {timezoneOptions}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please provide a valid timezone.
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label column className="sm-2" for="schedule_type">
              Schedule Type:
            </Form.Label>
            <Col sm="4">
              <Form.Select
                disabled={parentDagId}
                className="jobFormItem"
                size="sm"
                id="schedule_type"
                name="schedule_type"
                {...otherFiled}
                onChange={(e) => {
                  onScheduleChange(e);
                  if (e.target.value == "delta_values") {
                    setValue(
                      "schedule_value",
                      '{"hours":1,"days":1,"weeks":1}'
                    );
                  } else {
                    resetField("schedule_value");
                  }
                }}
              >
                <option value="cron">cron</option>
                <option value="preset">preset</option>
                <option value="delta_values">delta_values</option>
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
                    disabled={parentDagId}
                    className="jobFormItem"
                    size="sm"
                    id="schedule_value"
                    name="schedule_value"
                    isInvalid={!!errors.schedule_value}
                    {...register("schedule_value", { required: true })}
                  >
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid schedule value.
                    </Form.Control.Feedback>
                    <option value="now">now</option>
                    <option value="once">once</option>
                    <option value="hourly">hourly</option>
                    <option value="daily">daily</option>
                    <option value="weekly">weekly</option>
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
                    className="jobFormItem"
                    id="schedule_value"
                    name="schedule_value"
                    isInvalid={!!errors.schedule_value}
                    {...register("schedule_value", { required: true })}
                    disabled={parentDagId}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid schedule value.
                  </Form.Control.Feedback>
                </Col>
              </>
            )}
            {scheduleType === "delta_values" && (
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
                    isInvalid={!!errors.schedule_value}
                    {...register("schedule_value", { required: true })}
                    disabled={parentDagId}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid schedule value.
                  </Form.Control.Feedback>
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
              {(tasks || []).map((task, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        size="sm"
                        className="jobFormItem"
                        placeholder="Enter Task Name..."
                        id={`tasks[${index}].task_name`}
                        name={`tasks[${index}].task_name`}
                        isInvalid={!!errors?.tasks?.[index]?.task_name}
                        value={task.task_name}
                        onChange={async (e) => {
                          let tasksTemp = JSON.parse(JSON.stringify(tasks));
                          tasksTemp[index].task_name = e.target.value;
                          settasks(tasksTemp);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Select
                        className="jobFormItem"
                        size="sm"
                        placeholder="Select Module Name..."
                        id={`tasks[${index}].module_name`}
                        name={`tasks[${index}].module_name`}
                        isInvalid={!!errors?.tasks?.[index]?.module_name}
                        // {...otherModuleFields}
                        value={task.module_name}
                        onChange={async (e) => {
                          // onChangeModuleName(e);

                          let tasksTemp = JSON.parse(JSON.stringify(tasks));
                          tasksTemp[index].module_name = e.target.value;

                          settasks(tasksTemp);
                          const response = await fetch(
                            `http://ec2-54-197-121-247.compute-1.amazonaws.com:27022/api/v1/job/parameters/${e.target.value}`
                          );
                          const data = await response.json();
                          tasksTemp[index].arguments = JSON.stringify(data);
                          settasks([...tasksTemp]);
                        }}
                      >
                        <option value={null}></option>
                        {moduleName.map((module, moduleIndex) => {
                          return (
                            <option key={moduleIndex} value={module}>
                              {module}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        className="jobFormItem"
                        placeholder="Enter Arguments..."
                        id={`tasks[${index}].arguments`}
                        name={`tasks[${index}].arguments`}
                        isInvalid={
                          !!errors?.tasks?.[index]?.arguments ||
                          checkIfValidJson(task.arguments)
                        }
                        value={task.arguments}
                        onChange={async (e) => {
                          let tasksTemp = JSON.parse(JSON.stringify(tasks));
                          tasksTemp[index].arguments = e.target.value;
                          settasks(tasksTemp);
                        }}
                        // {...register(`tasks[${index}].task_name`, {
                        //   required: true,
                        // })}
                        // {...register(`tasks[${index}].arguments`, {
                        //   required: true,
                        // })}
                      />
                    </td>

                    <td>
                      <Select
                        isMulti
                        placeholder="Enter Dependency..."
                        id={`tasks[${index}].dependency`}
                        name={`tasks[${index}].dependency`}
                        value={tasks[index].dependency}
                        options={tasks
                          .map((item) => {
                            return {
                              label: item.task_name,
                              value: item.task_name,
                            };
                          })
                          .filter(
                            (item) => item.label && item.label != task.task_name
                          )}
                        onChange={(e, data) => {
                          let value = e;
                          let tasksTemp = JSON.parse(JSON.stringify(tasks));
                          tasksTemp[index].dependency = value;
                          settasks(tasksTemp);
                          settogggleState(!togggleState);
                        }}
                      />
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          removeTask(index);
                        }}
                      >
                        <Trash />
                      </Button>
                    </td>
                  </tr>
                );
              })}
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
            <Button
              className="jobFormBtn"
              variant="primary"
              onClick={handleShowSchedulingModal}
            >
              Add Multiple Tasks
            </Button>
          </Stack>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </Form>
      </div>
      <SchedulingPopupPages
        show={show}
        onHide={handleCloseSchedulingModal}
        onDataUpdate={handleDataChange}
      />
    </>
  );
};

export default SchedulingPipeline;
