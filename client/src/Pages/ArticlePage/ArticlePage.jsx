import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import Upvote from '../../Component/Upvote/upvote';
import useUser from '../../hooks/useUser';
import AddComment from '../../Component/Comment/AddComment';
import "./ArticlePage.css"

function ArticlePages() {
    const [articleInfo, setArticleInfo] = useState({
        "title": "",
        "name": "",
        "content": "",
        "comments": [""],
        "upvotes": 0,
    });
    const { articleId } = useParams();
    const { user, isLoading } = useUser();

    // this is to get article from DB
    const loadArticleInfo = useCallback(async () => {
        try {
            const token = user && await user.getIdToken();
            const response = await axios.get(`http://localhost:8080/api/articles/${articleId}`, {
                headers: { authtoken: token }
            });
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

    // this is for posting comment
    const handleDataFromComponent = async (sendData) => {
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

    const handleWoFunc = () => {
        setArticleInfo(prevState => ({
            ...prevState,
            upvotes: prevState.upvotes + 1,
        }));
    }
    return (
        <>
            <div className='first-container'>
                <div className='article'>
                    {user ? (
                        <Upvote articleId={articleId} woFunc={handleWoFunc} />
                    ) : (
                        <button>Login to Upvote</button>
                    )}
                    <Scrollbars style={{ width: "100%", height: "100%" }}>
                        <p>{articleInfo.name}</p>
                        <h1>{articleInfo.title}</h1>
                        <p>{articleInfo.content}</p>
                    </Scrollbars>
                    <label style={{ fontWeight: 'bold' }}>This article has {articleInfo.upvotes} upvotes</label>
                </div>
                <div className='comments-upVotes'>
                    <div className='add-comment'>
                        <h1>
                            {user ?
                                <AddComment sendData={handleDataFromComponent} /> :
                                <button >Login to comment</button>
                            }
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

