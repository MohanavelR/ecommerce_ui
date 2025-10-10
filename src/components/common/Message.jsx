import React, { useContext, useEffect, useState } from 'react';
import { MessageContext } from '../../context/context';
import SuccessMessage from '../message/SuccessMessage';
import ErrorMessage from '../message/ErrorMessage';

// --- Transition animation states ---
const MESSAGE_TRANSITION_CLASSES = {
  entering: 'opacity-0 translate-y-2', 
  entered: 'opacity-100 translate-y-0', 
  exiting: 'opacity-0 translate-y-2', 
};

const Message = () => {
  const { messageContextState, setMessageContextState } = useContext(MessageContext);
  const [transitionClass, setTransitionClass] = useState(MESSAGE_TRANSITION_CLASSES.entering);

  // Close message with exit animation
  function closeMessage() {
    setTransitionClass(MESSAGE_TRANSITION_CLASSES.exiting);
    setTimeout(() => {
      setMessageContextState({ is_show: false, text: '' });
      setTransitionClass(MESSAGE_TRANSITION_CLASSES.entering);
    }, 300); 
  }

  // Handle message visibility and auto-dismiss
  useEffect(() => {
    let timer;
    if (messageContextState?.is_show) {
      // Trigger entry animation
      setTimeout(() => setTransitionClass(MESSAGE_TRANSITION_CLASSES.entered), 10);

      // Auto-hide after 3 seconds
      timer = setTimeout(() => closeMessage(), 3000);
    } else {
      setTransitionClass(MESSAGE_TRANSITION_CLASSES.entering);
    }

    return () => clearTimeout(timer);
  }, [messageContextState.is_show]);

  // Don't render when hidden
  if (!messageContextState.is_show && transitionClass === MESSAGE_TRANSITION_CLASSES.entering) {
    return null;
  }

  return (
    <div
      className={`fixed top-10 right-10 z-[9999] transition-all duration-300 ease-out transform ${transitionClass}`}
    >
      {messageContextState.success ? (
        <SuccessMessage closeMessage={closeMessage} text={messageContextState.text} />
      ) : (
        <ErrorMessage closeMessage={closeMessage} text={messageContextState.text} />
      )}
    </div>
  );
};

export default Message;
