import React, { useEffect, useState } from 'react';
import Nav from '../layout/Nav';
import Footer from '../layout/Footer';
import { isAuthenticated } from '../auth';
import { getContract, getproperties } from '../admin/apiAdmin';
import { API } from '../../config';
import { Redirect } from 'react-router-dom';

const Contract = ({ match }) => {
    const { token } = isAuthenticated()
    const [properties, setProperties] = useState([])
    const [property, setProperty] = useState({})

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
        duration: '',
        property_status: '',
        current_status: '',
        success: false,
    })

    const { title, owner, location, duration, availability, price, desc, listing_type, image, categories, category, booked_by, property_status, current_status } = values

    const [redirect, setRedirect] = useState(false)


    useEffect(() => {

        //find booking
        //find booking
        // console.log(match.params.id)
        getContract(token, match.params.id)
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
                        duration: data.duration,
                        error: '',
                        property_status: data.property_status,
                        current_status: data.property_status,
                        success: false,
                    })
                    // get all properties
                    getproperties().then(data2 => {
                        if (data2.error) {
                            console.log(data2.error)
                        }
                        else {
                            // console.log(data2)
                            // // setProperty(data[0])
                            // console.log(data2.filter(prop=>prop.added_by == data.property_owner && prop.property_title == data.property_title))
                            // setProperty(data2.find(prop=>prop.added_by == data.property_owner && prop.property_title == data.property_title))
                            // console.log("Property")
                            // // console.log(data[0]._id)
                            // console.log(property)
                        }
                    })

                }
            })

            .catch(err => console.log(err))
    }, [])

    const handleChange = (name) => event => {
        setValues({ ...values, error: false, [name]: event.target.value })

    }
    const clickSubmit = event => {
        event.preventDefault()
        //delete contract
        // console.log(property_status)
        // console.log(property)
        fetch(`${API}/updatecontract/${match.params.id}`, {
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


                    getproperties().then(data2 => {
                        if (data2.error) {
                            console.log(data2.error)
                        }
                        else {

                            data2.map(prop => {
                                if (prop.added_by == data.property_owner && prop.property_title == data.property_title) {
                                    fetch(`${API}/updateAvailability/${prop._id}`, {
                                        method: "PUT",
                                        headers: {
                                            Authorization: `Bearer ${token}`
                                        }
                                    })
                                }
                            })


                        }


                        setValues({ ...values, redirect: true })
                        setRedirect(true)
                    })
                }
            })


            .catch(error => console.log(error))

    }

    // to redirect if successfully terminated contract
    const redirectTo = () => {
        if (redirect) {

            return <Redirect to={`/admin/contract/updated`} />

        }
    }

    return <>
        <Nav />
        {redirectTo()}
        <div className='container w-50 shadow-lg p-5'>
            <main className="form-signin">

                <form>

                    <div className="text-primary fw-bold">

                        <h4>Contract Info:</h4><br />
                        <img src={`http://localhost:5000/${image}`} alt={title} style={{ 'width': '100%' }} /><br />

                        Title:<h4>{title}</h4><br />
                        Location:<h4>{location}</h4><br />
                        Price:<h4>Rs.{price}</h4><br />

                        Owner:<h4>{owner}</h4><br />
                        Customer:<h4>{booked_by}</h4><br />
                        {listing_type == "RENT" && <>
                            Contract Duration:<h4>{duration}</h4><br /></>}
                        Contract Status: <h4>{current_status}</h4>
                        {current_status == "on review" ?
                            <>

                                <br />
                                <div className='h4'>Action:</div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="status" id="flexCheckDefault" onClick={handleChange('property_status', clickSubmit)} value="APPROVED" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Approve
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" id="flexCheckDefault2" name="status" onClick={handleChange('property_status')} value="DECLINED" />
                                    <label class="form-check-label" for="flexCheckDefault2" >
                                        Decline
                                    </label>
                                </div>


                                <div className='d-flex justify-content-evenly mt-5'>
                                    <button onClick={clickSubmit} className="btn btn-warning">Update Contract</button>
                                    <a href='/admin/contracts' className="w-25 btn btn-primary" >Go Back</a>
                                </div>
                            </> :
                            <a href='/admin/contracts' className="mt-3 btn btn-primary" >Go Back</a>
                        }






                    </div>




                </form>
            </main>
        </div>
        <Footer />
    </>;
};

export default Contract;
