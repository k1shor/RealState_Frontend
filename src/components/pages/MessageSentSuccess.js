import React from 'react';
import Footer from '../layout/Footer';
import Nav from '../layout/Nav';

const MessageSentSuccess = () => {
    


    return <div>
        <Nav />
        
        <div className="container col-xl-10 col-xxl-8 px-4 py-5 mx-auto">
            <div className="row align-items-center g-lg-5 py-5">
                <div className="col-lg-7 text-center text-lg-start">
                    <h1 className="display-4 fw-bold lh-1 mb-3">Real State Nepal Pvt. Ltd. </h1>
                    <p className="col-lg-10 fs-4">Kathmandu, Nepal.<br />
                        Phone No.: +977-9851012345, <br />Email: info@realstatenepal.com <br />
                        website: www.realstatenepal.com</p>
                </div>
                <div className="col-lg-5 mx-auto text-center text-lg-center h3">
                    Thank you for your message. We will contact you soon. Meanwhile, you can view other listings.<a href={ `/`}>Go to Home</a>
                </div>
                
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.276892025526!2d85.29111314602403!3d27.709031933628154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600!5e0!3m2!1sen!2snp!4v1644315514555!5m2!1sen!2snp" width="100%" height="450" style={{ 'border': '0' }} allowfullscreen="" loading="lazy"></iframe>
        </div>
        <Footer />
    </div>;

};

export default MessageSentSuccess;
