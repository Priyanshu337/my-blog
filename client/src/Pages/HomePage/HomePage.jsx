import { useState, useEffect } from "react";
import axios from "axios";

import "./HomePage.css"
import SearchBar from "../../Component/searchBar/searchBar";
import ArticleList from "../../Component/ArticleList/ArticlesList";

const HomePage = () => {

    const [articleList, setArticleList] = useState([]);

    const LoadArticle = async () => {
        const { data } = await axios.get('http://localhost:8080/api/articles');
        setArticleList(data);
    }
    useEffect(() => {
        LoadArticle();
    }, [])

    console.log(articleList);
    return (
        <>
            <div className="main-container">
                <SearchBar />
                <div className="articledisp-container">
                    <ArticleList list={articleList} />
                </div>
            </div>

        </>
    )
}

export default HomePage;
