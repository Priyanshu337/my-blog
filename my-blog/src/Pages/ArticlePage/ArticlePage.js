import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function ArticlePages() {

    const [articleInfo, setArticleInfo] = useState({
        "title": "",
        "name": "",
        "content": "",
        "comments": "",
        "upVotes": "",
    });

    const { articleid } = useParams();

    const loadArticleInfo = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/articles/${articleid}`);
            const newArticleInfo = response.data;
            const { name, title, content, comments, upVotes } = newArticleInfo;
            setArticleInfo(newArticleInfo);

        } catch (error) {
            console.error('Error loading article info:', error.message);
            console.error('Error details:', error);
        }
    }, [articleid]);
    useEffect(() => {
        loadArticleInfo();
    }, [loadArticleInfo]);

    return (
        <>
            <div>
                <h1>{articleInfo.title}</h1>
                <p>{articleInfo.name}</p>
                <p>{articleInfo.content}</p><br />

            </div>
            <div className='comments-upVotes'>
                <div className='comment-container'>
                    <label>{articleInfo.comments}</label><br />
                </div>
                <div className='upVotes-container'>
                    <label>{articleInfo.upVotes}</label>
                </div>
            </div>


        </>
    );
}
export default ArticlePages;


