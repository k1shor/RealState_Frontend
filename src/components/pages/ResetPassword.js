import React, { useState } from 'react';
import Footer from '../layout/Footer';
import Nav from '../layout/Nav';
import { API } from '../../config';

const ResetPassword = ({match}) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        cpassword: '',
        error: '',
        success: false
    })

    const { email, password, cpassword, error, success } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false })
    
   
        const token = match.params.token

        //reset password
        fetch(`${API}/resetpassword/${token}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setValues({ ...values, email: '', password: '', cpassword: '', success: true })
                }
            })
            .catch(error => console.log(error))
        
        }
    // to show success
    const showSuccess = () => (
        <div className='aler alert-success' style={{ display: success ? '' : 'none' }}>
            Password has been reset successfully.
        </div>
    )

    // to show error
    const showError = () => (
        <div className='aler alert-danger' style={{ display: error ? '' : 'none' }}>{error}</div>
    )

    return <>
        <Nav />
        <div className='container w-50 shadow-lg p-5'>
            <main className="form-signin">
                {showSuccess()}
                {showError()}
                <form>
                    <img className="mb-4" src="logo192.png" alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Reset Password</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={handleChange('email')} value={email} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingInputPwd" placeholder="" onChange={handleChange('password')} value={password} />
                        <label htmlFor="floatingInputPwd">Password</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingInputCPwd" placeholder="" onChange={handleChange('cpassword')} value={cpassword} />
                        <label htmlFor="floatingInputCPwd">Confirm Password</label>
                    </div>



                    <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={clickSubmit}>Reset Password</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
            </main>
        </div>
        <Footer />
    </>;
};

export default ResetPassword;
