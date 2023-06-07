import React from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const LoginPage = () => {
  return (
    <Container>
      <Card className="mt-5 mx-auto" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <div className="text-center mb-4">
            {/* <img src="logo.png" alt="Logo" /> */}
            <h3>DATA FABRIC</h3>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Sign In
            </Button>
            <Button variant="danger" type="button" className="w-100 mt-2">
              Sign In with Google
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
