import { useEffect, useState } from "react"
import React from 'react'
import UserSidebar from "../auth/UserSidebar"
import { getCategories, createproperty } from "../admin/apiAdmin"
import { isAuthenticated } from "../auth"
import Nav from "../layout/Nav"
import Footer from "../layout/Footer"
import { Redirect } from "react-router-dom"

const UAddProperty = () => {
    const { token } = isAuthenticated()
    const [redirect, setRedirect] = useState(false)

    const [values, setValues] = useState({
        property_title: '',
        property_location: '',
        property_availability: true,
        property_price: '',
        property_desc: '',
        property_image: '',
        listing_type: 'RENT',
        categories: [],
        category: 'Land',
        added_by: '',
        error: '',
        success: false,
        formData: ''
    })
    const { property_title, property_location, property_availability, property_price, property_desc, property_image, listing_type, categories, category, added_by, error, success, formData } = values

    //load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            }
            else {
                setValues({ ...values, categories: data, formData: new FormData })
            }
        })
    }

    //to send formdata
    useEffect(() => {
        init()

    }, [])

    const handleChange = name => event => {
        const value = name === 'property_image' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        console.log(value)
        setValues({ ...values, [name]: value })
    }

    const clickSubmit = event => {
        event.preventDefault()
        // formData.set('added_by', localStorage.getItem('jwt').user.email)
        setValues({ ...values, error: '' })
        createproperty(token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {
                    setValues({ ...values, property_title: '', property_location: '', property_availability: true, property_price: '', property_desc: '', property_image: '', success: true, error: '' })
                    { document.getElementById('img_file').value = null; }
                    setRedirect(true)


                }
            })
    }

    //to show error msg
    const showError = () => (
        <div className="alert-alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>
    )

    //to show success msg
    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>New property Added</div>
    )

    // to redirect if successfully updated
    const redirectTo = () => {
        if (redirect) {

            return <Redirect to={`/user/profile/addSuccess`} />

        }
    }



    return (
        <>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserSidebar />
                    </div>
                    <div className="col-md-9 mt-5">
                        <main className="form-signin w-75 mx-auto">
                            <form>
                                <h1 className="h2 text-center text-info">Add property Form</h1>
                                <hr/>
                                {showError()}
                                {showSuccess()}
                                {redirectTo()}
                                
                                <label htmlFor="title">Owner</label>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="title" placeholder="title" onChange={handleChange('property_title')} value={property_title} />
                                    <label htmlFor="title">Title</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="location" placeholder="location" onChange={handleChange('property_location')} value={property_location} />
                                    <label htmlFor="location">Location</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="price" placeholder="Stock" onChange={handleChange('property_price')} value={property_price} />
                                    <label htmlFor="price">Price</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <textarea className="form-control" id="desc" placeholder="Description" onChange={handleChange('property_desc')} value={property_desc} />
                                    <label htmlFor="desc">Description</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select className="form-control" onChange={handleChange('listing_type')} id="listing_type" >
                                        <option></option>
                                        <option value="RENT">RENT</option>
                                        <option value="SALE">SALE</option>
                                    </select>
                                    <label htmlFor="listying_type">Listing Type</label>

                                </div>

                                <div className="form-floating mb-3">
                                    <input type="file" className="form-control" id="img_file" onChange={handleChange('property_image')} accept="image/*" />
                                    <label htmlFor="img_file">Image</label>
                                </div>
                                

                                <div className="form-floating mb-3">
                                    <select className="form-control" onChange={handleChange('category')} >
                                        <option></option>
                                        {categories && categories.map((c, i) => (<option key={i} value={c._id}>{c.category_name}</option>))}
                                    </select>
                                    <label htmlFor="category">Category</label>

                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" onClick={handleChange('added_by')} value={JSON.parse(localStorage.getItem('jwt')).user.email}/>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        I accept the terms and conditions
                                    </label>
                                </div>

                                <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={clickSubmit}>ADD property</button>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UAddProperty
