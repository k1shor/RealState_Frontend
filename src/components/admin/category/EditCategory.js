import React, { useEffect, useState } from 'react';
import Nav from "../../layout/Nav"
import Footer from "../../layout/Footer"
import { API } from '../../../config';
import { isAuthenticated } from '../../auth';
import { Redirect } from 'react-router-dom';

const EditCategory = ({ match }) => {
    const { token } = isAuthenticated()
    const [current,setCurrent] = useState()

    const [values, setValues] = useState({
        category_name: '',
        error: '',
        success: false
    })
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        //find category
        fetch(`${API}/findCategory/${match.params.token}`,{
            method:"GET"
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
            setValues({ ...values, error: data.error, success: false })
        }
        else{
            setCurrent(data.category_name)
            // console.log(data.category_name)
        }})
        .catch(err=>console.log(err))
    },[])

    const { category_name, error, success } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })

    }
    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false })
        // const token = match.params.token
        //update category
        fetch(`${API}/updateCategory/${match.params.token}`, {
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
                    setValues({ ...values, redirect: true })
                    setRedirect(true)
                }
            })
            .catch(error => console.log(error))

    }



    // to redirect if successfully updated
    const redirectTo = () => {
        if (redirect) {

            return <Redirect to={`/admin/allCategory/updateSuccess`} />

        }
    }

    // to show error
    const showError = () => (
        <div className='aler alert-danger' style={{ display: error ? '' : 'none' }}>{error}</div>
    )

    return <>
        <Nav />
        <div className='container w-50 shadow-lg p-5'>
            <main className="form-signin">
                {redirectTo("category updated")}
                {showError()}
                <form>
                    
                    <h1 className="h3 mb-3 fw-normal">Edit Category</h1>

                    <label className="form-control text-danger fw-bold">Old Category name:&nbsp;&nbsp;{current}</label>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={handleChange('category_name')} value={category_name} />
                        <label htmlFor="floatingInput">New Category name:</label>
                    </div>



                    <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={clickSubmit}>Edit Category</button>
                </form>
            </main>
        </div>
        <Footer />
    </>;
};

export default EditCategory;
