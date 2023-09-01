import React from "react";
import { Form, Row, Col, Modal } from "react-bootstrap";
import "./Data_Quality.css";
import CompletenessRule from "./CompletenessRule";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ColumnRulesButtonList({ show, onHide }) {
  const navigateRouter = useNavigate();
  const [completenessShowModal, setcompletenessShowModal] = useState(false);

  const completenessRuleHandleShowModal = () => {
    setcompletenessShowModal(true);
  };

  const completenessRuleHandleCloseModal = () => {
    setcompletenessShowModal(false);
  };

  return (
    <>
      <Modal
        show={show && !completenessShowModal}
        onHide={onHide}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add DQ Rule</Modal.Title>
        </Modal.Header>
        <Modal.Body className="columnModalBody">
          <Row className="columnModalHeading">
            <Col className="columnModalHeadingBtn">
              <h4
                className="columnModalHeadingBtn1"
                onClick={() => completenessRuleHandleShowModal()}
                // onClick={completenessRuleHandleShowModal}
              >
                Completeness
              </h4>
              <p className="columnModalHeadingSubBtn"> Completeness</p>
            </Col>
            <Col className="columnModalHeadingBtn">
              <h4 className="columnModalHeadingBtn1">Regex Constraint</h4>
              <p className="columnModalHeadingSubBtn"> Validity</p>
            </Col>
            <Col className="columnModalHeadingBtn">
              <h4 className="columnModalHeadingBtn1">Range Constraint</h4>
              <p className="columnModalHeadingSubBtn"> Validity</p>
            </Col>
          </Row>

          <Row className="columnModalHeading">
            <Col className="columnModalHeadingBtn">
              <h4 className="columnModalHeadingBtn1">Length Constraint</h4>
              <p className="columnModalHeadingSubBtn"> Validity</p>
            </Col>
            <Col className="columnModalHeadingBtn">
              <h4 className="columnModalHeadingBtn1">Uniqueness</h4>
              <p className="columnModalHeadingSubBtn"> Uniqueness</p>
            </Col>
            <Col className="columnModalHeadingBtn">
              <h4 className="columnModalHeadingBtn1">Timeliness </h4>
              <p className="columnModalHeadingSubBtn"> Timeliness</p>
            </Col>
          </Row>

          <Row className="columnModalHeading">
            <Col className="columnModalHeadingBtn">
              <h4 className="columnModalHeadingBtn1">Referential Integrity</h4>
              <p className="columnModalHeadingSubBtn"> Consistency</p>
            </Col>
            <Col className="columnModalHeadingBtn">
              <h4 className="columnModalHeadingBtn1">SQL Custom </h4>
              <p className="columnModalHeadingSubBtn"> Consistency</p>
            </Col>
            <Col className="columnModalHeadingBtn">
              <h4 className="columnModalHeadingBtn1">Business Logics</h4>
              <p className="columnModalHeadingSubBtn"> Consistency</p>
            </Col>
          </Row>

          <Row className="columnModalHeading">
            <Col className="columnModalHeadingBtn">
              <h4 className="columnModalHeadingBtn1">Source vs Target</h4>
              <p className="columnModalHeadingSubBtn"> Accuracy</p>
            </Col>
            <Col className="columnModalHeadingBtn">
              <h4 className="columnModalHeadingBtn1">Pll Detection</h4>
              <p className="columnModalHeadingSubBtn"> Privacy</p>
            </Col>
            <Col className="columnModalHeadingBtn">
              <h4 className="columnModalHeadingBtn1">Automatic DQ</h4>
              <p className="columnModalHeadingSubBtn"> Consistency</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-c " onClick={onHide}>
            Close
          </button>
          {/* <button className="btn-s ">Add</button> */}
        </Modal.Footer>
      </Modal>

      {completenessShowModal && (
        <CompletenessRule
          show={completenessRuleHandleShowModal}
          onHide={completenessRuleHandleCloseModal}
        />
      )}
    </>
  );
}

export default ColumnRulesButtonList;
