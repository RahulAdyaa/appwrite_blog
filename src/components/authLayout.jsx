//it is an mechanishm to protect pages and routes . 
// ham ek container banate hain

import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//protected name of function isliye dere hain kyuki hamko pta krna hai ke konse children ko render krna hai ya nai krna hai

 export default function Protected( {
    children,
    authentication=true
 }) 
 
 
 {
     const navigate=useNavigate()
     const [loader, setLoader] = useState(true) // by default state true hai
     const authStatus=useSelector((state)=>state.auth.status)

     useEffect(()=>{
        if(authentication &&authStatus!==authentication){
            navigate('/login')
        }
        else if(!authentication && authStatus!==authentication){
            navigate('/') // '/' means home page

        }
        // upar ke if else if ka mtlb hai -> 
        /*
        Pehle to authentication already true hai , abb agar user ka authstatus true aata hai , to and conition ke hisaab se , true && true , which gives true , so ham usko login pe bhej denge
        but agar , hamne !authentication lika hai mtlb false hogya vo , and next condition ke hissab se authStatus!==authentication , mtlb agar authstatus true hai , aur true is not equal tot true which is a false statement , to hame milega true firse , jisse ham ye decide kre hain ke user logged in hai , to usko home pe bhej do
        
        */ 
        setLoader(false)
     },[authStatus,navigate,authentication])
  return (
    <div>authLayout</div>
  )
}
