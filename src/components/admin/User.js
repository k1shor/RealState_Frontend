import { useEffect } from "react"
import { useState } from "react"
import React from 'react'
import { Link } from "react-router-dom"
import AdminSidebar from "./AdminSidebar"
import { getUsers } from "./apiAdmin"
import { isAuthenticated } from "../auth"
import Nav from "../layout/Nav"
import Footer from "../layout/Footer"

const Allproperty = () => {
    const [users, setUsers] = useState([])
    const { token } = isAuthenticated()

    const loadUser = () => {
        getUsers(token).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setUsers(data)
            }
        })
    }

    useEffect(() => {
        console.log(token)
        loadUser()
    }, [])

    return (
        <>
        <Nav/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-8">
                        <h2 className="col-md-8 mt-5 h2">Total {users.length} users.</h2>
                        <hr/>
                       
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Allproperty
