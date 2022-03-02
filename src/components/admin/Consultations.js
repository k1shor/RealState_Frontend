import { useEffect } from "react"
import { useState } from "react"
import React from 'react'
import { Link } from "react-router-dom"
import AdminSidebar from "./AdminSidebar"
import { isAuthenticated } from "../auth"
import Nav from "../layout/Nav"
import Footer from "../layout/Footer"
import { getConsultations, getContracts } from "./apiAdmin"

const Consultations = (msg) => {
    const [contracts, setContracts] = useState([])
    const { token } = isAuthenticated()

    const loadContracts = () => {
        getConsultations().then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setContracts(data)
            }
        })
    }

    useEffect(() => {
        loadContracts()
    }, [])

    return (
        <>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-8">

                        <h2 className="col-md-8 mt-5 h2">Total {contracts.length} consultation request.</h2>
                        <hr />
                        <table className="table table-bordered table-secondary text-center">
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th colS>Property</th>

                                    <th>Buyer/Customer</th>
                                    <th>With</th>
                                    <th>Onsite/Offsite</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contracts.map((contract, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        {/* <td><img src={`http://localhost:5000/${contract.property_image}`} alt={contract.property_title} className="img-fluid" width="130" /></td> */}
                                        <td>
                                            <h5>{contract.property_title}</h5>
                                            <h6>{contract.property_location}</h6>
                                            <h6>{contract.property_price}</h6></td>
                                        {/* <td>{contract.property_owner}</td> */}
                                        <td>{contract.booked_by}</td>
                                        <th>{contract.consultation_with}</th>
                                        <th>{contract.consultation_type}</th>
                                        <th>{contract.property_status}</th>
                                        <td>
                                            <Link to={`/admin/consultation/view/${contract._id}`} className="btn btn-primary">View</Link>
                                            <Link to={`/admin/consultation/delete/${contract._id}`} className="btn btn-danger">Terminate</Link>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default Consultations
