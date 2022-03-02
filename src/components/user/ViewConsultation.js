import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Nav from '../layout/Nav';
import Footer from '../layout/Footer';
import { API } from '../../config';
import { isAuthenticated } from '../auth';
import { getBooking, getConsultation } from '../admin/apiAdmin';

const ViewConsultations = ({ match }) => {
    const { token } = isAuthenticated()
    const [values, setValues] = useState({
        title: '',
        owner: '',
        location: '',
        availability: true,
        price: '',
        desc: '',
        listing_type: '',
        image: '',
        categories: [],
        category: '',
        consultation_type: '',
        consultation_with: '',
        property_status:'',
        success: false,
    })

    const { title, owner, location, availability, price, property_status,desc, listing_type, image, categories, category, consultation_type, consultation_with } = values
    const { error, success } = values

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
                        listing_ype: data.listing_type,
                        image: data.property_image,
                        category: data.category,
                        consultation_type: data.consultation_type,
                        consultation_with: data.consultation_with,
                        property_status: data.property_status,
                        error: '',
                        success: false,
                    })
                    // console.log("getting data")
                    // console.log(current)
                }
            })
            .catch(err => console.log(err))
    }, [])



    return <>
        <Nav />
        <div className='container w-50 shadow-lg p-5'>
            <main className="form-signin">

                <form>

                    <div className="text-primary fw-bold">

                        <h4>Consulation Info:</h4><br />
                        <img src={`http://localhost:5000/${image}`} alt={title} style={{ 'width': '100%' }} /><br />

                        Title:{title}<br />
                        Owner:{owner}<br />
                        Location:{location}<br />
                        Price:Rs.{price}<br />
                        Consultation with: {consultation_with}<br />
                        {consultation_type}<br/>
                        Status: {property_status}



                    </div>
                    <a href='/user/consultations' className="w-100 btn btn-lg btn-primary" type="submit" >Go Back</a>
                </form>
            </main>
        </div>
        <Footer />
    </>;
};

export default ViewConsultations;
