import { Link } from 'react-router-dom';
import "./ArticleList.css";


const ArticleList = ({ list }) => {

    return (
        <>
            < div className='article-list' >
                {
                    list?.map(article => (
                        < div className='content'>
                            <Link key={article.id} className='article-list-item' to={`/articles/${article.name}`}>
                                <h3>{article.title}</h3>
                                <p>{article.content[0].substring(0, 100)}...</p>
                            </Link>
                        </div>
                    ))
                }
            </div >
        </>

    )
}

export default ArticleList