import React, { useEffect, useState } from 'react';
import Nav from "../../layout/Nav"
import Footer from "../../layout/Footer"
import { API } from '../../../config';
import { isAuthenticated } from '../../auth';
import { Redirect } from 'react-router-dom';

const ReadMessage = ({ match }) => {
    const { token } = isAuthenticated()

    const [values, setValues] = useState({
        email: '',
        message: ''
    })

    const {email, message} = values

    const [error,setError] = useState('')

    useEffect(() => {
        //find category
        fetch(`${API}/findmessage/${match.params.token}`,{
            method:"GET"
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
            setError(data.error)
        }
        else{
            setValues({
                email:data.email,
                message:data.message
            })
        }})
        .catch(err=>console.log(err))
    },[])


    
    // to show error
    const showError = () => (
        <div className='aler alert-danger' style={{ display: error ? '' : 'none' }}>{error}</div>
    )

    return <>
        <Nav />
        <div className='container w-50 shadow-lg p-5'>
            <main className="form-signin">
                {showError()}
                <form>
                    
                    <h1 className="h3 mb-3 fw-normal">Message</h1>

                    <hr/>
                    <h2>Subject: {email}</h2>
                    <h4>Message: {message}</h4>

                    <a className="w-100 btn btn-lg btn-primary" href={`/contact/`}>Edit Category</a>
                </form>
            </main>
        </div>
        <Footer />
    </>;
};

export default ReadMessage;
