import React, { useState } from 'react';
import axios from 'axios';

const AddArticle = () => {
    const [article, setArticle] = useState({
        name: '',
        title: '',
        content: '',
    });

    const handleInputChange = (e) => {
        setArticle({
            ...article,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/articles/add', article);
            console.log('Article added:', response.data);
        } catch (error) {
            console.error('Error adding article:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="name" onChange={handleInputChange} />

            <label>Title:</label>
            <input type="text" name="title" onChange={handleInputChange} />

            <label>Content:</label>
            <textarea name="content" onChange={handleInputChange}></textarea>

            <button type="submit">Add Article</button>
        </form>
    );
};

export default AddArticle;


// this is my raw code

// import React, { useState } from 'react'
// import axios from 'axios';

// function AddArticlePage() {
//     const [name, setName] = useState('');
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [upvotes, setUpvotes] = useState(0);
//     const [comments, setComments] = useState([
//         {
//             postedBy: "",
//             text: ""
//         }
//     ]);

//     const btnClicked = async () => {
//         try {
//             const response = await axios.post('/api/articles/add', {
//                 name: name,
//                 title: title,
//                 content: content,
//                 // upvotes: upvotes,
//                 // comments: comments
//             });
//             console.log('Article submitted successfully:', response.data);
//             // Optionally, you can redirect or perform other actions after a successful submission.
//         } catch (error) {
//             console.error('Error submitting article:', error.message);
//         }
//     };

//     return (
//         <>
//             <div>
//                 <h1>Post Whatever you think</h1>
//                 <label>Article Name: </label>
//                 <input type="textarea" value={name} onChange={(e) => setName(e.target.value)} />
//                 <br />
//                 <label>Article Title: </label>
//                 <input type="textarea" value={title} onChange={(e) => setTitle(e.target.value)} />
//                 <br />
//                 <label>Article Content: </label>
//                 <input type="textarea" value={content} onChange={(e) => setContent(e.target.value)} />

//                 {/* <button onClick={() => { upvotes = setUpvotes(upvotes + 1) }}>addUpvote</button>

//                 <p>PostedBy</p>
//                 <textarea value={comments.postedBy} onChange={(e) => setComments({ ...comments, postedBy: e.target.value })}></textarea>
//                 <p>PostedBy</p>
//                 <textarea value={comments.text} onChange={(e) => setComments({ ...comments, text: e.target.value })}></textarea> */}


//                 <button onClick={btnClicked}>Save</button>
//             </div >
//         </>
//     )
// }

// export default AddArticlePage

// ///