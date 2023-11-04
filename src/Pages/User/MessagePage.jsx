import React, { useState } from 'react'
import ChatList from '../../components/user/messages/ChatList'
import Messaging from '../../components/user/messages/Messaging'
import UserNavBar from '../../components/user/home/UserNavBar'

function MessagePage() {

  const [refresh, setRefresh] = useState('')
  const [chatFlag, setChatFlag] = useState(undefined)

  const queryParams = new URLSearchParams(location.search);
  const [selectedchat, setSelectedChat] = useState(queryParams.get('booking'))
  return (
    <div>
      <UserNavBar/>
      <div className='flex -mt-10 max-w-5xl mx-auto m-0 max-h-screen-80rem' >
        <ChatList refresh={setRefresh} selectedchat={selectedchat} setChatFlag={setChatFlag} setSelectedChat={setSelectedChat} />
        <Messaging setSelectedChat={setSelectedChat} selectedchat={selectedchat} chatFlag={chatFlag} setChatFlag={setChatFlag} />
      </div>
    </div>
  )
}

export default MessagePage