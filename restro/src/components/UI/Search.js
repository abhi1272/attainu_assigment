import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import classes from './Search.module.css'
import data from '../../data/restro.json'
export default function Search(props){

    const [searchValue, setSearchValue] = useState('')

    function handleChange(event){
        setSearchValue(event.target.value)
      }
    const search = () => {
        props.setRestaurantData((prevValue) => {
          prevValue = data
          if(searchValue !== ''){
            return prevValue.filter((item) => {
              return ( item.name.toLowerCase().match(searchValue.toLowerCase()) || 
                item.place.toLowerCase().match(searchValue.toLowerCase()) || 
                item.cuisine.join().toLowerCase().match(searchValue.toLowerCase())
              )
            })
          }else{
            return data
          }
        })
      }

    return (
        <div>
            <input className={classes.input__box} value={searchValue} onChange={handleChange}
                    type="text" placeholder="search by place/name/cuisine"/>
            <Button size="sm" variant='primary' onClick={search}>Search</Button>
        </div>
    )   
}