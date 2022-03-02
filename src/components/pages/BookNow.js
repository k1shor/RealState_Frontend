import React from 'react';
import { isAuthenticated } from '../auth';
import { propertyDetails } from '../uiapi';
import { useState, useEffect } from 'react';
import { createbooking } from '../admin/apiAdmin';
import { Redirect } from 'react-router-dom';
import Nav from '../layout/Nav';
import Footer from '../layout/Footer';

const BookNow = (props) => {
    const user = isAuthenticated()
    const [redirect, setRedirect] = useState('')
    const [values, setValues] = useState({
        property_title: props.property_title,
        property_owner: props.property_owner,
        property_location: props.property_location,
        property_availability: true,
        property_price: props.property_price,
        property_status: 'booked',
        property_image: props.property_image,
        listing_type: props.listing_type,
        category: props.category,
        booked_by: user.email,
        current_listing_type: '',
        duration: '',
        error: '',
        success: false,

    })
    const { property_title, current_listing_type, property_owner, property_location, duration, property_availability, property_price, property_status, property_image, listing_type, category, error, success, formData } = values

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
        loadSingleProduct(propertyId)
    }, [props])

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })

    }

    const clickSubmit = event => {
        event.preventDefault()
        // console.log(user.user.email)
        setValues({
            ...values,
            property_title: property.property_title,
            property_owner: property.added_by,
            property_location: property.property_location,
            property_availability: false,
            property_price: property.property_price,
            property_status: 'on review',
            property_image: property.property_image,
            listing_type: property.listing_type,
            current_listing_type: property.listing_type,
            category: property.category,
            booked_by: user.user.email,
            duration: 0,
            success: true,
            error: ''
        })
        console.log(values)
        console.log(user)

        createbooking(user, values)
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

            return <Redirect to={`/contractcomplete`} />

        }
    }
    //to show error msg
    const showError = () => (
        <div className="alert-alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>
    )
    return <div>
        <Nav />
        {showError()}
        {redirectTo()}
        <div className='container-fluid my-5 mx-auto'>
            <div className='text-center text-info h3'> Contract Page </div>
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





                    {property.added_by == user.user.email ?
                        <h4>You are viewing your own listing.</h4> :

                        <>
                            <h5 className="card-text">Owner: {property.added_by}</h5>
                            <h5 className="card-text">Customer: {user.user.email}</h5>
                            {property.listing_type == "RENT" &&
                                <>
                                    Duration:<select onChange={handleChange('duration')}>
                                        <option value="1 year">1 Year</option>
                                        <option value="2 year">2 Year</option>
                                        <option value="3 year">3 Year</option>
                                        <option value="5 year">5 Year</option>
                                        <option value="10 year">10 Year</option>
                                    </select><br /><br />
                                </>
                            }
                            <input type="checkbox" id="check" className='me-3' onClick={() => setValues({
                                ...values, property_image: property.property_image,
                                property_title: property.property_title,
                                property_owner: property.added_by,
                                property_location: property.property_location,
                                property_availability: false,
                                property_price: property.property_price,
                                property_status: 'on review',
                                listing_type: property.listing_type,
                                category: property.category,
                                booked_by: user.user.email,
                            })} />

                            <label htmlFor='check'> I accept the terms and conditions.</label><br />
                            {property.property_availability ?
                                <div class='btn-group' >
                                    <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" >Confirm</button>

                                </div>
                                : "This listing is not available at the moment."
                            }</>
                    }





                </div>
            </div>
        </div>
        <Footer />

        {/* <!-- Button trigger modal --> */}
<button type="button" class="btn btn-primary" >
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={clickSubmit} data-bs-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>


};

export default BookNow;
