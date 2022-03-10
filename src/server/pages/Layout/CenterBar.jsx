import React from 'react'


import {Outlet} from 'react-router-dom'

export default function CenterBar() {
  return (
    <div className='centerBar'>
        <Outlet />
    </div>
  )
}
