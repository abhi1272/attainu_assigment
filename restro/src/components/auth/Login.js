import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import classes from "./Login.module.css";
import axios from 'axios';
import { useState } from 'react'
import {set} from '../utils/setLocalStorage'

export default function Login(props) {

const [errorMessage, setErrorMessage] = useState('')
const [loginForm,setLoginForm] = useState({
    username : '',
    password: ''
})

 function handleOnChange(e) {
    setLoginForm((prevValue) => {
        return {
            ...prevValue,
            [e.target.name]: e.target.value 
        }
    })
  }


  function login(e){
    e.preventDefault();
    axios.post(`http://localhost:4000/user/login`, 
        loginForm
    )
    .then(res => {
        props.setAuthButton('logout')
        set(res.data.data.token)
    }).catch(error => {
      setErrorMessage('userName or Password is wrong!')
      console.log('response', error)
    })
  }

  return (
    <Container className="mt-4">
      <Form className={classes.form} onSubmit={login}>
        <Row>
          <Col sm={4}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username"  onChange={handleOnChange} placeholder="Enter username" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password"  onChange={handleOnChange} placeholder="Password" />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {errorMessage && <Alert className="mt-2" variant='danger'>
          {errorMessage}
      </Alert>}
    </Container>
  );
}
