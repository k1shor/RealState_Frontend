import React, { useEffect, useState } from 'react';
import Nav from "../../layout/Nav"
import Footer from "../../layout/Footer"
import { API } from '../../../config';
import { isAuthenticated } from '../../auth';
import { Redirect } from 'react-router-dom';

const DeleteProperty = ({ match }) => {
    const { token } = isAuthenticated()
    const [current,setCurrent] = useState({})
    const [values, setValues] = useState({
        error: '',
        success: false,
    })

    const { error, success } = values
    
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        //find category
        fetch(`${API}/findproperty/${match.params.token}`,{
            method:"GET"
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
            setValues({ ...values, error: data.error, success: false })
        }
        else{
            setCurrent(data)
            // console.log(data)
        }})
        .catch(err=>console.log(err))
    },[])


    
    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false })
       //delete category
        fetch(`${API}/deleteproperty/${match.params.token}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setValues({ ...values, redirect: true })
                    setRedirect(true)
                }
            })
            .catch(error => console.log(error))

    }



    // to redirect if successfully deleted
    const redirectTo = () => {
        if (redirect) {

            return <Redirect to={`/admin/property/deleteSuccess`} />

        }
    }

    // to show error
    const showError = () => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>{error}</div>
    )

    return <>
        <Nav />
        <div className='container w-50 shadow-lg p-5'>
            <main className="form-signin">
                {redirectTo("category deleted")}
                {showError()}
                <form>
                    
                    <h1 className="h3 mb-3 fw-normal">Delete Listing</h1>

                    <div className="text-danger fw-bold">
                        
                        <h4>Listing Info:</h4><br/>
                        <img src={`http://localhost:5000/${current.property_image}`} alt={current.property_title} style={{'width':'100%'}}/><br/>
                        Title:{current.property_title}<br/>
                        Location:{current.property_location}<br/>
                        Price:Rs.{current.property_price}<br/>
                        Availablity:{current.property_availability?"Yes":"No"}<br/>
                        

                    </div>
            
                    <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={clickSubmit}>Delete Listing</button>
                </form>
            </main>
        </div>
        <Footer />
    </>;
};

export default DeleteProperty;
