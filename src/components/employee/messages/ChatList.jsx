import { Avatar, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { decodedToken } from '../../../Context/auth';
import { BaseUrl, defaultUserImageLink } from '../../../constants/constants';

function ChatList({ selectedchat,setSelectedChat }) {

  const [chatlist, setChatList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getChatList();
  }, []);

  const token = decodedToken('employeeJwt')

  const handleChatClick = (booking_id) => {
    setSelectedChat(booking_id)
    navigate(`/employee/inbox/?booking=${booking_id}`)
}


  const getChatList = () => {
    axios.get(`${BaseUrl}/api/employee-chat-list/${token.employee}/`)
      .then((response) => {
        setChatList(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };



  return (
    <div className='h-screen-90 w-2/6 m-3 mt-5 border border-gray-300 rounded-xl overflow-y-scroll px-2' >
       
      <div>
        {
          chatlist.map((chat) => {
            if (chat.id == selectedchat) {
              return (
                <div
                  className="mx-0 my-3 flex items-center gap-4 p-2 bg-indigo-400 shadow rounded-xl cursor-pointer transition-all duration-200"
                >
                  <Avatar
                    size="md"
                    variant="circular"
                    src={chat.user_profile ? apiUrl + chat.user_profile : defaultUserImageLink}
                    alt="tania andrew"
                  />
                  <div className="flex w-full flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <Typography variant="h6" color="white">
                        {chat.user}
                      </Typography>
                    </div>
                    <p className='text-white text-xs'>Technician</p>
                  </div>
                </div>
              )
            }
            else {
              return (
                <div
                  className="mx-0 my-3 flex items-center gap-4 p-2 shadow rounded-xl cursor-pointer transition-all duration-200"
                  onClick={() => handleChatClick(chat.id)}
                  >
                  <Avatar
                    size="md"
                    variant="circular"
                    src={chat.user_profile ? apiUrl + chat.user_profile : defaultUserImageLink}
                    alt={chat.username}
                  />
                  <div className="flex w-full flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <Typography variant="h6" color="blue-gray">
                        {chat.user}
                      </Typography>
                    </div>
                    <p className='text-blue-gray text-xs'>Technician</p>
                  </div>
                </div>
              )
            }
          })
        }
      </div>

    </div>
  )
}
export default ChatList