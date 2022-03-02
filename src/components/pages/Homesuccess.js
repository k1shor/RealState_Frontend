import React, { useEffect, useState } from 'react'
import Footer from '../layout/Footer'
import Nav from '../layout/Nav'
import Trending from '../Trending'
import { showListings } from '../uiapi'
import { getCategories } from '../admin/apiAdmin'
import { Link } from 'react-router-dom'

const Homesuccess = () => {
    const [listingsByPostdate, setListingByPostdate] = useState([])
    const [categories, setCategories] = useState([])

    const [error, setError] = useState(false)

    const loadCategory = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setCategories(data)
            }
        })
    }
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
        loadCategory()
    }, [])
    return (
        <>
            <Nav />
            <div className='text-center mt-5'>
            <h3>Recent Listings</h3></div>
            <div className='container-fluid my-5'>
                <div class="row row-cols-1 row-cols-md-4 g-4">
                    {listingsByPostdate.slice(0, 4).map((listing, i) => (
                        <div class="col">
                            <Link class="text-decoration-none text-dark" to={`/propertydetails/${listing._id}`}>
                            <div class="card">
                                <img style={{ 'height': '200px' }} src={`http://localhost:5000/${listing.property_image}`} class="card-img-top" alt={``} />
                                <div class="card-body">
                                    <h4 class="card-title">{listing.property_title}
                                    </h4>
                                    <h6 className='card-title'>{listing.listing_type}</h6>
                                    <h6 className='card-title'>{listing.property_price}</h6>
                                    <h6 className='card-title'>{listing.added_by}</h6>
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
            <Link to="/buy"><h3 className="text-center mt-5">For Sale</h3></Link>
            <div className='container-fluid my-5'>
                <div class="row row-cols-1 row-cols-md-4 g-4">
                    {listingsByPostdate.filter((item) => item.listing_type === "Buy").slice(0, 4).map((listing, i) => (
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
            <Link to="/lease"><h3 className="text-center mt-5">For Lease</h3></Link>
            <div className='container-fluid my-5'>
                <div class="row row-cols-1 row-cols-md-4 g-4">
                    {listingsByPostdate.filter((item) => item.listing_type === "Rent").slice(0, 4).map((listing, i) => (
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
            {categories.map((category, i) =>
                <>
                    <Link to={`/${category.category_name}`}><h3 className="text-center mt-5">{category.category_name}</h3></Link>
                    <div className='container-fluid my-5'>
                        <div class="row row-cols-1 row-cols-md-4 g-4">
                            {listingsByPostdate.filter((item) => category._id === item.category).slice(0, 4).map((listing, i) => (
                                
                                <Link class="text-decoration-none text-dark" to={`/propertydetails/${listing._id}`}><div class="col">
                                    <div class="card">
                                        <img style={{ 'height': '200px' }} src={`http://localhost:5000/${listing.property_image}`} class="card-img-top" alt={``} />
                                        <div class="card-body">
                                            <h4 class="card-title">{listing.property_title}
                                            </h4>
                                            <h6 className='card-title'>{listing.listing_type}</h6>
                                            <h6 className='card-title'>{listing.property_price}</h6>
                                            <h6 className='card-title'>Availablity:
                                                {listing.property_availability ? "YES" : "NO"}
                                            </h6>
                                        </div>
                                    </div>
                                </div></Link>
                            ))}
                        </div>
                    </div>
                </>)
}

            {/* <Trending /> */}

            <Footer />
        </>
    )
}

export default Homesuccess
