import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import NotFoundPage from './NotFoundPage';
import axios from 'axios';
import { useState, useEffect } from 'react';

function ArticlePages() {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    const { articleId } = useParams();

    const loadArticleInfo = useCallback(async () => {
        try {
            const response = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        } catch (error) {
            console.error('Error loading article info:', error.message);
            console.error('Error details:', error);
        }
    }, [articleId]);


    useEffect(() => {
        loadArticleInfo();
    }, [loadArticleInfo]);

    async function addUpVote() {
        try {
            await axios.put(`/api/articles/upvote`, { params: { name: articleId } });
            // If you need to update the upvote count, you may fetch the updated data again.
            loadArticleInfo();
        } catch (error) {
            console.error('Error in upvote', error.message);
        }
    }

    if (!articleInfo) {
        return <NotFoundPage />;
    }

    return (
        <>
            <h1>{articleInfo.title}</h1>
            <div className='button-comment-container'>
                <button onClick={addUpVote}>Upvote</button>
                <p>this article has {articleInfo.upvotes} upvotes(s)</p>
            </div>
            {articleInfo.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
            {/* <CommentsList comments={articleInfo.comments} /> */}
        </>
    );
}

export default ArticlePages;









// import { useParams } from 'react-router-dom';
// import NotFoundPage from './NotFoundPage';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// // import CommentsList from '../Component/CommentsList';
// //  this is for loading comment on article 

// function ArticlePages() {

//     const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
//     const { articleId } = useParams();

//     const article = articles.find(article => article.name.toLowerCase() === articleId.toLowerCase());

//     useEffect(() => {
//         const loadArticleInfo = async () => {
//             try {
//                 const response = await axios.get(`/api/articles`, { params: { name: articleId } });
//                 const newArticleInfo = response.data;
//                 setArticleInfo(newArticleInfo);

//             } catch (error) {
//                 console.error('Error loading article info:', error.message);
//                 console.error('Error details:', error);
//             }
//         };
//         loadArticleInfo();
//     }, [articleId]);


//     const addUpVote = async () => {
//         try {
//             const response = await axios.put(`/api/articles/upvote`, { params: { name: articleId } });
//             const updatedArticle = response.data;
//             setArticleInfo(updatedArticle);
//         } catch (error) {
//             console.error('Error in upvote ', error.message);
//         }
//     }
//     if (!article) {
//         return < NotFoundPage />;
//     }

//     return (
//         <>
//             <h1>{article.title}</h1>
//             <div className='button-comment-container'>
//                 {/* <button onClick={addUpVote}>Upvote</button> */}
//                 <p>this article has {articleInfo.upvotes} upvotes(s)</p>

//             </div>
//             {
//                 article.content.map((paragraph, i) => (
//                     <p key={i}>{paragraph}</p>
//                 ))
//             }
//             {/* <CommentsList comments={articleInfo.comments} /> */}
//         </>
//     );
// }
// export default ArticlePages;






// Query params path?name=manoj.  => path (backend path)
// Params path/manoj => path/:name (backend)