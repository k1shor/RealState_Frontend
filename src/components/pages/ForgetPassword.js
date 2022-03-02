import React, { useState } from 'react';
import { forgetpassword } from '../auth';
import Footer from '../layout/Footer';
import Nav from '../layout/Nav';

const ForgetPassword = () => {
    const [values, setValues] = useState({
        email: '',
        error: '',
        success: false
    })
    const { email, error, success } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false })
        //forget password function
        forgetpassword({ email })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setValues({ ...values, email: '', success: true })

                }

            })
    }

    // to show success
    const showSuccess = () => (
        <div className='aler alert-success' style={{ display: success ? '' : 'none' }}>
            Password Reset Link has been sent to your email.
        </div>
    )

    // to show error
    const showError = () => (
        <div className='aler alert-danger' style={{display:error?'':'none'}}>{error}</div>
    )

    return <>
        <Nav />
        {showSuccess()}
        {showError()}
        <div className='container w-50 shadow-lg p-5'>
            <main className="form-signin">
                
                <form>
                    <img className="mb-4" src="logo192.png" alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Reset Password</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={handleChange('email')} value={email} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>



                    <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={clickSubmit}>Send Email</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
            </main>
        </div>
        <Footer />
    </>;
};

export default ForgetPassword;
