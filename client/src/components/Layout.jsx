import React from 'react'
import { Navbar } from './Navbar'

export const Layout = ({children}) => {
  return (
    <React.Fragment>
        <div className='app-shell'>
            <Navbar />
            {children}
        </div>
    </React.Fragment>
  )
}
