import './NameBlock.css';
import React, { useState } from "react";

const NameBlock = (props) => { 

    const [inputName, setInputName] = useState('');
    const [inputAge, setInputAge] = useState('');
    const [nameError, setNameError] = useState('');
    const [ageError, setAgeError] = useState('');

    const nameChangeHandler = (event) => {
        setInputName(event.target.value);
    };

    const ageChangeHandler = (event) => {
        setInputAge(event.target.value);
    };

    const redHandler = (event) => {
        if (!event.target.value){
            setNameError('Некорректное имя')
        } else {
            setNameError('')
        }
    };

    const blueHandler = (event) => {
        if (event.target.value<18){
            setAgeError('Некорректный возраст')
        } else {
            setAgeError('')
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if(!nameError & !ageError){

        const myData = {
            name: inputName,
            age: inputAge
        }

        props.onSaveNameData(myData);
        setInputName('');
        setInputAge('');

    }
    };

      return (
        <form onSubmit={submitHandler}>
            <div className="block">
                <div className='block_control'>
                    <label>Имя</label>
                    <div style={{color:'red'}}>{nameError}</div>
                    <input type='text' value={inputName} onChange={nameChangeHandler} onBlur={redHandler}/>
                </div>
                <div className='block_control'>
                    <label>Возраст</label>
                    <div style={{color:'red'}}>{ageError}</div>
                    <input type='text' value={inputAge} onChange={ageChangeHandler} onBlur={blueHandler}  />
                </div>
                <button type='submit' >Добавить юзера</button>
            </div>
        </form>
      );

}
    
export default NameBlock;