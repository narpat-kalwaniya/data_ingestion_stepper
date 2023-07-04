import React from "react";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";

export default function SchedulingPopupPages(props) {
  const [entityScheduleData, setEntityScheduleData] = useState([]);
  const [applicationNames, setApplicationNames] = useState([]);
  // const [checklist, setChecklist] = useState({
  //   parent: false,
  //   children: [
  //     { id: 1, checked: false },
  //     { id: 2, checked: false },
  //     { id: 3, checked: false },
  //     // Add more child objects as needed
  //   ],
  // });
  // const [popupPage, setPopupPage] = useState([]);

  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      application_name: "",
      entity: [],
    },
  });

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(
          "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/entityschedule/"
        );
        const data = await response.json();
        const uniqueApplicationNames = [];
        data.forEach((item, index) => {
          if (!uniqueApplicationNames.includes(item.application)) {
            uniqueApplicationNames.push(item.application);
          }
        });
        setEntityScheduleData(data);
        setApplicationNames(uniqueApplicationNames);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplication();
  }, []);

  const options = applicationNames.map((name, index) => (
    <option key={index} value={name}>
      {name}
    </option>
  ));

  const applicationName = watch("application_name");

  return (
    <Modal show={props.show} onHide={props.onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Add Multiple Tasks </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Label column className="sm-4" for="application_name">
              Application:
            </Form.Label>
            <Col sm="8">
              <Form.Select
                id="application_name"
                name="application_name"
                {...register("application_name", { required: true })}
              >
                <option value={null}>Please Select</option>
                {options}
              </Form.Select>
            </Col>
          </Row>
          {applicationName !== "Please Select" ? (
            <Table responsive="sm">
              <thead>
                <tr>
                  {/* <th>
                  <Form.Check
                    aria-label="option 1"
                    checked={checklist.parent}
                    onChange={() =>
                      setChecklist((prevState) => ({
                        ...prevState,
                        parent: !prevState.parent,
                        children: prevState.children.map((child) => ({
                          ...child,
                          checked: !prevState.parent,
                        })),
                      }))
                    }
                  />
                </th> */}
                  <th>
                    <Form.Check aria-label="option 1" />
                  </th>
                  <th>Source Entity</th>
                  <th>Target Entity</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                {checklist.children.map((child) => (
                  <td key={child.id}>
                    <Form.Check
                      aria-label="option 1"
                      checked={child.checked}
                      onChange={() =>
                        setChecklist((prevState) => ({
                          ...prevState,
                          children: prevState.children.map((c) =>
                            c.id === child.id
                              ? { ...c, checked: !c.checked }
                              : c
                          ),
                          parent: prevState.children.every((c) => c.checked),
                        }))
                      }
                    />
                    {child.id}
                  </td>
                ))}
                <td>Table cell</td>
                <td>Table cell</td>
              </tr> */}
                {entityScheduleData
                  .filter((item) => item.application === applicationName)
                  .map((sourceEntity, index) => {
                    return (
                      <tr>
                        <td>
                          <Form.Check aria-label="option 1" />
                        </td>
                        <td>{sourceEntity.source_entity}</td>
                        <td>{sourceEntity.target_entity}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="jobFormBtn"
            variant="secondary"
            onClick={props.onHide}
          >
            Close
          </Button>
          <Button
            className="jobFormBtn"
            variant="primary"
            onClick={props.onHide}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
