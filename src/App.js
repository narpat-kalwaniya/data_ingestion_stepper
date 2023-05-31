import { useState } from "react";
import { TargetSchema } from "./components/TargetSchema";
import "./styles/main.css";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Modal,
  Button,
} from "react-bootstrap";
import { DataValidation } from "./components/DefineDataValidation";
import "bootstrap/dist/css/bootstrap.css";
import Stepper from "./components/Stepper";
import Header from "./components/Header";
import { Progressbar } from "./components/ProgressBar";
import ReviewForm from "./components/ReviewForm";

// useEffect(() => {
//   window.localStorage.setItem();
// }, [step]);

function App() {
  const [step, setStep] = useState(1);
  const [pageAnswers, setPageAnswers] = useState({});
  const [isReview, setIsReview] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const closeHandler = () => {
    setShowModal(true);
    setIsReview(false);
    setStep((step) => 1);
    setShowModal(false);
    setPageAnswers({});
    // window.localStorage.removeItem(1);
  };

  const handleShow = () => setShowModal(true);

  const handleContinue = () => {
    setShowModal(false);
  };

  const totalPagesCount = 9;

  const previousHandler = () => {
    setIsReview(false);
    setStep((step) => step - 1);
  };

  const nextHandler = () => {
    setStep((step) => step + 1);
  };

  const cancelHandler = () => {};

  const reviewHandler = () => {
    setIsReview(true);
  };
  console.log(pageAnswers.DataSourceConnection);

  return (
    <div className="App">
      <Container className="h-100">
        <Card className="Card-outer">
          <Row className="m-2">
            <Col>
              <Card className="Card-progressbar">
                <Progressbar step={step} />
              </Card>
            </Col>
          </Row>
          <Row className="m-2">
            <Col>
              <Card>
                {isReview ? (
                  <ReviewForm
                    step={step}
                    setStep={setStep}
                    isReview={isReview}
                    setIsReview={setIsReview}
                    cancel={closeHandler}
                    pageAnswers={pageAnswers}
                  ></ReviewForm>
                ) : (
                  <div>
                    <Card.Header className="header">
                      <Header step={step}></Header>
                    </Card.Header>
                    <Card.Body>
                      <Stepper
                        step={step}
                        pageAnswers={pageAnswers}
                        setPageAnswers={setPageAnswers}
                      ></Stepper>
                    </Card.Body>

                    <Card.Footer className="d-flex justify-content-between float-right">
                      <Col>
                        <button
                          className="btn-c"
                          onClick={handleShow}
                          // onClick={cancelHandler}
                          disabled={step == 1}
                        >
                          Close
                        </button>
                        <Modal show={showModal} onHide={closeHandler}>
                          <Modal.Header closeButton>
                            {/* <Modal.Title>Modal heading</Modal.Title> */}
                          </Modal.Header>
                          <Modal.Body>
                            Are you sure you want to close? Any unsaved data
                            will be lost.
                          </Modal.Body>
                          <Modal.Footer>
                            <button
                              className="btn-c"
                              variant="secondary"
                              onClick={closeHandler}
                            >
                              Yes, Close
                            </button>
                            <button
                              className="btn-s-1"
                              variant="primary"
                              onClick={handleContinue}
                            >
                              No, Continue
                            </button>
                          </Modal.Footer>
                        </Modal>
                      </Col>
                      <button
                        className="btn-c "
                        onClick={previousHandler}
                        disabled={step == 1}
                      >
                        Back
                      </button>

                      {step == totalPagesCount ? (
                        <button className="btn-s-1 " onClick={reviewHandler}>
                          Review & Submit
                        </button>
                      ) : (
                        <button
                          className="btn-s "
                          onClick={nextHandler}
                          disabled={
                            pageAnswers.DataSourceConnection === "" ||
                            pageAnswers.DataTargetConnection === "" ||
                            pageAnswers.Application === ""
                          }
                        >
                          Next
                        </button>
                      )}
                    </Card.Footer>
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default App;
