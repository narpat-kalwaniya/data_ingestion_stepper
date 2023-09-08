import React from "react";
import { Form, Row, Col, Modal } from "react-bootstrap";
import "./Data_Quality.css";
import CompletenessRule from "./CompletenessRule";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegexConstraintRule from "./RegexConstraintRule";
import RangeConstraintRule from "./RangeConstraintRule";
import LengthConstraintRule from "./LengthConstraintRule";
import TimelinessRule from "./TimelinessRule";
import ReferentialIntigrityRule from "./ReferentialIntigrityRule";
// import SourceVsTargetRule from "./SourceVsTargetRule";

function ColumnRulesButtonList({ show, onHide }) {
  const navigateRouter = useNavigate();

  const [completenessShowModal, setcompletenessShowModal] = useState(false);
  const [regexConstraintShowModal, setRegexConstraintShowModal] =
    useState(false);
  const [rangeConstraintShowModal, setRangeConstraintShowModal] =
    useState(false);
  const [lengthConstraintShowModal, setLengthConstraintShowModal] =
    useState(false);
  const [timelinessRuleShowModal, setTimelinessRuleShowModal] = useState(false);
  const [referIntegrityShowModal, setReferIntegrityShowModal] = useState(false);
  const [sourceVsTargetShowModal, setSourceVsTargetShowModal] = useState(false);

  const completenessRuleHandleShowModal = () => {
    setcompletenessShowModal(true);
  };

  const completenessRuleHandleCloseModal = () => {
    setcompletenessShowModal(false);
  };

  const regexConstraintHandleShowModal = () => {
    setRegexConstraintShowModal(true);
  };

  const regexConstraintHandleCloseModal = () => {
    setRegexConstraintShowModal(false);
  };

  const rangeConstraintHandleShowModal = () => {
    setRangeConstraintShowModal(true);
  };

  const rangeConstraintHandleCloseModal = () => {
    setRangeConstraintShowModal(false);
  };

  const lengthConstraintHandleShowModal = () => {
    setLengthConstraintShowModal(true);
  };

  const lengthConstraintHandleCloseModal = () => {
    setLengthConstraintShowModal(false);
  };

  const timelinessRuleHandleShowModal = () => {
    setTimelinessRuleShowModal(true);
  };

  const timelinessRuleHandleCloseModal = () => {
    setTimelinessRuleShowModal(false);
  };

  const referIntegrityHandleShowModal = () => {
    setReferIntegrityShowModal(true);
  };

  const referIntegrityHandleCloseModal = () => {
    setReferIntegrityShowModal(false);
  };

  const sourcevstargetHandleShowModal = () => {
    setSourceVsTargetShowModal(true);
  };

  const sourcevstargetHandleCloseModal = () => {
    setSourceVsTargetShowModal(false);
  };
  return (
    <>
      <Modal
        show={
          show &&
          !completenessShowModal &&
          !regexConstraintShowModal &&
          !rangeConstraintShowModal &&
          !lengthConstraintShowModal &&
          !timelinessRuleShowModal &&
          !referIntegrityShowModal
          //  && !sourceVsTargetShowModal
        }
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
              >
                Completeness
              </h4>
              <p className="columnModalHeadingSubBtn"> Completeness</p>
            </Col>
            <Col className="columnModalHeadingBtn">
              <h4
                className="columnModalHeadingBtn1"
                onClick={() => regexConstraintHandleShowModal()}
              >
                Regex Constraint
              </h4>
              <p className="columnModalHeadingSubBtn"> Validity</p>
            </Col>
            <Col className="columnModalHeadingBtn">
              <h4
                className="columnModalHeadingBtn1"
                onClick={() => rangeConstraintHandleShowModal()}
              >
                Range Constraint
              </h4>
              <p className="columnModalHeadingSubBtn"> Validity</p>
            </Col>
          </Row>

          <Row className="columnModalHeading">
            <Col className="columnModalHeadingBtn">
              <h4
                className="columnModalHeadingBtn1"
                onClick={() => lengthConstraintHandleShowModal()}
              >
                Length Constraint
              </h4>
              <p className="columnModalHeadingSubBtn"> Validity</p>
            </Col>
            <Col className="columnModalHeadingBtn">
              <h4 className="columnModalHeadingBtn1">Uniqueness</h4>
              <p className="columnModalHeadingSubBtn"> Uniqueness</p>
            </Col>
            <Col className="columnModalHeadingBtn">
              <h4
                className="columnModalHeadingBtn1"
                onClick={() => timelinessRuleHandleShowModal()}
              >
                Timeliness{" "}
              </h4>
              <p className="columnModalHeadingSubBtn"> Timeliness</p>
            </Col>
          </Row>

          <Row className="columnModalHeading">
            <Col className="columnModalHeadingBtn">
              <h4
                className="columnModalHeadingBtn1"
                onClick={() => referIntegrityHandleShowModal()}
              >
                Referential Integrity
              </h4>
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
              <h4
                className="columnModalHeadingBtn1"
                onClick={() => sourcevstargetHandleShowModal()}
              >
                Source vs Target
              </h4>
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

      {regexConstraintShowModal && (
        <RegexConstraintRule
          show={regexConstraintHandleShowModal}
          onHide={regexConstraintHandleCloseModal}
        />
      )}

      {rangeConstraintShowModal && (
        <RangeConstraintRule
          show={rangeConstraintHandleShowModal}
          onHide={rangeConstraintHandleCloseModal}
        />
      )}

      {lengthConstraintShowModal && (
        <LengthConstraintRule
          show={lengthConstraintHandleShowModal}
          onHide={lengthConstraintHandleCloseModal}
        />
      )}

      {timelinessRuleShowModal && (
        <TimelinessRule
          show={timelinessRuleHandleShowModal}
          onHide={timelinessRuleHandleCloseModal}
        />
      )}

      {referIntegrityShowModal && (
        <ReferentialIntigrityRule
          show={referIntegrityHandleShowModal}
          onHide={referIntegrityHandleCloseModal}
        />
      )}

      {/* {sourceVsTargetShowModal && (
        <SourceVsTargetRule
          show={sourceVsTargetShowModal}
          onHide={sourcevstargetHandleCloseModal}
        />
      )} */}
    </>
  );
}

export default ColumnRulesButtonList;
