import React from 'react'
import { useState } from 'react';

function AddComment(props) {
    const [comment, setComment] = useState('');

    const { sendData } = props;

    const btnClicked = () => {
        const data = { comment };
        sendData(data);
    }
    return (
        <>
            <div>
                <input type="text" value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder="Enter Comment" />
                <button type="submit" onClick={btnClicked}>Post</button>
            </div>
        </>
    )
}

export default AddComment;