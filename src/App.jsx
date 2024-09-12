import { useState, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login,logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";




function App() {
  //we need to create loading because in production , it may take time to connect with appwrite via network request , we can apply conditional rendering on loading , if else
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  //dispatch is a merger when we need to combine react with redux
  
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData)=>{
      if (userData) {
        dispatch(login({userData}))

        
      } else {
        dispatch(logout({}))
      }
    }).
    catch((err)=>{
      console.log(err)
    })
    .finally(()=>setLoading(false)) // loading ko true se false krdenge | isse kya hoga , pehle to catch laga skte ho , agar error se bachna hai , par finally hmesha run hota hi hota hai
    
  }, [])
  
  // to abhi authservice import krli hmne . Ab jese hi application load ho , ek useeffedct lo , aur useeffect se pucho us service se ke aap logged in ho ya logged out
  // agar logged in ho to dispatch login , agar logged out ho to dispatch logout
  // aur finally me loading ko false krdo , kyuki loading true hoga , jab tak
  // useeffect mei nhi chalega , jab tak useffect mei chale

  // agar loading true hoga , to loading true hoga , jab tak useffect mei

  return !loading ?(
    <div className="min-h-screen flex flex-wrap  content-between bg-gray-400">
      <div className="w-full block">
        <Header/>
        <main>
          TODO:{/* <Outlet/>  comes from react router dom */}
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App;
