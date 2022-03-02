import { useEffect } from "react"
import { useState } from "react"
import React from 'react'
import { Link } from "react-router-dom"
import AdminSidebar from "../AdminSidebar"
import { getCategories, getproperties } from "../apiAdmin"
import { isAuthenticated } from "../../auth"
import Nav from "../../layout/Nav"
import Footer from "../../layout/Footer"
import Checkbox from "../../Checkbox"
import { prices } from "../../FixedPrice"
import RadioBox from "../../Radiobox"
import { getFilteredProperty } from "../apiAdmin"

const Allproperty = () => {
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
                        <AdminSidebar />
                    </div>
                    <div className="col-md-8">
                        <h2 className="col-md-8 mt-5 h2">Showing {filteredResults.length} out of {properties.length} properties</h2>
                        <hr />
                        <h4>Filter By:</h4>
                        <div className="d-flex justify-content-evenly">
                            <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                        </div>
                        <hr />
                        <h4>Price Range:</h4>
                        <div className="d-flex justify-content-evenly flex-wrap">
                            <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'property_price')} />
                        </div>
                        <hr />
                        {filteredResults.length > 0  ?
                            <>
                                <div className="text-center">
                                    <table className="text-center table table-bordered table-secondary">
                                        <thead>
                                            <tr>
                                                <th>S.No.</th>
                                                <th>Title</th>
                                                <th>Location</th>
                                                <th>Price</th>
                                                <th>Listing Type</th>
                                                <th>Availablity</th>
                                                <th>Image</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredResults.map((listing, i) => (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{listing.property_title}</td>
                                                    <td>{listing.property_location}</td>
                                                    <td>{listing.property_price}</td>
                                                    <td>{listing.listing_type}</td>
                                                    <td>{listing.property_availability ? "YES" : "NO"}</td>
                                                    <td><img src={`http://localhost:5000/${listing.property_image}`} alt="" className="img-fluid" width="130" /></td>
                                                    <td>
                                                        <Link to={`/admin/property/update/${listing._id}`} className="btn btn-primary">Update</Link>
                                                        <Link to={`/admin/property/delete/${listing._id}`} className="btn btn-danger">Delete</Link>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
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

export default Allproperty
