import React from 'react'
import { Toaster } from 'react-hot-toast'

const MessageShow = () => {
  return (
    <div>
         <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 3000, style: {
      background: '#333',
      color: '#fff',
      fontWeight: 'bold',
    },}}/>
    </div>
  )
}

export default MessageShow