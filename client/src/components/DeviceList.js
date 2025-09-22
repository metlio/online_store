
import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import Happ from '../Happ'
import Tilt from 'react-parallax-tilt';
//import styled from "styled-components";

/*const CardContainer = styled.div`
  width: 95vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;*/

const DeviceList = observer(() => {


    const {device} = useContext(Context)

    return (
                <div style={{backgroundColor:'white', border:'1px solid #e7e7e7'}}>
                    {device.devices.map(device =>

                        <DeviceItem key={device.id} device={device}/>  
                        
                      )}
                {/* <Happ />  */}
                </div> 
                
            )
            });

export default DeviceList;