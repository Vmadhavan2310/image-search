import React, { useRef, useState } from "react";
import "./search.css";
import ImageLoader from "./ImageLoader";
function Search() {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const handleChange = (e) => {
    clearTimeout(inputRef.current);
    inputRef.current = setTimeout(() => {
      setInput(e.target.value);
    }, 1000);
  };
  return (
    <>
      <div className="container">
        <div class="nine">
          <h1>
            Image Finder<span>Instant Image Retrieval</span>
          </h1>
        </div>
        <input
          id="search"
          type="text"
          placeholder="Powered by Keywords..."
          onChange={handleChange}
        />
        <ul className="drop"></ul>
        <ImageLoader search={input} />
      </div>
    </>
  );
}

export default Search;
