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
            <div className="main-container" style={{
                // backgroundImage: `url(${Home_bg_img})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '100vh',
            }}>
                <h1 style={{ border: '2px solid black' }}>Home</h1>
                <SearchBar />
            </div>
            <div className="articledisp-container">
                <ArticleList list={articleList} />
            </div>
        </>
    )
}

export default HomePage;
