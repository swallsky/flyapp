import React from 'react'

import "../../styles/layout.css"
import ActivityBar from './ActivityBar'
import CenterBar from './CenterBar'

export default function Layout() {
  return (
    <div className='ContainerCenter'>
        <ActivityBar />
        <CenterBar />
    </div>
  )
}
