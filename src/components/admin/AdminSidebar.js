import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth'

const AdminSidebar = ({ history }) => {
    const { user: { fname, email } } = isAuthenticated()
    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: "280px" }}>
                <Link to="/admin/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4">Admin Dashboard</span>
                </Link>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to="/admin/addCategory" className="nav-link text-white" aria-current="page">

                            Add Category
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/addproperty" className="nav-link text-white">

                            Add Property
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/contracts" className="nav-link text-white">

                            Contracts
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/consultations" className="nav-link text-white">

                            Consultations
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/inbox" className="nav-link text-white">

                            Messages
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/allproperty" className="nav-link text-white">

                            View/Edit Properties
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/allcategory" className="nav-link text-white">

                            View/Edit Catagories
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/allusers" className="nav-link text-white">

                            View Users
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="nav-link text-white">

                            Go to Home page
                        </Link>
                    </li>
                </ul>
                <hr />
                <div className="dropdown">
                    <Link to="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-person-circle"></i>
                        <strong>&nbsp;&nbsp;{fname}</strong>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li className="dropdown-item" to="#">{email}</li>
                        <li>
                            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                            
                                <li className="dropdown-item mt-2"
                                    onClick={() => signout(() => {
                                        history.push('/')
                                    })}>Signout</li>
                        )}</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default withRouter(AdminSidebar)
