import React, { useState } from 'react'
import ChatList from '../../components/employee/messages/ChatList'
import Messaging from '../../components/employee/messages/Messaging'
import EmployeeSideBar from '../../components/employee/home/EmployeeSideBar'
import EmployeeNavBar from '../../components/employee/home/EmployeeNavBar'

function EmployeeInbox() {
  const queryParams = new URLSearchParams(location.search);
  const [selectedchat, setSelectedChat] = useState(queryParams.get('booking'))
  const [senderid, setSenderId] = useState(null);

  return (
    <div>

      <div className='flex flex-col h-screen'>
        <EmployeeNavBar />
        <div className='flex flex-1 pt-20'>
          <EmployeeSideBar />
          <div className='flex-1 px-4  overflow-y-auto'>
          <div className='flex max-w-5xl mx-auto m-0 max-h-screen-80rem' >
              <ChatList  selectedchat={selectedchat} setSelectedChat={setSelectedChat}  />
              <Messaging senderid={senderid} setSenderId={setSenderId} selectedchat={selectedchat} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



export default EmployeeInbox