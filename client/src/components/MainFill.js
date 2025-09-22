import React, {useEffect, useState} from 'react';
import Cube from './Cube';
import Tilt from 'react-parallax-tilt';


function MainFill () {


    const [scr, setScr] = useState(0);

    const hea = {
        justifyContent:'center',
        //transform: `rotate(${200-scr*2}deg)`,
        transition: '0.5s',
        // transformX: '-300px',
        textAlign: "center",
        alignItems:'center',
        color: 'white',
        fontSize: scr,
        overflow:'hidden',
        whiteSpace:'nowrap'
      }

    useEffect(() => {

        setInterval(() => {
            setScr((prev) => 100 - window.pageYOffset/20);
        }, 1);

    }, []);


    return (
    <div style={{padding:'0px',margin:'0px',display:'flex', height:'100vh', justifyContent:'center',alignItems:'start'}}>
        <div style={{width:'20%', minHeight:'100vh'}}>
        </div>
        <div  style={{display:'flex', backgroundColor:'black', justifyContent:'center', alignItems:'center', minHeight:'100vh',  width:'80vw'}}>
            <Tilt>
                <div style={hea}>
                    <Cube />
                </div>
            </Tilt>
        </div>
    </div>
    )
}

export default MainFill;

