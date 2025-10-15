import {React, useContext, useState, useEffect} from 'react'

function Increment ({value, changed}) {

    function increase () {

        if (value < 10){
            changed(value+1);
        }
        
    }

    function decrease () {

        if (value > 1){
            changed(value-1);
        }
        
    }



    return (
        <div style={{display:'flex', color:'white', alignItems:'center'}}>
            <div onClick={decrease} style={{justifyContent:'center', textAlign:'center', backgroundColor:'#6b068a', fontSize:'0.8rem', borderRadius:'3px', width:'0.6rem'}}>-</div>
            <div style={{width:'30px', padding:'0 10px 0 10px', fontSize:'0.8rem'}}>{value}</div>
            <div onClick={increase} style={{backgroundColor:'#6b068a', textAlign:'center', fontSize:'0.8rem', borderRadius:'3px', width:'0.6rem'}}>+</div>

            </div>
    )
}



export default Increment;