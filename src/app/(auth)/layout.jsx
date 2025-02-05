import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <main className='mx-auto flex items-center justify-center h-[700px]'>
     {children}
    </main>
  )
}

export default AuthLayout