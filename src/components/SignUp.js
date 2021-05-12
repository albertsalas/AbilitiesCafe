import React, { useContext, useState } from "react";
import { Form, Button, Nav } from "react-bootstrap";
import { useHistory } from "react-router";
import AuthContext from "../contexts/AuthContext";

const SignUp = (props) => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    admin: false,
  });

  const { signUp } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signUp(newUser);
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const onSignIn = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="outerBox">
        <h4>Sign Up</h4>
        <Form>
          <Form.Group controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              name="firstName"
              required
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              name="lastName"
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              onChange={handleChange}
              name="email"
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange}
              name="password"
              required
            />
          </Form.Group>
          <Button node="button" type="submit" waves="light" onClick={onSubmit}>
            Submit
          </Button>
        </Form>
        <Nav class="mt-3">
          <Nav.Item>
            <Nav.Link href="#" onClick={onSignIn}>
              Already have an account? Sign in now!
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
};

export default SignUp;
