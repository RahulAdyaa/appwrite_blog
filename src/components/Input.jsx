import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full ">
      {label && 
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      }
      <input type={type}
      className={` px-3 py-2 rounded-lg bg-whiyte text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${className}`} 
      ref={ref}
      {...props}
      id={id}
      />
      {/* ref -> yehi cheez hai jo reference degi aapke parent component ke andar. reference waha se pass bhi kiya jayega aur vaha se state ka access bhi liya jayega*/}
    </div>
  );
});

export default Input;
