import React, { useEffect, useState } from 'react';
import Nav from '../layout/Nav';
import Footer from '../layout/Footer';
import { isAuthenticated } from '../auth';
import { getContract } from '../admin/apiAdmin';
import { API } from '../../config';
import { Redirect } from 'react-router-dom';

const ContractTerminate = ({ match }) => {
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
        duration:'',
        success: false,
    })

    const { title, owner, location, duration,availability, price, desc, listing_type, image, categories, category, booked_by } = values

    const [redirect, setRedirect] = useState(false)


    useEffect(() => {
        //find booking
        //find booking
        console.log(match.params.id)
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
        //delete contract
        console.log(match.params.id)
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

    // to redirect if successfully terminated contract
    const redirectTo = () => {
        if (redirect) {

            return <Redirect to={`/admin/contract/terminated`} />

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

                        Title:{title}<br />
                        Location:{location}<br />
                        Price:Rs.{price}<br />
                        Owner:{owner}<br />
                        Customer: {booked_by}<br/>
                        Duration: {duration}<br/>    

                        {/* {listing_type == "RENT" ?
                            <>Owner:{owner}<br />
                                <h4 className='text-warning'>This property has been provided on lease to </h4>
                                <h5 className='text-decoration-underline text-warning'>{booked_by}</h5> for a period of 1 year.
                            </>
                        :
                        
                        <>
                        <h4 className='text-warning'> This property has been sold to </h4>
                        <h5 className='text-decoration-underline text-warning'>{booked_by}</h5> by 
                        <h5 className='text-decoration-underline text-warning'>{owner}</h5>
                        </>} */}

                    </div>
                    <button className="w-100 btn btn-lg btn-primary" onClick={clickSubmit}>Terminate Contract</button>
                </form>
            </main>
        </div>
        <Footer />
    </>;
};

export default ContractTerminate;
