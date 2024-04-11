import React from 'react'
import { useState } from "react";
import axios from "axios";

function SearchBar() {
    const [input, setInput] = useState('');
    const search = async () => {
        const response = await axios.get('https://localhost:8080/api/articles/search')
    }
    return (
        <>
            <div>
                <input type="search"
                    placeholder='Enter the name of the blog'
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                />
                <button onClick={search}> Search</button>
            </div>
        </>
    )
}
export default SearchBar