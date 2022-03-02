import { API } from "../../config"


// for signup
export const signup=(user)=>{
    return fetch(`${API}/register`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

// for signin
export const signin=(user)=>{
    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

// to keep logged in
export const keep_logged = (data,next) => {
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt',JSON.stringify(data))
        next()
    }
}

//to redirect user according to user roles
export const isAuthenticated = () => {
    if(typeof window === 'undefined'){
        return false
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else{
        return false
    }
}

//forget password
export const forgetpassword = (user) =>{
    return fetch(`${API}/forgetpassword`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":'application/json'
        },
        body:JSON.stringify(user)
    })
    .then(res=> res.json())
    .catch(err=>console.log(err))

}
//signout
export const signout = (next) =>{
    if(typeof window !==undefined){
        localStorage.removeItem('jwt',JSON.stringify('jwt'))
        next()
        return fetch(`${API}/signout`,{
            method:"POST"
        })
        .then(response=>{
            console.log('signout',response)
        })
        .catch(err=>console.log(err))
    }
}

