import React, { useEffect ,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'

export default function Protector({
  children,
  authentication=true
}) {
  const authStatus=useSelector((state)=>state.auth.authStatus)
  const navigate=useNavigate()
  const [loader, setloader] = useState(true)
  useEffect(() => {
   authService.checkCurrentUser().then((data)=>console.log(data))
   
    if (authentication && authentication!==authStatus) {
      navigate('/login')
    }
    else if(!authentication && authStatus !== authentication){
      navigate('/')
    }
    setloader(false)
  }, [authStatus,navigate])
  
  return loader?<h1>Loading </h1>:<>{children}</>
}
