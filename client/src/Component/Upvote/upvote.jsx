import React from 'react'
import axios from 'axios';

function Upvote(props) {
    const { articleId } = props;
    const upvoteBtn = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/articles/${articleId}/upvotes`);
            console.log(response);
        } catch (error) {
            console.error("error upvoting article", error)
        }
    };

    return (
        <>
            <div>
                <button onClick={upvoteBtn} className="upvote-primary-btn">Upvote</button>
            </div>
        </>
    )
}

export default Upvote