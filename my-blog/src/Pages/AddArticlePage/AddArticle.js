import React, { useState } from 'react';
import "./AddArticlePage.css";

export default function AddArticle(props) {

    const [articleName, setArticlename] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [comments, setComments] = useState('');
    const [upvotes, setUpvotes] = useState(0);
    const [clicked, setClicked] = useState(false);

    const btnAdd = (e) => {
        e.preventDefault();
        props.addArticle(articleName, title, content, comments, upvotes);
        setArticlename('');
        setTitle('');
        setContent('');
        setComments('');
        setUpvotes(0);
    };

    return (
        <>
            <div className='main'>
                <div className='heading'>
                    <h1>Add Article</h1>
                </div>
                <div className="Form-container">

                    <label className="label">Name:</label>
                    <input type="text" value={articleName} name="name" onChange={(e) => setArticlename(e.target.value)} />
                    <label className="label">Title:</label>
                    <input type="text" value={title} name="title" onChange={(e) => setTitle(e.target.value)} />
                    <label className="label">Content:</label>
                    <textarea name="content" value={content} onChange={(e) => setContent(e.target.value)} ></textarea>
                    <label className="label">Comment:</label>
                    <input type="text" name="comments" value={comments} onChange={(e) => setComments(e.target.value)} />
                    <label className="label">Upvotes:</label>
                    <button className="upvote-btn" value={upvotes} onClick={(() => {
                        if (!clicked) {
                            setUpvotes(upvotes + 1)
                            console.log("Clicked");
                        }
                        setClicked(true);
                    })} onChange={(e) => setUpvotes(e.target.value)}>+1</button>
                    <br />

                    <button type="submit" onClick={btnAdd} >Add Article</button>
                </div>
            </div >
        </>
    );
};

