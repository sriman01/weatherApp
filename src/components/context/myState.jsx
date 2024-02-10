import { useState } from "react";
import MyContext from "./myContext";


const MyState = ({ children }) => {
    const [history, setHistory] = useState([])

    return(
        <MyContext.Provider value={{ history, setHistory}}>
            { children}
        </MyContext.Provider>
    )
}

export default MyState;