
import React,{useId} from 'react'

function Select({
    options, //options for selecting
    label,
    className='',
    ...props
},ref) {
    const id=useId()
  return (
    <div className='w-full'>
      {label && <label
      htmlFor={id}
      className= ''></label>}
      <select 
      {...props} 
      id={id}
      ref={ref}
      className={`px-3 py-2 rounded-lg bg-white text-balance outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full
       ${className} `}>
        {/*options ek array hi milta hai usually , to usko traverse krne ke liye map to lagana hi padega na
        agar options ke andar value hi na ho , aur agar uske upar map lagaoge to pkkka pkka , hnji pkka wala crash krega. to sidha map nai lagana , optionally loop krlo 
        option mein key deni important hai ,aur value deni bhi important hai
        */}
        {options?.map((option)=>
        {
          <option key={option} value={option}>
              {option}
          </option>
        })}
       </select>
    </div>
  )
}

export default React.forwardRef(Select)