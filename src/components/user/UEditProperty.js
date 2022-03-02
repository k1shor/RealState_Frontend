import React, { useEffect, useState } from 'react';
import Nav from '../layout/Nav';
import Footer from '../layout/Footer';
import { API } from '../../config';
import { isAuthenticated } from '../auth';
import { getCategories } from '../admin/apiAdmin';
import { Redirect } from 'react-router-dom';

const UEditProperty = ({ match }) => {
    const { token } = isAuthenticated()
    // const [current,setCurrent] = useState({})

    const [values, setValues] = useState({
        property_title: '',
        property_location: '',
        property_availability: true,
        property_price: '',
        property_desc: '',
        listing_type: '',
        categories:[],
        category: '',
        error: '',
        success: false,
        formData: ''
    })
    const [prevValues, setPrevValues] = useState({
        property_title: '',
        property_location: '',
        property_availability: true,
        property_price: '',
        property_desc: '',
        listing_type:'',
        property_image: '',
        categories:[],
        category: '',
        error: '',
        success: false,
        formData: ''
    })
    const { prev_property_title, prev_property_location, prev_property_availability, prev_property_price, prev_property_desc, prev_listing_type,prev_property_image, prev_categories, prev_category, prev_error, prev_success, prev_formData } = prevValues

    const { property_title, property_location, property_availability, property_price, property_desc, listing_type, categories, category, error, success, formData } = values

    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        //load categories
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            }
            else {
                setValues({ ...values, categories: data, formData: new FormData})
            }
        })
        //find category
        fetch(`${API}/findproperty/${match.params.token}`, {
            method: "GET"
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setPrevValues({
                        ...values,
                        prev_property_title: data.property_title,
                        prev_property_location: property_location,
                        prev_property_availability: data.property_availability,
                        prev_property_price: data.property_price,
                        prev_property_desc: data.property_desc,
                        prev_listing_type:data.listing_type,
                        prev_property_image: data.property_image,
                        // category: data.category,
                        error: '',
                        success: false,
                    })
                    // console.log(data)
                }
            })
            .catch(err => console.log(err))
    }, [])



    const handleChange=name=>event=>{
// const value=name==='property_image'? event.target.files[0]:event.target.value
// console.log(value)

// formData.set(name, value)
        setValues({ ...values, error: false, [name]: event.target.value })
    }


    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false })

        //update property
        fetch(`${API}/updateproperty/${match.params.token}`, {
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
                    setValues({ ...values})
                    setRedirect(true)
                }
            })
            .catch(error => console.log(error))

    }



    // to redirect if successfully updated
    const redirectTo = () => {
        if (redirect) {

            return <Redirect to={`/user/property/updateSuccess`} />

        }
    }

    // to show error
    const showError = () => (
        <div className='aler alert-danger' style={{ display: error ? '' : 'none' }}>{error}</div>
    )

    return <>
        <Nav />
        <div className='container w-75 shadow-lg p-5 my-5'>
            <main className="form-signin">
                {redirectTo()}
                {showError()}


                <h1 className="h3 mb-3 fw-normal text-center">Edit Category</h1>
                <div className='row'>
                    <div className='col'>
                        <h4>Listing Info:</h4>
                        <img src={`http://localhost:5000/${prev_property_image}`} alt={prev_property_title} style={{ 'width': '100%' }} /><br />
                        Title:<b>{prev_property_title}</b><br />
                        Location:<b>{prev_property_location}</b><br />
                        Price:Rs.<b>{prev_property_price}</b><br />
                        Listing Type:<b>{prev_listing_type}</b><br/>
                        Description:<b>{prev_property_desc}</b><br/>
                        Availablity:<b>{prev_property_availability ? "Yes" : "No"}</b><br /><br />
                    </div>
                    <div className='col'>
                    <form>
                    <div className="h4">Update Info:&nbsp;&nbsp;</div>
                    <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="title" placeholder=" " onChange={handleChange('property_title')} value={property_title} />
                                    <label htmlFor="title">Title</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="location" placeholder=" " onChange={handleChange('property_location')} value={property_location} />
                                    <label htmlFor="location">Location</label>
                                </div>
                                
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="price" placeholder="Stock" onChange={handleChange('property_price')} value={property_price} />
                                    <label htmlFor="price">Price</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="listing_type" placeholder=" " onChange={handleChange('listing_type')} value={listing_type} />
                                    <label htmlFor="location">Listing Type</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <textarea className="form-control" id="desc" placeholder="Description" onChange={handleChange('property_desc')} value={property_desc} />
                                    <label htmlFor="desc">Description</label>
                                </div>

                                
                                

                                <div className="form-floating mb-3">
                                    <select className="form-control" onChange={handleChange('category')} >
                                        <option>Category</option>
                                        {categories && categories.map((c,i)=>(<option key={i} value={c._id}>{c.category_name}</option>))}
                                        </select>
                                        <label htmlFor="category">Category</label>

                                        </div>



                    <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={clickSubmit}>Confirm Update</button>
                </form>
                    </div>
                </div>

                
            </main>
        </div>
        <Footer />
    </>;
};

export default UEditProperty;
