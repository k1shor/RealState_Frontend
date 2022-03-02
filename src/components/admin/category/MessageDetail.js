import React, { useEffect, useState } from 'react'
import Footer from '../../layout/Footer'
import Nav from '../../layout/Nav'
import { API } from '../../../config'
import { isAuthenticated } from '../../auth'

const MessageDetail = ({ match }) => {

    const { token } = isAuthenticated()
    const [msg, setMsg] = useState('')
    const [error, setError] = useState('')
    const [del, setDelete] = useState(false)

    useEffect(() => {
        console.log(match)
        fetch(`${API}/findmessage/${match.params.id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setMsg(data)
                    console.log(data)
                }
            })
            .catch(err => console.log(err))
    }, [])

    

    return (
        <>
            <Nav />
            {del && <h3>Message Deleted</h3>}
            <div className='container w-50 mx-auto my-5 shadow-lg p-3'>
                <div className='h5'>From:</div>
                <h3>{msg.email}</h3>
                <br></br>
                <h5>Message:</h5>
                <h4>{msg.message}</h4>
                <hr />
                <h5 className='d-flex justify-content-evenly'><a href="/admin/inbox">Go back</a> <a className='text-danger custom-pointer' onClick={() => {
                    fetch(`${API}/deletemessage/${match.params.id}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.error) {
                                setError(data.error)
                            }
                            else {
                                setDelete(true)
                            }
                        })
                        .catch(err => console.log(err))

                }}>Delete</a></h5>
            </div>

            <Footer />

        </>
    )
}

export default MessageDetail