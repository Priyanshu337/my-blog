import React, { useState } from 'react'
import axios from 'axios';

function AddArticlePage() {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const btnClicked = async () => {
        try {
            const response = await axios.post('/api/articles/add', {
                name: name,
                title: title,
                content: content
            });
            console.log('Article submitted successfully:', response.data);
            // Optionally, you can redirect or perform other actions after a successful submission.
        } catch (error) {
            console.error('Error submitting article:', error.message);
        }
    };

    return (
        <>
            <div>
                <h1>Post Whatever you think</h1>
                <label>Article Name: </label>
                <input type="textarea" value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <label>Article Title: </label>
                <input type="textarea" value={title} onChange={(e) => setTitle(e.target.value)} />
                <br />
                <label>Article Content: </label>
                <input type="textarea" value={content} onChange={(e) => setContent(e.target.value)} />

                <button onClick={btnClicked}>Save</button>
            </div >
        </>
    )
}

export default AddArticlePage