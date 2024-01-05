import articles from './Article-content';
import ArticleList from '../Component/ArticlesList';

import './pages.css'

const ArticleListPage = () => {
    return (
        <div className='Article-container'>
            <h1> Articles </h1>
            <ArticleList articles={articles} />
        </div>
    );
}
export default ArticleListPage;