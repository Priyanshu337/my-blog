import { useState } from "react"
import axios from "axios";
import './index.css';
import useUser from "../../hooks/useUser";


const ContactPage = () => {


    const [query, setQuery] = useState('');
    const { userEmail } = useUser();


    const formSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/contact/contactform', {
                email: userEmail,
                query: query,
            },
            );

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="main">
            <div className="container-1">
                <div className="contact-form">
                    <label>Query:</label>

                    <input type="content" placeholder="Enter your reason to send form" value={query} onChange={(e) => { setQuery(e.target.value) }} />
                    <button type="submit" className="btn" onClick={formSubmit}>Send</button>
                </div>
            </div>
            <div className="container-2">
                <h3>Contact</h3>
                <div className="contact-info" >
                    <p>You can contact us on email: priyanshuchoudhary0104@gmail.com.</p>
                    <p>You can call us also +1 647-937-2641.</p>
                    <a href="www.linkedin.com/in/priyanshu0209">LinkedIn</a>
                </div>

            </div>
        </div>
    )
}

export default ContactPage