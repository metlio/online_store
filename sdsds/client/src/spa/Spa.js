import {Route, Routes} from 'react-router-dom';
import Jokes from '../pages/Jokes';
import JokeDetails from '../pages/JokeDetails';
import AddJoke from '../pages/AddJoke';

function Spa() {
    return <Routes>
        <Route path='/jokes'>
            <Jokes />
        </Route>
        <Route path='/jokes/:jokeId'>
            <JokeDetails />
        </Route>
        <Route path='/add-joke'>
            <AddJoke />
        </Route>
    </Routes>
}

export default Spa; 