import React, { useEffect, useState } from 'react';
import Nav from '../layout/Nav';
import Footer from '../layout/Footer';
import { isAuthenticated } from '../auth';
import { getConsultation, getContract } from './apiAdmin';
import { API } from '../../config';
import { Redirect } from 'react-router-dom';

const Consultation = ({ match }) => {
    const { token } = isAuthenticated()
    
    const [values, setValues] = useState({
        title: '',
        owner: '',
        location: '',
        availability: true,
        price: '',
        listing_type: '',
        image: '',
        categories: [],
        category: '',
        booked_by: '',
        property_status:'',
        current_status:'',
        success: false,
    })

    const { title, owner, current_status, location, availability, price, desc, listing_type, image, categories, category, booked_by, property_status } = values

    const [redirect, setRedirect] = useState(false)

    
    useEffect(() => {
        //find booking
        //find booking
        console.log(match.params.id)
        getConsultation(token, match.params.id)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setValues({
                        ...values,
                        title: data.property_title,
                        owner: data.property_owner,
                        location: data.property_location,
                        availability: data.property_availability,
                        price: data.property_price,
                        desc: data.property_desc,
                        listing_type: data.listing_type,
                        image: data.property_image,
                        category: data.category,
                        booked_by: data.booked_by,
                        error: '',
                        property_status:data.property_status,
                        success: false,
                        current_status:data.property_status,
                    })
                    // console.log("getting data")
                    // console.log(current)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })

    }
    const clickSubmit = event => {
        event.preventDefault()
        //delete contract
        console.log(property_status)
        fetch(`${API}/updateconsultation/${match.params.id}`, {
            method: "PUT",
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

    // to redirect if successfully terminated contract
    const redirectTo = () => {
        if (redirect) {

            return <Redirect to={`/admin/consultation/updated`} />

        }
    }

    return <>
        <Nav />
        {redirectTo()}
        <div className='container w-50 shadow-lg p-5'>
            <main className="form-signin">

                <form>

                    <div className="text-primary fw-bold">

                        <h4>Consultation Info:</h4><br />
                        <img src={`http://localhost:5000/${image}`} alt={title} style={{ 'width': '100%' }} /><br />

                        Title:{title}<br />
                        Location:{location}<br />
                        Price:Rs.{price}<br />
                        
                        Owner:{owner}<br />
                        Customer:{booked_by}<br /><br />

                        Current Status: {current_status}<br/><br/>
                        Update to:
                        <div className='form-check'>
                            <input type="radio" value="Approved" id='app' name="check" onClick={handleChange('property_status')} /><label htmlFor="app">Approve</label>
                            <input type="radio" className='ms-5' value="Declined" id="den" name="check" onClick={handleChange('property_status')} /><label htmlFor="den">Decline</label>
                        </div>




                    </div>
                    <button className='btn btn-info w-50' onClick={clickSubmit}>Update Consultation</button>
                    <a href='/admin/consultations' className="w-50 btn btn-primary" >Go Back</a>


                </form>
            </main>
        </div>
        <Footer />
    </>;
};

export default Consultation;
