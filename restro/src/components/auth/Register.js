import { Form, Button, Container, Row, Col } from "react-bootstrap";
import classes from "./Login.module.css";
import axios from 'axios';
import { useState } from 'react'

export default function Register(props) {


const [registerForm,setRegisterForm] = useState({
    username : '',
    password: ''
})
const [userToken, setUserToken] = useState({})

 function handleOnChange(e) {
    setRegisterForm((prevValue) => {
        return {
            ...prevValue,
            [e.target.name]: e.target.value 
        }
    })
  }


  function Register(e){
    e.preventDefault();
    axios.post(`http://localhost:4000/user/register`, 
        registerForm
    )
    .then(res => {
        props.setAuthButton('login')
    })
  }

  return (
    <Container className="mt-4">
      <Form className={classes.form} onSubmit={Register}>
        <Row>
          <Col sm={4}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username"  onChange={handleOnChange} placeholder="Register username" />
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
    </Container>
  );
}
