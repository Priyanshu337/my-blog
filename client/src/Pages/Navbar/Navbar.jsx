import { Link } from "react-router-dom";
import myBlog from "../../Assets/My Blog.png";
import "./Navbar.css"

const Navbar = () => {
    return (
        <>
            <nav className="nav-container" >
                <div>
                    <img src={myBlog}></img>
                </div>
                <div className="links-container">
                    <Link to="/" className="link">Home</Link>
                    <Link to="/about" className="link">About</Link>
                    <Link to="/articles" className="link">Articles</Link>
                    <Link to="/contact" className="link">Contact</Link>
                </div>
                <div className="addArticle-container">
                    <Link to="/index" className="addArticle" >Add Article</Link>
                </div>
            </nav >
        </>
    );
}

export default Navbar;