import NameItem from './NameItem'
import './NameList.css'

const NameList = (props) => {
    
    if(props.names.length === 0) {
    return <h2 className='cost-list__fallback'>Имен и возраста нет</h2>
 }
    return ( <ul className='cost-list'>
        {props.names.map((name) => (
        <NameItem 
            key={name.id} 
            name={name.name} 
            age={name.age} 
        />
        ))}
    </ul>
    )

}

export default NameList;