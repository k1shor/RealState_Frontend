import React, { useEffect, useState } from 'react';
import Footer from '../../layout/Footer';
import Nav from '../../layout/Nav';
import { API } from '../../../config';
import { isAuthenticated } from '../../auth';
import { Redirect } from 'react-router-dom';

const DeleteCategory = ({ match }) => {
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

    
    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false })
        // const token = match.params.token

        


        //delete category
        fetch(`${API}/deleteCategory/${match.params.token}`, {
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



    // to redirect if successfully updated
    const redirectTo = () => {
        if (redirect) {

            return <Redirect to={`/admin/allCategory/deleteSuccess`} />

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
                {redirectTo("category deleted")}
                {showError()}
                <form>
                    
                    <h1 className="h3 mb-3 fw-normal">Edit Category</h1>

                    <label className="form-control text-danger fw-bold">Category name:&nbsp;&nbsp;{current}</label>
            
                    <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={clickSubmit}>Delete Category</button>
                </form>
            </main>
        </div>
        <Footer />
    </>;
};

export default DeleteCategory;
