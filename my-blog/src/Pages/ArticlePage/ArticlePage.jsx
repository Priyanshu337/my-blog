import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "./ArticlePage.css"
import AddComment from '../../Component/Comment/AddComment';
// import useUser from '../../hooks/useUser';

function ArticlePages() {
    const [articleInfo, setArticleInfo] = useState({
        "title": "",
        "name": "",
        "content": "",
        "comments": [],
        "upvotes": 0,
    });
    const { articleId } = useParams();
    // const { user, isLoading } = useUser();

    const loadArticleInfo = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/articles/${articleId}`);
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

    const handleDataFromChild = async (sendData) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/articles/${articleId}/comments`, {
                articleId: articleId,
                commentData: sendData,
            });
            console.log("Comment Added", response.data);
            setArticleInfo(response.data);
        } catch (err) {
            console.log("error", err);
        }
    }

    const addUpvotes = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/articles/${articleId}/upvotes`);
            setArticleInfo(response.data)
        } catch (err) {
            console.log("this is the error")
            console.log(err);
        }
    };

    return (
        <>
            <div className='first-container'>
                <div className='article'>
                    <button onClick={addUpvotes}> UpVote</button>
                    <p>{articleInfo.name}</p>
                    <h1>{articleInfo.title}</h1>
                    <p>{articleInfo.content}</p>
                    <label style={{ fontWeight: 'bold' }}>This article has {articleInfo.upvotes} upvotes</label>
                </div>
                <div className='comments-upVotes'>
                    <div className='add-comment'>
                        <h1>
                            <AddComment sendData={handleDataFromChild} />
                        </h1>
                    </div>
                </div>
            </div>
            <div className='second-container'>
                <div className='display-container'>
                    <div className='comment-container'>
                        {
                            articleInfo.comments.map((data, index) => {

                                return <p key={index} className="comments-list">{data}</p>
                            })
                        }
                    </div>
                </div>
            </div>

        </>
    );
}
export default ArticlePages;

