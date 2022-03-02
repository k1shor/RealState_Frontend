import React, { useState } from 'react';
import Footer from '../layout/Footer';
import Nav from '../layout/Nav';
import { API } from '../../config';
import { Redirect } from 'react-router-dom';
import { safePreventDefault } from 'react-slick/lib/utils/innerSliderUtils';

const Contact = () => {
    const [redirect, setRedirect] = useState(false)
    const [msg, setMsg] = useState('')
    const [email, setEmail] = useState('')
    const [error,setError] = useState('')

    // to show error
    const showError = () => (
        <div className='aler alert-danger' style={{ display: error ? '' : 'none' }}>{error}</div>
    )

    // to show success
    const redirectTo = () => (
        redirect && <Redirect to='/messageSent'/>
    )


    return <div>
        <Nav />
        {showError()}
        {redirectTo()}
        <div className="container col-xl-10 col-xxl-8 px-4 py-5 mx-auto">
            <div className="row align-items-center g-lg-5 py-5">
                <div className="col-lg-7 text-center text-lg-start">
                    <h1 className="display-4 fw-bold lh-1 mb-3">Real State Nepal Pvt. Ltd. </h1>
                    <p className="col-lg-10 fs-4">Kathmandu, Nepal.<br />
                        Phone No.: +977-9851012345, <br />Email: info@realstatenepal.com <br />
                        website: www.realstatenepal.com</p>
                </div>
                <div className="col-md-10 mx-auto col-lg-5">
                    <form className="p-4 p-md-5 border rounded-3 bg-light">
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" 
                            onChange={e=>setEmail(e.target.value)}/>
                            <label for="floatingInput">Email address</label>
                        </div>

                        <textarea rows="5" className="form-control" id="floatingPassword" placeholder="Message" onChange={e=>setMsg(e.target.value)}></textarea>


                        <div className="checkbox mb-3">

                        </div>
                        <hr className="my-4" />
                        <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={(e) => {
                            e.preventDefault()
                            fetch(`${API}/postmessage`,{
                            method:"POST",
                            headers:{
                                Accept:"Application/JSON",
                                "Content-Type":"Application/JSON"
                            },
                            body:JSON.stringify({
                                "email":`${email}`,
                                "message":`${msg}`
                            })
                            })
                            .then(res => res.json())
                            .then(data=>{
                                if(data.error){
                                    setError(data.error)
                                }
                                else{
                                    setRedirect(true)
                                }
                            })
                            .catch(err=>console.log(err))
                        }

                        }>Send Email</button>


                    </form>
                </div>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.276892025526!2d85.29111314602403!3d27.709031933628154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600!5e0!3m2!1sen!2snp!4v1644315514555!5m2!1sen!2snp" width="100%" height="450" style={{ 'border': '0' }} allowfullscreen="" loading="lazy"></iframe>
        </div>
        <Footer />


        
    </div>;

};

export default Contact;
