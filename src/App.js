import { useState } from "react";
import { TargetSchema } from "./components/TargetSchema";
import "./styles/main.css";
import { Container, Card, Row, Col, Form } from "react-bootstrap";
import { DataValidation } from "./components/DefineDataValidation";
import "bootstrap/dist/css/bootstrap.css";
import Stepper from "./components/Stepper";
import Header from "./components/Header";
import { ProgressBar } from "./components/ProgressBar";

function App() {
  const [step, setStep] = useState(1);

  const previousHandler = () => {
    setStep((step) => step - 1);
  };

  const nextHandler = () => {
    setStep((step) => step + 1);
  };

  const cancelHandler = () => {
    setStep((step) => 1);
  };

  return (
    <div className="App">
      <Container className="h-100">
        <Card className="Card-outer">
          <Row className="m-5">
            <Col className="align-self-center col-3">
              <ProgressBar step={step} />
            </Col>
            <Col>
              <Card>
                <Card.Header className="header">
                  <Header step={step}></Header>
                </Card.Header>
                <Card.Body>
                  <Stepper step={step}></Stepper>
                </Card.Body>

                <Card.Footer className="d-flex justify-content-between float-right">
                  <Col>
                    <button
                      className="btn-c"
                      onClick={cancelHandler}
                      disabled={step == 1}
                    >
                      Cancel
                    </button>
                  </Col>
                  <button
                    className="btn-c "
                    onClick={previousHandler}
                    disabled={step == 1}
                  >
                    Back
                  </button>

                  <button className="btn-s " onClick={nextHandler}>
                    Next
                  </button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default App;
