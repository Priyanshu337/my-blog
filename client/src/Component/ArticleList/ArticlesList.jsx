import { Link } from 'react-router-dom';
import "./ArticleList.css";

const ArticleList = ({ list }) => {
    console.log("hit", list);

    return (
        <>
            < div classname="article-list">
                {
                    list?.map(article => (
                        <div className='content'>
                            <Link key={article._id} className='article-list-item' to={`/articles/${article._id}`}>
                                <label classname='label-title'>{article.title}</label>
                                <p className='p-content'>{article.content[0].substring(0, 100)}...</p>
                            </Link>
                        </div>
                    ))
                }
            </div >
        </>
    )
}
export default ArticleList