import './Page.css'
import { useContext } from 'react'
import { CouruselContext } from '../Courusel/courusel-context'


export const Page = ({ children }) => {

    const { width } = useContext(CouruselContext)
    console.log('Хуле пидарас бля????}')

    return <div className='page__main-container'
    style={{
        minWidth: `${width}px`,
        maxWidth: `${width}px`,
    }}>{children}</div>
}