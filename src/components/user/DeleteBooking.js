import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Nav from '../layout/Nav';
import Footer from '../layout/Footer';
import { API } from '../../config';
import { isAuthenticated } from '../auth';
import { getBooking } from '../admin/apiAdmin';

const DeleteBooking = ({ match }) => {
    const { token } = isAuthenticated()
    const [values, setValues] = useState({
        title: '',
        location: '',
        owner:'',
        availability: true,
        price: '',
        desc: '',
        listing_type: '',
        image: '',
        categories: [],
        category: '',
        success: false,
    })

    const { title, location, owner,availability, price, desc, listing_type, image, categories, category } = values
    const { error, success } = values

    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        //find booking
        //find booking
        console.log(match.params.id)
        getBooking(token, match.params.id)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setValues({
                        ...values,
                        title: data.property_title,
                        location: data.property_location,
                        availability: data.property_availability,
                        price: data.property_price,
                        desc: data.property_desc,
                        listing_ype: data.listing_type,
                        image: data.property_image,
                        category: data.category,
                        owner: data.property_owner,
                        error: '',
                        success: false,
                    })
                    // console.log("getting data")
                    // console.log(current)
                }
            })
            .catch(err => console.log(err))
    }, [])



    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false })


        //delete category
        fetch(`${API}/deletebookings/${match.params.id}`, {
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

            return <Redirect to={`/user/contract/deleteSuccess`} />

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

                    <h1 className="h3 mb-3 fw-normal">Cancel Contract</h1>

                    <div className="text-danger fw-bold">

                        <h4>Contract Terms:</h4><br />
                        <img src={`http://localhost:5000/${image}`} alt={title} style={{ 'width': '100%' }} /><br />
                        
                        Title:{title}<br />
                        Owner:{owner}<br/>
                        Location:{location}<br />
                        Price:Rs.{price}<br />
                        Availablity:{availability ? "Yes" : "No"}<br />


                    </div>             <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={clickSubmit}>Cancel Booking</button>
                </form>
            </main>
        </div>
        <Footer />
    </>;
};

export default DeleteBooking;
