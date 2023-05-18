import React, { useState } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";

const SourceEntitySelection = () => {
  return (
    <div className="page1">
      <Row>
        <Card.Body>
          <div className="text-left">
            <Form>
              <Row>
                <Col sm={6}>
                  <div className="form-group">
                    <Form.Label>Source Type</Form.Label>
                    <Form.Select aria-label="" disabled={false}>
                      <option>{""}</option>
                      <option>Query</option>
                      <option>Table</option>
                    </Form.Select>
                  </div>
                  <div>
                    <Form.Label>Query</Form.Label>
                    <Form.Control></Form.Control>
                  </div>
                </Col>
                <Col>
                  <div>
                    <Form.Label>Database Name</Form.Label>
                    <Form.Control></Form.Control>
                  </div>
                  <div>
                    <Form.Label>Schema Name</Form.Label>
                    <Form.Control></Form.Control>
                  </div>
                  <div>
                    <Form.Label>Table Name</Form.Label>
                    <Form.Control></Form.Control>
                  </div>
                  <div>
                    <Form.Label>Bucket Name</Form.Label>
                    <Form.Control></Form.Control>
                  </div>
                  <div>
                    <Form.Label>Full File Name</Form.Label>
                    <Form.Control></Form.Control>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </Card.Body>
      </Row>
    </div>
  );
};

export default SourceEntitySelection;
