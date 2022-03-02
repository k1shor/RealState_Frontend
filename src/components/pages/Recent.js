import { useEffect } from "react"
import { useState } from "react"
import React from 'react'
import { Link } from "react-router-dom"
import AdminSidebar from "../admin/AdminSidebar"
import { getCategories, getproperties } from "../admin/apiAdmin"
import { isAuthenticated } from "../auth"
import Nav from "../layout/Nav"
import Footer from "../layout/Footer"
import { getFilteredProperty } from "../admin/apiAdmin"
import Checkbox from "../Checkbox"
import { prices } from "../FixedPrice"
import RadioBox from "../Radiobox"

const Home = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    })
    const [categories, setCategories] = useState([])
    const [properties, setproperties] = useState([])
    const [limit, setLimit] = useState(8)
    const [skip, setSkip] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])
    const [size, setSize] = useState(0)

    const [error, setError] = useState(false)
    const { token } = isAuthenticated()

    const loadproperty = () => {
        getproperties().then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setproperties(data)
            }
        })
    }
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

    useEffect(() => {
        loadproperty()
        loadCategory()
        loadFilteredResults(skip, limit, myFilters.filters)
    }, [])



    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters
        if (filterBy === 'property_price') {
            let priceValue = handlePrice(filters)
            newFilters.filters[filterBy] = priceValue
        }
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)

    }

    const loadFilteredResults = (newFilters) => {
        getFilteredProperty(skip, limit, newFilters)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setFilteredResults(data.property)
                    setSize(data.size)
                    setSkip(0)
                }
            })
    }

    const handlePrice = value => {
        const data = prices
        let array = []
        for (let key in data) {
            if (data[key]._id == parseInt(value)) {
                array = data[key].array
            }
        }
        return array
    }

    const loadMore = () => {
        let toSkip = skip + limit
        getFilteredProperty(toSkip, limit, myFilters.filters)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setFilteredResults([...filteredResults, ...data.property])
                    setSize(data.size)
                    setSkip(toSkip)

                }
            })
    }



    return (
        <>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                    <h4 className="mt-5 ps-3">Filter By:</h4>
                        <div className="ms-3">
                            <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                        </div>
                        <hr />
                        <h4>Price Range:</h4>
                        <div className="ms-3">
                            <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'property_price')} />
                        </div>
                        <hr />




                    </div>
                    <div className="col-md-8 mx-auto mt-3">
                        {filteredResults.length > 0  ?
                            <>
                                <div className="mx-auto">

                                <div class="row row-cols-1 row-cols-md-3 g-4">
                                {filteredResults.map((listing, i) => (    
                                        <div class="col">
                             <Link class="text-decoration-none text-dark" to={`/propertydetails/${listing._id}`}>

                                            <div class="card">
                                            <img style={{ 'height': '200px', 'width':'100%' }} src={`http://localhost:5000/${listing.property_image}`} alt="" className="img-fluid" width="130" />
                                            <div class="card-body">
                                                <h5 class="card-title">{listing.property_title}</h5>
                                                    <h6>{listing.property_location}</h6>
                                                    <h6>{listing.property_price}</h6>
                                                    <h6>{listing.listing_type}</h6>
                                                    <h6>{listing.property_availability ? "YES" : "NO"}</h6>
                                            </div>
                                            </div>
                                            </Link>
                                        </div>
                                 ) )}
                                </div>
                            </div>
                            <div className="text-center">
                                    {size >= 0 &&
                                        size >= limit && (
                                            <button className="btn btn-warning fs-5 form-control" onClick={loadMore}>Load More</button>)
                                    }
                                </div>
                            </>
                            :
                            <h4>No results matches your search. Please modify your search.</h4>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home
