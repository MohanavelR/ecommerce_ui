import React, { useContext, useEffect } from 'react'
import { MessageContext } from '../../context/context'
import SuccessMessage from '../message/SuccessMessage'
import ErrorMessage from '../message/ErrorMessage'


const Message = () => {
  const {  messageContextState,setMessageContextState}=useContext(MessageContext)
  function closeMessage(){
    setMessageContextState({is_show:false,text:""})
  }
  useEffect(()=>{
   if(messageContextState?.is_show){
    setTimeout(()=>{
        setMessageContextState({is_show:false,text:""})
    },3000)
   }
  },[messageContextState])
return (
    <div className={`fixed top-10 right-10 transform z-[9999] ${messageContextState.is_show?"translate-x-0":"translate-x-[500px]"}  transition-all duration-75 `}>
        {
        messageContextState.success?<SuccessMessage closeMessage={closeMessage} text={messageContextState.text} />:<ErrorMessage closeMessage={closeMessage} text={messageContextState.text}/>
        }
    </div>
  )
}

export default Message


