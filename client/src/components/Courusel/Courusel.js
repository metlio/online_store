import { cloneElement, useEffect, useState, Children } from "react"
import "./Courusel.css"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useCurrentWidth } from "../../hooks/useCurrentWidth"
//import { createSearchParams } from "react-router-dom";
import Fade from 'react-reveal/Fade';


//const PAGE_WIDTH = window.innerWidth;



export const Courusel = ({ children }) => {

    let width = useCurrentWidth();
    
    const[pages, setPages] = useState([])
    const[offset, setOffset] = useState([0])

    const handlerLeftClick = () => {

        setOffset((currentOffset) => {

            const newOffset = currentOffset + width
            return Math.min(newOffset, 0 )

        })
    }


    const handlerRightClick = () => {

        setOffset((currentOffset) => {
            
            const newOffset = currentOffset - width
            const maxOffset = -(width * (pages.length - 1))
            return Math.max(newOffset, maxOffset)

        })
        
    }

    const setWindowDimensions = () => {
        console.log('ghbdtn')
        setOffset(0)
    }

    //useEffect(() => window.scrollTo(0, 1000), []);

    useEffect(() => {

        window.addEventListener('resize', setWindowDimensions);


        setPages(
            Children.map(children, (child) => {
                return cloneElement(child, {
                    style: {
                        height: '100%',
                        minWidth: `${width}px`,
                        maxWidth: `${width}px`,
                    },
                })
            })
        )

        return () => {
            window.removeEventListener('resize', setWindowDimensions)
            }
        


    }, [width])


    

    return (
        <Fade>
        <div className='main-container' onResize={setOffset}>
            <FaChevronLeft className='arrow' onClick={handlerLeftClick} />
            <div className='window'>
                <div className='all-pages-container'
                style = {{
                    transform: `translateX(${offset}px)`,
                }}
                >
                    {pages}
                </div>
            </div>    
            <FaChevronRight className='arrow' onClick={handlerRightClick} />
        </div>
        </Fade>
    )
}