import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { increment } from "../../store/reducers/counter"

const Storetest = () => {
    const count = useSelector(state => state.counter)
    const dispatch = useDispatch()
    const [localCounter, setLocalCounter] = useState(0);
    const handleCounter = () => {
        setLocalCounter(localCounter + 1);
        // Dispatch increment action with updated counter
        dispatch(increment({ count: localCounter + 1 }));
    }
    return (
        <div>
            <h1>Storetest</h1>
            <h1>Store Testing</h1>
            <h1>{count.counter}</h1>
            <button onClick={handleCounter}>Increment</button>
        </div>
    )
}

export default Storetest