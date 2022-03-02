import React from 'react'
import AdminSidebar from '../admin/AdminSidebar'
import Footer from '../layout/Footer'
import Nav from '../layout/Nav'
const AdminDashboard = () => {
  
    return (
        <>
            <Nav />
            <div className='container-fluid'>
            <div className="row mx-0" style={{ "minHeight": "70vh" }}>
                <div className="col-md-3 h-100">
                    <AdminSidebar />
                </div>
                <div className="col-md-8 mt-5 h2">
                    Welcome to Admin Dashboard
                    
                </div>
            </div>
            </div>
            <Footer />

        </>
    )
}


export default AdminDashboard
