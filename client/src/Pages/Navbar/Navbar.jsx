import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import myBlog from "../../Assets/My Blog.png";
import "./Navbar.css"

const Navbar = () => {

    return (
        <>
            <nav className="nav-container" >
                <div className="my-blogImg">
                    <img src={myBlog}></img>
                </div>
                <div className="links-container">
                    <Link to="/" className="link">Home</Link>
                    <Link to="/about" className="link">About</Link>
                    <Link to="/articles" className="link">Articles</Link>
                    <Link to="/contact" className="link">Contact</Link>
                </div>
                <div className="addArticle-container">
                    <button className="addArticle-btn">
                        <Link to="/index" className="addArticle" >Add Article</Link>
                    </button>
                </div>
            </nav >
        </>
    );
}

export default Navbar;