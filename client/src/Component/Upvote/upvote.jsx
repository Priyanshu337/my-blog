import React from 'react'
import axios from 'axios';


function Upvote({ articleId, woFunc }) {

    const upvoteBtn = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/articles/${articleId}/upvotes`, {}, {
                headers: {
                    'Content-Type': 'application/json', authToken: localStorage.getItem('accessToken')
                }
            });
            console.log(response)

        } catch (error) {
            console.error("error upvoting article", error)
        }
        woFunc();
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