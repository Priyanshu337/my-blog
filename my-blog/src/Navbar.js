import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul className="list-of-navbar">
                <li >
                    <Link to="/" >Home</Link>
                </li>

                <li>
                    <Link to="/about">About</Link>
                </li>

                <li>
                    <Link to="/articles">Articles</Link>
                </li>
            </ul>
            < hr />
        </nav >
    );
}

export default Navbar;