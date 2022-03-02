import React from 'react'
import Nav from '../layout/Nav'
import Footer from '../layout/Footer'

import { propertyDetails, listRelated } from '../uiapi'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'

const PropertyDetails = (props) => {
    const [property, setProperty] = useState({})
    const [error, setError] = useState(false)
    const [relatedProperty, setRelatedProperty] = useState([])


    const user = isAuthenticated()

    const loadSingleProduct = propertyId => {
        propertyDetails(propertyId).then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setProperty(data)
                //after fetching single product then fetch related products in same category 
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error)
                    }
                    else {
                        setRelatedProperty(data)
                    }
                })
            }
        })
    }

    useEffect(() => {
        const propertyId = props.match.params.id
        // console.log(propertyId)
        loadSingleProduct(propertyId)
    }, [props])


    return (
        <>
            <Nav />

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
                        <h6 className='card-title'>Availablity:
                            {property.property_availability ?
                                "YES"
                                : "NO"}
                        </h6>


                        {user ?
                            property.property_availability ?
                                
                                    property.added_by != user.user.email
                                    ?
                                    <div class='btn-group'>
                                        <a className="btn btn-success" href={`/contract/${props.match.params.id}`}>Contract</a>
                                        <a className="btn btn-success" style={{ marginLeft: '1rem' }} href={`/seekconsultation/${props.match.params.id}`}>Seek Consulation</a>
                                    </div>
                                    : "You are viewing your own listing."
                                
                                : "This listing is not available at the moment."
                            :
                            <div class='btn-group'>
                                <a className="btn btn-success" href={`/contract/${props.match.params.id}`}>Contract</a>
                                <a className="btn btn-success" style={{ marginLeft: '1rem' }} href={`/seekconsultation/${props.match.params.id}`}>Seek Consulation</a>
                            </div>

                        }
                    </div>
                </div>
            </div>

            <hr />


            {relatedProperty.length > 0 && (
                <div className="container my-5 mb-3 text-center">
                    <h2 className="mb-2 my-1">Related Products</h2>
                    <div className="row row-cols-1 row-cols-md-3 g-5 mx-auto">
                        {relatedProperty.slice(0, 4).map((product, i) => (
                            
                            <div class="col w-25">
                                <Link class="text-decoration-none text-dark" to={`/propertydetails/${product._id}`}>

                                <div class="card">
                                    <img style={{ 'height': '150px' }} src={`http://localhost:5000/${product.property_image}`} class="card-img-top" alt={``} />
                                    <div class="card-body">
                                        <h4 class="card-title">{product.property_title}
                                        </h4>
                                        <h6 className='card-title'>{product.property_price}</h6>
                                        <h6 className='card-title'>Availablity:
                                            {product.property_availability ? "YES" : "NO"}
                                        </h6>
                                    </div>
                                </div>
                                </Link> 
                            </div>

                        ))}

                    </div>
                </div>
            )}


            <Footer />

            
        </>
    )
}

export default PropertyDetails
