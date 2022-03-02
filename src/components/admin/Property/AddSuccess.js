import React from 'react'
import AdminSidebar from '../AdminSidebar'
import Footer from '../../layout/Footer'
import Nav from '../../layout/Nav'
const AddSuccess = () => {
  
    return (
        <>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-8">
                        <div className="text-center text-warning mt-5">
                            <h2>New Listing added successfully</h2>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}


export default AddSuccess
