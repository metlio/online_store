import NameBlock from "./NameBlock";

const NewBlock = (props) => {

    const saveNameDataHandler = (inputNameData) => 
        {
            const myData = {
                ...inputNameData,
                id: Math.random().toString()
            }
            props.onAddName(myData);
            console.log(myData);
        }


    return (
        <div className='new_block'>
            <NameBlock onSaveNameData={saveNameDataHandler} />
        </div>
    )
}

export default NewBlock;