import React, { useRef, useState } from 'react'
import './search.css'
import ImageLoader from './ImageLoader';
function Search() {
    const [input,setInput] = useState('');
    const inputRef = useRef(null);
    const handleChange = (e) => {
        clearTimeout(inputRef.current);
        inputRef.current = setTimeout(()=>{
            setInput(e.target.value);
        },1000)
    }
  return (
    <>
    <div className="container">
    <input id="search" type="text" placeholder="Type some text" onChange={handleChange}/>
    <ul className="drop"></ul>
    <ImageLoader search={input}/>
  </div>
    </>
  )
}       

export default Search