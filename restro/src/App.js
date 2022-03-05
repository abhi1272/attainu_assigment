import './App.css';
import Header from './components/layout/Header.js'
import Card from './components/UI/CardDetails'
import Search from './components/UI/Search';
import data from './data/restro.json'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import {get} from './components/utils/setLocalStorage'

function App() {

  const [authButton, setAuthButton] = useState('login')
  const [userToken, setUserToken] = useState('')
  const [restaurantData, setRestaurantData] = useState(data)
  const [sortValue, setSortValue] = useState('desc')

  useEffect(()=>{
    const tokenData = get()
    if(tokenData){
      setAuthButton('logout')
      setUserToken(tokenData)
    }
  })

  function sort(){
    setSortValue((prevValue) => {
      if(prevValue === 'desc'){
        return 'asc'
      }else{
        return 'desc'
      }
    })
    setRestaurantData((prevValue) => {
      console.log('prev', sortValue)
      if(sortValue === 'asc'){
        return prevValue.sort((a,b) => b.price - a.price)
      }else{
        return prevValue.sort((a,b) => a.price - b.price)
      }
    })
  }

  return (
    <div className="App">
      <Header  authButton={authButton} setAuthButton={setAuthButton}
                userToken={userToken}
                setUserToken={setUserToken}/>
      <hr></hr>
      {!userToken && authButton === 'register' && <Register 
                                                        authButton={authButton} 
                                                        setAuthButton={setAuthButton}/>}
      {!userToken && authButton === 'login' && <Login 
                                                        authButton={authButton} 
                                                        setAuthButton={setAuthButton}
                                                        userToken={userToken}
                                                        setUserToken={setUserToken}/>}
      {userToken && <Container >
        <Row>
          <Col sm={8} className="mb-2">
            <Search restaurantData={restaurantData} setRestaurantData={setRestaurantData}/>
          </Col>
          <Col sm={4}>
            <Button size="sm" variant='primary' onClick={sort}>sort by price</Button>
          </Col>
        </Row>
        {restaurantData && <Row className='mt-3'>
          {restaurantData.map(item =>  
          <Col sm={4} key={item.id}>
            <Card item={item}/>
          </Col> )}
        </Row>}
        {restaurantData.length === 0 && <Row>
          <h4 className='ml-2'>No Data Found</h4>
        </Row>}
      </Container>}
    </div>
  );
}

export default App;
