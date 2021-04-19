import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Button, Alert, Nav } from "react-bootstrap";
import { useHistory } from "react-router";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(userInfo["email"], userInfo["password"]);
      setLoading(false);
      history.push("/admin");
    } catch (error) {
      setLoading(false);
      setError("No account with those credentials found.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const onSignUp = (e) => {
    e.preventDefault();
    history.push("/signup");
  };

  useEffect(() => {
    setError(null);
  }, [userInfo]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="outerBox">
          <h4>Sign In</h4>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Nav class="mt-3">
            <Nav.Item>
              <Nav.Link href="#" onClick={onSignUp}>
                Don't have an account? Sign up now!
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default Login;
