import React from 'react'

//conatiner ke andar styling properties define hoti hain
function Container(/*props*/ {children}) {
  return <div className='w-full max-w-7xl mx-auto  px-4 '>{children}</div>;
  
}

export default Container

