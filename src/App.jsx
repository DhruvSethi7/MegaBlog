import { useEffect ,useState} from "react"
import authSlice from "./store/authSlice"
import authService from "./appwrite/auth"
import { useDispatch } from "react-redux"
import { login,logout } from "./store/authSlice"
import { Header,Footer } from "./components"
import { Outlet } from "react-router-dom"
function App() {
  const [loading, setloading] = useState(true)
  const dispatch=useDispatch()
  useEffect(()=>{
    authService.checkCurrentUser().then((userData)=>{
      console.log('userdata is '+userData);
      if (userData) {
       dispatch(login(userData)) 
      }
      else{
        dispatch(logout())
      }
    }).finally(()=>setloading(false))
  })
  return !loading?<h2>
  <div>
    <Header/>
    <Outlet/>
    {/* <Footer/> */}
  </div>
  </h2>:<div>The content is being loaded</div>
}
export default App