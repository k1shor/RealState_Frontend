import { API } from "../config";
import { getproperties } from "./admin/apiAdmin";

//to show listings in homepage 
export const showListings = (sortBy) => {
    return fetch(`${API}/showproperty?sortBy=${sortBy}&order=desc&limit=8`,{
    method:"GET"})
    .then(response =>{
        return response.json()
    })
    .catch(error=>console.log(error))
}

// to fetch product details
export const propertyDetails=(propertyId)=>{
    return fetch(`${API}/findProperty/${propertyId}`,{
        method:'GET'
    })
    .then(response=>{
        console.log(response)

        return response.json()
    })
    
    .catch(error=>console.log(error))
}

//list related
export const listRelated=(propertyId)=>{
    return fetch(`${API}/property/related/${propertyId}`,{
        method:'GET'
    })
    .then(response=>{
        return response.json()
    })
    .catch(error=>console.log(error))
}

