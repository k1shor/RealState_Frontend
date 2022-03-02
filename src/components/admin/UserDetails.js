import React, { useEffect, useState } from 'react'
import Footer from '../layout/Footer'
import Nav from '../layout/Nav'
import { API } from '../../config'
import { isAuthenticated } from '../auth'

const UserDetails = ({ match }) => {

    const { token } = isAuthenticated()
    const [user, setUser] = useState('')
    const [error, setError] = useState('')
    const [del, setDelete] = useState(false)
    const [date,setDate] =useState('')

    useEffect(() => {
        console.log(match)
        fetch(`${API}/finduser/${match.params.id}`, {
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
                    setUser(data)
                    console.log(data)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const getdate = (daet) => {
        let date = new Date()
        const dat = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        return (dat)
    }


    return (
        <>
            <Nav />
            {del && <h3>Message Deleted</h3>}
            <div className='container w-50 mx-auto my-5 shadow-lg p-3'>
                <div className='h5'>Name:</div>
                <h3>{user.fname + " " + user.lname}</h3>
                <br></br>
                <h5>Date of Birth:</h5>


                <h4> {getdate(user.dob)}</h4>
                <br></br>
                <h5>Email:</h5>
                <h4>{user.email}</h4>
                <br></br>
                <h5>Phone:</h5>
                <h4>{user.phone}</h4>

                <hr />
                <h5 className='d-flex justify-content-evenly'><a href="/admin/allusers">Go back</a> </h5>
            </div>

            <Footer />

        </>
    )
}

export default UserDetails