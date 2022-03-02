import { setNestedObjectValues } from 'formik'
import React, {useState} from 'react'

const RadioBox = ({prices,handleFilters}) => {
    const [value,setValue]=useState(0)

    const handleChange=event=>{
        handleFilters(event.target.value)
        setValue(event.target.value)
    }
    return (
        <>
            {prices.map((p,i)=>(
                <div className="form-check text-start" key={i}>
                    <input className="form-check-input" type="radio" name="RadioPrice"
                    onChange={handleChange} value={`${p._id}`} id={`p${i}`}/>
                    <label className="form-check-label" htmlFor={`p${i}`}>{p.name}</label>
                    <br/>
                </div>
            ))}
        </>
    )
}

export default RadioBox
