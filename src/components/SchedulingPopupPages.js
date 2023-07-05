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

  useEffect(() => {
    if (props.show) {
      reset();
    }
  }, [props.show]);

  const {
    register,
    watch,
    reset,
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

  let isAllchecked = entityScheduleData.every((item) => item.isSelected);

  const checkBoxBtn = () => {
    let tempentityScheduleData = JSON.parse(JSON.stringify(entityScheduleData));
    tempentityScheduleData = tempentityScheduleData.map((item) => {
      item.isSelected = !isAllchecked;
      return item;
    });
    setEntityScheduleData(tempentityScheduleData);
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      className="modalContainer"
    >
      <Modal.Header closeButton>
        <Modal.Title className="modalTitle">Add Multiple Tasks </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Label column className="sm-4" for="application_name">
              Application:
            </Form.Label>
            <Col sm="8">
              <Form.Select
                className="selectOptions"
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
                  <th>
                    <Form.Check
                      aria-label="option 1"
                      checked={isAllchecked}
                      onClick={checkBoxBtn}
                    />
                  </th>
                  <th>Source Entity</th>
                  <th>Target Entity</th>
                </tr>
              </thead>
              <tbody>
                {entityScheduleData
                  .filter((item) => item.application === applicationName)
                  .map((sourceEntity, index) => {
                    return (
                      <tr>
                        <td>
                          <Form.Check
                            aria-label="option 1"
                            checked={sourceEntity.isSelected}
                            onClick={() => {
                              let tempentityScheduleData = JSON.parse(
                                JSON.stringify(entityScheduleData)
                              );
                              tempentityScheduleData =
                                tempentityScheduleData.map((item) => {
                                  if (
                                    item.entity_id == sourceEntity.entity_id
                                  ) {
                                    item.isSelected = !item.isSelected;
                                  }
                                  return item;
                                });
                              setEntityScheduleData(tempentityScheduleData);
                            }}
                          />
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
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
