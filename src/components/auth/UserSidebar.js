import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from './index'

const UserSidebar = ({ history }) => {
    const { user: { fname, email } } = isAuthenticated()
    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: "280px" }}>
                <Link to="/admin/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4">User Dashboard</span>
                </Link>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li>
                        <Link to="/user/property/add" className="nav-link text-white">

                            Add Property for sale
                        </Link>
                    </li>

                    <li>
                        <Link to="/user/mylistings" className="nav-link text-white">

                            View My Listings
                        </Link>
                    </li>

                    <li>
                        <Link to="/user/contracts" className="nav-link text-white">

                            View My Contracts
                        </Link>
                    </li>

                    <li>
                        <Link to="/user/consultations" className="nav-link text-white">

                            My Consultation Requests
                        </Link>
                    </li>

                    <li>
                        <Link to="/" className="nav-link text-white">

                            Goto Homepage
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
                            {isAuthenticated() && isAuthenticated().user.role === 0 && (

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

export default withRouter(UserSidebar)
