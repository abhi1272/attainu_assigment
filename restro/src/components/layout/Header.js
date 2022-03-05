import { Container, Row, Col } from 'react-bootstrap';
import {clear} from '../utils/setLocalStorage'

export default function Header(props) {

    function setRegister(){
        props.setAuthButton('register')
    }

    function setLogin(){
        props.setAuthButton('login')
    }

    function setLogout(){
        props.setUserToken(null)
        clear()
        props.setAuthButton('login')
    }


    return (
        <Container className='mt-4'>
            <Row>
                <Col sm={8}>
                    <h2>Restaurants</h2>
                </Col>
                <Col sm={4}>
                    {props.authButton !== 'logout' &&<button onClick={setLogin} className={props.authButton === 'login' ? 'btn btn-primary' : 'btn'}>Login</button>}
                    {props.authButton === 'logout' && <button  onClick={setLogout} className='btn btn-primary'>Logout</button>}
                    {props.authButton !== 'logout' && <button style={{marginLeft:'4px'}} onClick={setRegister}
                            className={props.authButton === 'register' ? 'btn btn-primary' : 'btn'}>Register
                    </button>}
                </Col>
            </Row>
        </Container>
    )
}
