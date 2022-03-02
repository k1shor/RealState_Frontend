import React from 'react';
import { isAuthenticated } from '../auth';
import { propertyDetails } from '../uiapi';
import { useState, useEffect } from 'react';
import { createConsultation } from '../admin/apiAdmin';
import { Redirect } from 'react-router-dom';
import Nav from '../layout/Nav';
import Footer from '../layout/Footer';

const BookNow = (props) => {
    const user = isAuthenticated()
    const [redirect, setRedirect] = useState('')

    const [values, setValues] = useState({
        property_title: props.property_title,
        consultation_type: '',
        consultation_with: '',
        property_owner:'',
        property_location: props.property_location,
        property_availability: true,
        property_price: props.property_price,
        property_status: '',
        property_image: props.property_image,
        listing_type: props.listing_type,
        category: props.category,
        booked_by: user.email,
        error: '',
        success: false,
    })
    const { property_title, consultation_type, consultation_with, property_owner,property_location, property_availability, property_price, property_status, property_image, listing_type, category, error, success } = values

    const [property, setProperty] = useState({})

    const loadSingleProduct = propertyId => {
        propertyDetails(propertyId).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setProperty(data)
            }
        })
    }
    useEffect(() => {
        const propertyId = props.match.params.id
        // console.log(props.match.params.id)
        loadSingleProduct(propertyId)
    }, [props])

    const handleChange = name => event => {
        // console.log(name)
        // console.log(event.target.value)
        setValues({ ...values, [name]: event.target.value })
    }
    const clickSubmit = event => {
        event.preventDefault()
        // console.log(user.user.email)
        setValues({
            ...values,
            property_title: property.property_title,
            consultation_type: consultation_type,
            consultation_with: consultation_with,
            property_owner: property.added_by,
            property_location: property.property_location,
            property_availability: false,
            property_price: property.property_price,
            property_status: 'on consultation',
            property_image: property.property_image,
            listing_type: property.listing_type,
            category: property.category,
            booked_by: user.user.email,
            success: true,
            error: ''
        })
        // console.log(values)
        console.log(user)

        createConsultation(user, values)
        .then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            }
            else {
                setRedirect(true)
            }
        })
    }
    const redirectTo = () => {
        if (redirect) {

            return <Redirect to={`/consultationRequested`} />

        }
    }


    return <div>
        <Nav/>
        {redirectTo()}
        <div className='container-fluid my-5 mx-auto'>
            <div className='row align-items-center'>
                <div className='col col-md-7 text-center'>
                    <img src={`http://localhost:5000/${property.property_image}`} className="image-fluid rounded-start" alt={property.property_name} style={{ 'width': '80%' }} />
                </div>
                <div className='col col-md-5'>
                    <h5 className="card-title h1">{property.property_title}</h5>
                    <h5 className="card-title h3">Location:{property.property_location}</h5>

                    <h5 className="card-title">{property.property_name}</h5>
                    <h5 className="card-text">Price: Rs.{property.property_price}</h5>
                    <p className="card-text  text-dark">Description:<b>{property.property_desc}</b></p>
                    <b>Consultation type:</b>
                    <select className="form-control w-25"  onChange={handleChange('consultation_type')} >
                        <option></option>
                        <option value={"on site"}>On Site</option>
                        <option value={"off site"}>Off Site</option>

                    </select>
                    <b>Consultation With:</b><div className='d-flex justify-content-evenly'>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="consult" value={'Engineer'} id="flexCheckDefault" onClick={handleChange('consultation_with')} />
                        <label class="form-check-label" for="flexCheckDefault">
                            Engineer
                        </label></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="consult" value={'Agent'} id="flexCheckDefault1" onClick={handleChange('consultation_with')} />
                        <label class="form-check-label" for="flexCheckDefault1">
                            Agent
                        </label></div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="consult" value={'Interior Designer'} id="flexCheckDefault2" onClick={handleChange('consultation_with')} />
                        <label class="form-check-label" for="flexCheckDefault2">
                            Interior Designer
                        </label>
                    </div>
                    </div><br/>
<div class="form-check">
                    <input type="checkbox" id="check" className='form-check-input me-3' onClick={()=>setValues({
            ...values,property_image:property.property_image,
            property_title: property.property_title,
            property_owner: property.added_by,
            property_location: property.property_location,
            property_availability: false,
            property_price: property.property_price,
            property_status: 'on review',
            listing_type: property.listing_type,
            category: property.category,
            booked_by: user.user.email,
            })}/>

            <label htmlFor='check'  class="form-check-label" for="check"> I accept the terms and conditions.</label></div><br/>
{property.property_availability ?
<div class='btn-group'>
<button className="btn btn-primary" onClick={clickSubmit}>Seek Consulation</button>

</div>
: "This listing is not available at the moment."
}






                    

                    
                </div>
            </div>
        </div>
<Footer/>
    </div>;
};

export default BookNow;
