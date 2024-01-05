import { useParams } from 'react-router-dom';
import articles from './Article-content';
import NotFoundPage from './NotFoundPage';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CommentsList from '../Component/CommentsList';


const ArticlePage = () => {

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    const { articleId } = useParams();

    const article = articles.find(article => article.name.toLowerCase() === articleId.toLowerCase());

    useEffect(() => {
        const loadArticleInfo = async () => {
            try {
                const response = await axios.get(`/api/articles`, { params: { name: articleId } });
                const newArticleInfo = response.data;
                setArticleInfo(newArticleInfo);

            } catch (error) {
                console.error('Error loading article info:', error.message);
                console.error('Error details:', error);
            }
        };
        loadArticleInfo();
    }, [articleId]);


    const addUpVote = async () => {
        try {
            const response = await axios.put(`/api/articles/upvote`, { params: { name: articleId } });
            const updatedArticle = response.data;
            setArticleInfo(updatedArticle);
        } catch (error) {
            console.error('Error in upvote ', error.message);
        }
    }
    if (!article) {
        return < NotFoundPage />;
    }

    return (
        <>
            <h1>{article.title}</h1>
            <div className='button-comment-container'>
                {/* <button onClick={addUpVote}>Upvote</button> */}
                <p>this article has {articleInfo.upvotes} upvotes(s)</p>

            </div>
            {
                article.content.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                ))
            }
            {/* <CommentsList comments={articleInfo.comments} /> */}
        </>
    );
}
export default ArticlePage;






// Query params path?name=manoj.  => path (backend path)
// Params path/manoj => path/:name (backend)