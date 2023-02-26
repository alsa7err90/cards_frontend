import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../network/userNet";
import { setLogin } from "../redux/actions/userActions";
import LodaingSpinner from "../components/LodaingSpinner";

function LoginPage() {
  const logged = useSelector((state) => state.userReducer.logged);
  const token = useSelector((state) => state.userReducer.token);
  const userId = useSelector((state) => state.userReducer.userId);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSpinner(true);
    const article = { email: email, password: password };
    login(article)
      .then((response) => {
        console.log(response.data);
        if (response.data.success === true) {
          console.log(response.data.success);
          dispatch(setLogin(response.data.data));
          return window.location.replace("/");
        }
        setSpinner(false);
      })
      .catch((error) => {
        setSpinner(false);
        console.log(error);
      });
  };

  return (
    <>
    
    <div className="content">
      {spinner ? (
        <LodaingSpinner />
      ) : (
        <>
          <div className="container4" >
           
            
              <Form onSubmit={handleSubmit}className="form">
                <h1>Login</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    dir="rtl"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </div> 
          
        </>
      )}
      </div>
    </>
  );
}

export default LoginPage;
