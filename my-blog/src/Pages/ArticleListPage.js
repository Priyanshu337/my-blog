import ArticleList from '../Component/ArticlesList';
import ArticlePages from './ArticlePage'
import './pages.css'

const ArticleListPage = () => {
    return (
        <div className='Article-container'>
            <h1> Articles </h1>
            <ArticleList ArticlePages={ArticlePages} />
        </div>
    );
}
export default ArticleListPage; 