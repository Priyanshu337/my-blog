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
        "comments": [],
        "upvotes": 0,
    });
    console.log("Upvotes", articleInfo.upvotes);

    const { articleId } = useParams();
    const loadArticleInfo = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/articles/${articleId}`);
            const newArticleInfo = response.data;
            // const { name, title, content, comments, upvotes } = newArticleInfo;
            setArticleInfo(newArticleInfo);

        } catch (error) {
            console.error('Error loading article info:', error.message);
            console.error('Error details:', error);
        }
    }, [articleId]);
    useEffect(() => {
        loadArticleInfo();
    }, [loadArticleInfo]);

    // const [commentData, setCommentData] = useState('');

    const handleDataFromChild = async (sendData) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/articles/${articleId}/comments`, {
                articleId: articleId,
                commentData: sendData,
            });

            // setCommentData((prevCommentData) => [response.data, ...prevCommentData]);
            console.log("Comment Added", response.data);

            setArticleInfo(response.data);

        } catch (err) {
            // res.json(err);
            console.log("error", err);
        }
    }

    return (
        <>
            <div className='first-container'>
                <div className='article'>
                    <p>{articleInfo.name}</p>
                    <h1>{articleInfo.title}</h1>
                    <p>{articleInfo.content}</p><br />
                    <label>This article has {articleInfo.upvotes} upvotes</label>
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

                                return <li key={index} className="comments-list">{data}</li>
                            })
                        }
                    </div>

                </div>
            </div>

        </>
    );
}
export default ArticlePages;

