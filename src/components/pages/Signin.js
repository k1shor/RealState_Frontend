import React, {useEffect, useState} from 'react'
import Footer from '../layout/Footer'
import Nav from '../layout/Nav'
import { Link } from 'react-router-dom'
import {isAuthenticated, keep_logged, signin} from '../auth'
import {Redirect} from 'react-router-dom'

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        redirectTo: false
    })
    const { email, password, error, redirectTo } = values

    const handleChange = name => event => {
        setValues({...values,error:false,[name]:event.target.value})
    }

    const submitForm=event=>{
        event.preventDefault();
        setValues({...values,error:false})
        signin({email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                keep_logged(data,()=>{
                    setValues({...values,redirectTo:true})
                })
            }
        })
    }

    // to show error
    const showError = () => (
        <div className='aler alert-danger' style={{display:error?'':'none'}}>{error}</div>
    )

    // redirect if successful signin
    const {user} = isAuthenticated()
    const redirect =()=>{
        if(redirectTo){
            if(user && user.role==1){
            return <Redirect to='/admin/dashboard'/>
        }
            else {
                return <Redirect to='/'/>
            }
        }
    }
    

    
   
    return (
        <div>
            {redirect()}
            <Nav />
            {showError()}
            <div className="col-md-6 m-auto border border-1 my-3 px-3 shadow-lg rounded-3">
                <form className="mt-2">
                    <center><img className="mb-4" src="./logo.png" alt="" width="72" height="72" /></center>
                    <h1 className="h3 mb-3 fw-normal">Sign In</h1>


                    <div className="form-floating my-3 shadow-lg">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={handleChange('email')}/>
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating my-3 shadow-lg">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handleChange('password')} />
                        <label for="floatingPassword">Password</label>
                    </div>
                    
                    <center>
                        <div className="checkbox mb-3 text-start">
                            <label>
                                <input type="checkbox" value="remember-me" /> Remember me.
                            </label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" onClick={submitForm}>Sign In</button>
                        <Link to="/forgotpassword">Forgot Password</Link><br/>
                        Do not have an account ?  <Link to="/signup">Sign Up.</Link>
                        <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                    </center>
                </form>
            </div>

            <Footer />
        </div>
    )
}

export default Signin
