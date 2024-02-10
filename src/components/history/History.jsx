import React, { useContext } from 'react'
import MyContext from '../context/myContext'
import './history.css'

const History = ({ handleSuggestionClick }) => {
    const { history, setHistory} = useContext(MyContext)
  return (
    <div>
        {history.length > 0 && (
          <div className="search-history">
            {/* <h3>Search History:</h3> */}
            <ul>
              {history.map((item, index) => (
                <li key={index} onClick={() => handleSuggestionClick(item)}>
                  {item}
                </li>
              ))}

  

            </ul>
          </div>
        )}</div>
  )
}

export default History