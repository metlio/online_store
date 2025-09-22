import React from 'react';
//import ReactDOM from 'react-dom';
import Tilt from 'react-parallax-tilt';

const MainFill2 = () => {
  return (
    <div style={{width:'100%', overflow:'hidden', backgroundColor:'black'}}>
    <Tilt style={{width: '100%'}}>
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center', color:'white', height: '300px', backgroundColor: 'black', overflow:'hidden'}}>
        <h1  style={{textAlign:'center', fontSize:'4rem'}}>Добро пожаловать ✌️</h1>
      </div>
    </Tilt>
    </div>
  );
};

export default MainFill2;