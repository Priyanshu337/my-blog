import "./HomePage.css"
import Home_bg_img from "../../Assets/Home_bg_img.avif";
import SearchBar from "../../Component/searchBar/searchBar";

const HomePage = () => {
    return (
        <>
            <div className="main-container" style={{
                backgroundImage: `url(${Home_bg_img})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '100vh',
            }}>
                <h1 style={{ border: '2px solid black' }}>Home</h1>
                <SearchBar />
            </div>
        </>
    )
}

export default HomePage;



{/* <div className="body-container">
                    <div className="intro-container">
                        <label>Why i built this</label>
                        <p>While Working on my skills and </p>
                    </div>
                    <div className="second">
                        <h1>Hello</h1>
                    </div>
                </div> */}