import './AboutPage.css'

import image from '../../Assets/image.jpg'

const AboutPage = () => {
    return (
        <>

            <div className='Main'>
                <div>
                    <div className='Logo'>
                        <img src={image} ></img>
                    </div>
                </div>
                <div className='secound-main'>
                    <div className='description'>
                        <h1>About this Page </h1>
                        <p> </p>
                    </div>

                </div>
            </div>
        </>
    );
}

export default AboutPage;