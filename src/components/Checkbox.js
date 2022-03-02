import React, { useState } from 'react'

const Checkbox = ({ categories, handleFilters }) => {

    const [checked, setChecked] = useState([])

    const handleToggle=c=>()=>{
        const currentCategoryID=checked.indexOf(c)
        const newCategoryId=[...checked]
        if(currentCategoryID===-1){
            newCategoryId.push(c)
        }
        else{
            newCategoryId.splice(currentCategoryID,1)
        }
        setChecked(newCategoryId)
        handleFilters(newCategoryId,1)
    }

    return (
        <>
            {categories.map((c, i) => (
                <div className="form-check" key={i}>
                    <input className="form-check-input" type="checkbox"
                    onChange={handleToggle(c._id)} id={i}
                        value={checked.indexOf(c._id === -1)} />
                    <label className="form-check-label" htmlFor={i}>
                        {c.category_name}
                    </label>
                    <br/>
                </div>
            ))}
        </>
    )
}

export default Checkbox
