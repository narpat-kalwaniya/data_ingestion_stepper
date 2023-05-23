import React, { useState } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import '../styles/main.css'

const addHandler = () => {

}

const GatherMetaData = () => {
  return (
    <div>
      <Row>
        <Card.Body>
          <div className="text-left">
            <Form>
              <Row>
                <Row>
                  <Col sm={4}>
                    <Form.Label>Business Tags</Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Form.Label>Description</Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Form.Label>Owner</Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Form.Label>Owner Email</Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Form.Label>Success Email Distribution List</Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Form.Label>Failure Email Distribution List</Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control></Form.Control>
                  </Col>
                </Row>
              </Row>
              <div style = {{float : 'right'}}>
                <button className="btn-s-1" onClick={addHandler} type = "button">
                  Add
                </button>
              </div>
            </Form>
          </div>
        </Card.Body>
      </Row>
    </div>
  );
};

export default GatherMetaData;
