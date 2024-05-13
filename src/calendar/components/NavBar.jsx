import React from 'react'
import { useAuthStore } from '../../hooks'

export const NavBar = () => {
  const {user, starLogout} = useAuthStore();

  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-4'>
      <span className='navbar-brand'>
        <i className='fas fa-calendar-alt'></i>
        &nbsp;
        {user.name}
      </span>
      <button onClick={starLogout} className='btn btn-outline-danger'>
        <i className='fas fa-sign-out-alt'> </i>
        &nbsp;
        <span>Salir</span>
      </button>

    </div>
  )
}
