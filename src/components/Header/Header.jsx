import React from 'react'
import { useSelector } from 'react-redux'
import {Container, LogoutBtn,Logo} from  '../index'
import { Link ,useNavigate} from 'react-router-dom'
import { list } from 'postcss'

function Header() {
  const authStatus=useSelector((state)=>state.auth.authStatus)
  const navigate=useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]
  return (
<header>
  <Container>
    <nav className="flex bg-purple-400">
      <div className='mr-4'>
        {/* <Link to='/'> */}
        <Logo></Logo>
        {/* </Link> */}
      </div>
      <ul className='flex ml-auto'>
        {
          navItems.map((item)=>item.active?(<li key={item.name}>
            <button 
            onClick={()=>navigate(item.slug)}
            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
>{item.name}</button>
          </li>):null)
        }{authStatus && (
          <li>
            <LogoutBtn/>
          </li>
        )}
      </ul>
    </nav>
  </Container>
</header>
  )
}

export default Header