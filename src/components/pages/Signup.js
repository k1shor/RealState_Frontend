import React, {useState} from 'react'
import Footer from '../layout/Footer'
import { Link } from 'react-router-dom'
import './signup.css'
import Nav from '../layout/Nav'
import { signup } from '../auth'
import { Formik,Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'



const Signup = () => {
        
    const [values, setValues] = useState({
        fname: "",
        lname:"",
        dob:"",
        email: "",
        password: "",
        phone:"",
        error: "",
        success: false
    })
    const { fname, lname, dob, email, password, phone, error, success } = values

    const handlechange = name => event => {
        setValues({...values,error:false,[name]:event.target.value})
    }

    const submitForm = event => {
        event.preventDefault()
        setValues({...values,error:false})
        signup({fname, lname, dob, email, phone,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }
            else{
                setValues({...values,fname:'', lname:'', dob:'', email:'',phone:'',password:'',success:true})
            }
        })
        .catch(error=>console.log(error))
    }

    // to show error
    const showError = () => (
        <div className='alert alert-danger' style={{display:error?'':'none'}}>{error}</div>
    )


    // to show success
    const showSuccess = () =>(
        <div className='alert alert-success' style={{display:success?'':'none'}}>
            New account created. Please verify your account to continue.
        </div>
    )



    return (
        <>
            <Nav />
            {showError()}
            {showSuccess()}
            

            <div className='col-md-6 m-auto border border-1 my-3 p-5 shadow-lg rounded-3'>
                <main className="form-signin">
                   
               
                    <form>
                    
                        <div className='text-center'>
                            <img className="mb-4" src="logo.png" alt="" width="72" height="72" />
                        </div>
                        <h1 className="h3 mb-3 fw-normal">Register</h1>

                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" id="floatingfirstname" placeholder="first name here" name="fname" onChange={handlechange('fname')} value={fname}/>
                            <label htmlFor="floatingfirstname">First name</label>
                     
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatinglastname" placeholder="last name here" name="lname" onChange={handlechange('lname')} value={lname}/>
                            <label htmlFor="floatinglastname">Last name</label>
                           
                        </div>
                        <div className="form-floating">
                            <input type="date" className="form-control" id="floatingdate" placeholder="date of birth here" onChange={handlechange('dob')} value={dob} />
                            <label htmlFor="floatingdate">Date of Birth</label>
                        </div>

                        {/* <label className='form-control form-floating'>Gender:
                            <div className='d-flex justify-content-evenly'>
                                <div className="form-check ms-5">
                                    <input className="form-check-input mt-1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label className="form-check-label ms-1" for="flexRadioDefault1">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input mt-1" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label className="form-check-label" for="flexRadioDefault2">
                                        Female
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input mt-1" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                                    <label className="form-check-label" for="flexRadioDefault3">
                                        Other
                                    </label>
                                </div>
                            </div>
                        </label> */}



                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatinginput" placeholder="name@example.com" name="email" onChange={handlechange('email')} value={email} />
                            <label htmlFor="floatinginput">Email address</label>
                           
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatinginput2" placeholder="12345" name="phone" onChange={handlechange('phone')} value={phone} />
                            <label htmlFor="floatinginput2">Phone</label>
                           
                        </div>

                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={handlechange('password')} value={password}/>
                            <label htmlFor="floatingPassword">Password</label>
                            
                        </div>

                        

                        {/* <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me" /> I accept the terms the conditions.
                            </label>
                        </div> */}
                        <br/> 
                        <br/>
                        <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={submitForm}>Register</button>
                        Already have an account? <Link to='/signin'>Sign in</Link>

                        {/* <p className="mt-5 mb-3 text-muted">&copy; 2017 – 2021</p> */}
                    
                    </form>
                </main>
            </div>
           
            <Footer />
        </>
    )
    
}

export default Signup
