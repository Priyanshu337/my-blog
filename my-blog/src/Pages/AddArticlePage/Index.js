import React from 'react'
import axios from 'axios';
import { useState } from "react";
import AddArticle from './AddArticle';
import ArticleListPage from '../../Component/ArticleList/ArticlesList';

export default function Index() {
    const client = axios.create({
        baseUrl: "http://localhost:8080/api/articles/add"
    })

    const [article, setArticle] = useState([]);
    const addArticle = async (articleName, title, content, comments, upvotes) => {
        const response = await client.post('http://localhost:8080/api/articles/add', {
            articleName,
            title,
            content,
            comments,
            upvotes,
        });
        setArticle((prevArticle) => [response.data, ...prevArticle])
        console.log("ArticleAdded", article)
    };

    return (
        <div>
            < AddArticle addArticle={addArticle} />
            < ArticleListPage />
        </div>
    )
}

