import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "./ArticlePage.css"
import AddComment from '../../Component/Comment/AddComment';

function ArticlePages() {

    const [articleInfo, setArticleInfo] = useState({
        "title": "",
        "name": "",
        "content": "",
        "comments": "",
        "upVotes": "",
    });

    const { articleId } = useParams();
    const loadArticleInfo = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/articles/${articleId}`);
            const newArticleInfo = response.data;
            const { name, title, content, comments, upVotes } = newArticleInfo;
            setArticleInfo(newArticleInfo);

        } catch (error) {
            console.error('Error loading article info:', error.message);
            console.error('Error details:', error);
        }
    }, [articleId]);
    useEffect(() => {
        loadArticleInfo();
    }, [loadArticleInfo]);

    const [commentData, setCommentData] = useState();

    const handleDataFromChild = (sendData) => {
        setCommentData(sendData);
        console.log(sendData, "CommentData")
    }

    const addComment = useCallback(async (commentData) => {
        const response = await axios.post(`http://localhost:8080/api/articles/${articleId}/comments`, {
            commentData: commentData,
        });
        setCommentData((prevCommentData) => [response.data, ...prevCommentData]);
        console.log("Comment Added", response.data);
    }, [commentData]);

    return (
        <>
            <div className='first-container'>
                <div className='article'>
                    <h1>{articleInfo.title}</h1>
                    <p>{articleInfo.name}</p>
                    <p>{articleInfo.content}</p><br />
                </div>

                <div className='comments-upVotes'>
                    <div className='add-comment'>
                        <h1>
                            <AddComment sendData={handleDataFromChild} />
                        </h1>
                    </div>
                    <div className='display-container'>
                        <div className='comment-container'>
                            <label>{articleInfo.comments}</label><br />
                        </div>
                        <div className='upVotes-container'>
                            <label>{articleInfo.upVotes}</label>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default ArticlePages;


