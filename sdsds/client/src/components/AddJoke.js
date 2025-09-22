import { useRef } from 'react';

function AddJoke(props) {

    const typeRef = useRef('');
    const setupRef = useRef('');
    const punchRef = useRef('');


    function submitHandler(event){
        event.preventDefault();
    

    const joke = {
        name: typeRef.current.value,
        img: setupRef.current.value,
        updatedAt: punchRef.current.value
    }

    props.onAddJoke(joke);
}

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label>Type</label>
                <input type='text' id='type' ref={typeRef}/>
            </div>
            <div>
                <label>Setup</label>
                <textarea type='text' id='setup' ref={setupRef}>Type</textarea>
            </div>
            <div>
                <label>Punch</label>
                <textarea type='text' id='punch' ref={punchRef}>Type</textarea>
            </div>
            <button>Add Joke</button>
        </form>
    )
}

export default AddJoke;