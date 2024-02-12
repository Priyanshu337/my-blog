// import ArticleList from '../Component/ArticlesList';
// import ArticleInfo from './ArticlePage'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleList from '../../Component/ArticleList/ArticlesList';
import "./ArticleListPage.css";



const ArticleListPage = () => {
    const [articleList, setArticleList] = useState([]);
    useEffect(() => {
        LoadArticle();
    }, [])

    const LoadArticle = async () => {
        const { data } = await axios.get('http://localhost:8080/api/articles');
        setArticleList(data);
    }
    return (
        <div className='Article-container'>
            <h1> Articles </h1>
            <ArticleList list={articleList} />
        </div>
    );
}
export default ArticleListPage;
