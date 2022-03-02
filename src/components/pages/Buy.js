import React, { useEffect, useState } from 'react'
import Footer from '../layout/Footer';
import Nav from '../layout/Nav';
import { showListings } from '../uiapi'
import { Link } from 'react-router-dom';


const Buy = () => {
    const [listingsByPostdate, setListingByPostdate] = useState([])
    const [error, setError] = useState(false)


    const listByArrival = () => {
        showListings('createdAt').then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setListingByPostdate(data)
            }
        })
    }
    useEffect(() => {
        listByArrival()
    }, [])
    return <div>
        <Nav />
        <div className='container-fluid my-5'>
        <h3 className='text-primary text-decoration-underline custom-cursor mb-5'>Properties for Sale</h3>

            <div class="row row-cols-1 row-cols-md-4 g-4">
                {listingsByPostdate.filter((item) => item.listing_type === "SALE").map((listing, i) => (
                    <div class="col">
                        <Link class="text-decoration-none text-dark" to={`/propertydetails/${listing._id}`}>
                        <div class="card">
                            <img style={{ 'height': '200px' }} src={`http://localhost:5000/${listing.property_image}`} class="card-img-top" alt={``} />
                            <div class="card-body">
                                <h4 class="card-title">{listing.property_title}
                                </h4>

                                <h6 className='card-title'>{listing.property_price}</h6>
                                <h6 className='card-title'>Availablity:
                                    {listing.property_availability ? "YES" : "NO"}
                                </h6>
                            </div>
                        </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
        <Footer />
    </div>
}

    export default Buy;
