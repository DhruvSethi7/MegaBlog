import React from 'react'
import { Login as loginComponent } from '../components'
import authService from '../appwrite/auth'
function Login() {
  // authService.logout()
  return (
    <div className='py-8'>
        <loginComponent />
    </div>
  )
}

export default Login