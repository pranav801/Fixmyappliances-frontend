import React, { useState } from 'react'
import ChatList from '../../components/user/messages/ChatList'
import Messaging from '../../components/user/messages/Messaging'

function MessagePage() {

  const [refresh, setRefresh] = useState('')
  const [chatFlag, setChatFlag] = useState(undefined)

  const queryParams = new URLSearchParams(location.search);
  const [selectedchat, setSelectedChat] = useState(queryParams.get('booking'))
  return (
    <div className='flex max-w-5xl mx-auto m-0 max-h-screen-80rem' >
      <ChatList refresh={setRefresh} selectedchat={selectedchat} setChatFlag={setChatFlag} setSelectedChat={setSelectedChat} />
      <Messaging selectedchat={selectedchat} chatFlag={chatFlag} setChatFlag={setChatFlag} />
    </div>
  )
}

export default MessagePage