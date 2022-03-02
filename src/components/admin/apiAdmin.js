import {API} from "../../config";

// to add category 
export const createCategory=(token,category)=>{
    return fetch(`${API}/postcategory`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

//to get all category
export const getCategories=()=>{
    return fetch(`${API}/categorylist`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

//to get all contracts
export const getContracts=()=>{
    return fetch(`${API}/bookinglist`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}






//to get single category
export const getCategory=()=>{
    return fetch(`${API}/findCategory/`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}
//to add property
export const createproperty=(token,property)=>{
    return fetch(`${API}/postproperty`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        body:property
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}
//to add booking
export const createbooking=(token,booking)=>{
    return fetch(`${API}/postbookings`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(booking)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

//to add consultation
export const createConsultation=(token,consultation)=>{
    return fetch(`${API}/postconsultations`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(consultation)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

// to show properties list
export const getproperties=()=>{
    return fetch(`${API}/showproperty`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

//to show all users
export const getUsers=(token)=>{
    return fetch(`${API}/userList`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

//to get all bookings
export const getBookings=(token)=>{
    return fetch(`${API}/bookinglist`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

//to get all consultations
export const getConsultations=(token)=>{
    return fetch(`${API}/consultationslist`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

//to get individual consultation
export const getConsultation=(user,token)=>{
    return fetch(`${API}/consultationsdetails/${token}`, {
        method: "GET",
        headers:{
            Authorization:`Bearer ${user}`
        }
    })
        .then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                return data
                // console.log(data)
            }
        })
        .catch(err => console.log(err))
}

//to get individual bookings
export const getBooking=(user,token)=>{
    return fetch(`${API}/bookingdetails/${token}`, {
        method: "GET",
        headers:{
            Authorization:`Bearer ${user}`
        }
    })
        .then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                return data
                // console.log(data)
            }
        })
        .catch(err => console.log(err))
}


//to get individual contract
export const getContract=(user,token)=>{
    return fetch(`${API}/bookingdetails/${token}`, {
        method: "GET",
        headers:{
            Authorization:`Bearer ${user}`
        }
    })
        .then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                return data
                // console.log(data)
            }
        })
        .catch(err => console.log(err))
}
//filter product by price and category
export const getFilteredProperty=(skip, limit, filters ={})=>{
    let data={limit,skip,filters}

    return fetch(`${API}/list/by/search`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then(response=>{
        return response.json()
    })
    .catch(error=>console.log(error))
}

//to get all messages
export const getmessages=()=>{
    return fetch(`${API}/messagelist`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}