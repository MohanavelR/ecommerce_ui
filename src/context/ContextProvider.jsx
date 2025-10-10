import React, { useState } from 'react'
import { LogoutContext, MessageContext } from './context'

const ContextProvider = ({children}) => {
    const [logoutContextState,setLogoutContextState]=useState(false)
    const [messageContextState,setMessageContextState]=useState({
        is_show:false,
        text:'',
        success:false
    })

    const logoutData={
        logoutContextState,setLogoutContextState
    }
    const messageData={
        messageContextState,setMessageContextState
    }

  return (
    <div>
   <MessageContext.Provider value={messageData}>
    <LogoutContext.Provider value={logoutData}>
        {children}
    </LogoutContext.Provider>
   </MessageContext.Provider>
    </div>
  )
}

export default ContextProvider