import { useEffect } from "react"
import { useState } from "react"
import React from 'react'
import { Link } from "react-router-dom"
import AdminSidebar from "../AdminSidebar"
import { getmessages } from "../apiAdmin"
import { isAuthenticated } from "../../auth"
import Nav from "../../layout/Nav"
import Footer from "../../layout/Footer"

const Allmessage = (msg) => {
    const [messages, setmessages] = useState([])
    const { token } = isAuthenticated()

    const loadmessage = () => {
        getmessages().then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setmessages(data)
            }
        })
    }

    useEffect(() => {
        loadmessage()
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
                        {/* <h2></h2> */}
                        <h2 className="col-md-8 mt-5 h2">Total {messages.length} messages.</h2>
                        <hr/>
                        <table className="table table-bordered table-secondary text-center">
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>From</th>
                                    <th>message</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((message,i)=>(
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{message.email}</td>
                                        <td>{message.message}</td>
                                        <td>
                                            
                                        <Link to={`/admin/message/detail/${message._id}`} className="noWrap">Read More</Link>
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

export default Allmessage
