import React from 'react'
import { useState } from 'react';

function AddComment({ sendData }) {
    const [comment, setComment] = useState('');


    const btnClicked = () => {
        const data = { comment };
        sendData(data);
    }
    return (
        <>
            <div>
                <h3> Post Comments</h3>
                <input type="text" value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder="Enter Comment" />
                <button type="submit" onClick={btnClicked}>Post</button>
            </div>
        </>
    )
}

export default AddComment;