import React from 'react'
import Footer from '../layout/Footer'
import Nav from '../layout/Nav'
import UserSidebar from '../auth/UserSidebar'
const ConsultationDeleteSuccess = () => {

    return (
        <>
            <Nav />
            <div className='container-fluid'>
                <div className="row" style={{"minHeight":"70vh"}}>
                    <div className="col-md-3">
                        <UserSidebar />
                    </div>
                    <div className="col-md-8 mt-5 text-warning">
                        <h4>Consultation Cancelled Successfully</h4>
                    </div>
                </div>
                </div>
            <Footer />
        </>
    )
}


export default ConsultationDeleteSuccess
