import { useEffect } from "react"
import { useState } from "react"
import React from 'react'
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
                        <table className="table table-bordered table-secondary">
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>User Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user,i)=>(
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td><a href = {`/admin/user/${user._id}`}>{user.fname} {user.lname}</a></td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.role?"Admin":"Normal User"}
                                        </td>
                                        
                                    </tr>
                                ))}
                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Allproperty
