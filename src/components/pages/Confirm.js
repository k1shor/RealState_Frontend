import React, { useEffect, useState } from 'react';
import { API } from '../../config';
import Nav from '../layout/Nav';

const Confirm = ({match}) => {
    const [values,setValues] = useState({
        error:'',
        success:false
    })
    const {error,success} = values

    useEffect(()=>{
        const token = match.params.token
        fetch(`${API}/confirmation/${token}`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            }
        })
        .then(res=>
            res.json()
            )
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }
            else{
                setValues({...values,error:'',success:true})
            }
        })
        .catch(err=>console.log(err))
    },[])


    // to show error
    const showError = () => (
        <div className='aler alert-danger' style={{ display: error ? '' : 'none' }}>{error}</div>
    )

    // to show success
    const showSuccess = () => (
        <div className='aler alert-success' style={{ display: success ? '' : 'none' }}>
            
            Account verified successfully.
        </div>
    )

    return (
    <>
        <Nav />
        
        {showError()}
        {showSuccess()}

    </>);
};

export default Confirm;
