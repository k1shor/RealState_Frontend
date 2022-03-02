import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth'
import Nav from '../layout/Nav'
import Footer from '../layout/Footer'
import UserSidebar from '../auth/UserSidebar'
import { getBookings } from '../admin/apiAdmin'
import { Link } from 'react-router-dom'

const MyBookings = () => {
    const token = isAuthenticated()
    const [bookings, setBookings] = useState([])

    const loadBookings = () => {
        getBookings(token).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setBookings(data)
            }
        })
    }

    useEffect(() => {
        console.log(token)
        loadBookings()
    }, [])

    return (
        <>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserSidebar />
                    </div>
                    <div className="col-md-8 mt-5">
                        <div className='h2 text-center text-info'>Contracts</div>
                        <hr />
                        <table className="text-center table table-bordered table-secondary align-middle">
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Image</th>
                                    <th>Property Title</th>
                                    <th>Price</th>
                                    <th>Listing Type</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.filter((item)=>(item.booked_by === token.user.email)).map((listing, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td><img src={`http://localhost:5000/${listing.property_image}`} alt="" className="img-fluid" width="130" /></td>

                                        <td>{listing.property_title}<br/>{listing.property_location}</td>
                                        <td>{listing.property_price}</td>
                                        <td>{listing.listing_type}</td>
                                        <td>{listing.property_status}</td>

                                        <td>
                                            <Link to={`/user/contract/details/${listing._id}`} className="btn btn-info">View</Link>
                                            <Link to={`/user/contract/delete/${listing._id}`} className="btn btn-danger">Cancel</Link>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>



                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default MyBookings
