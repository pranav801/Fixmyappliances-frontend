import { Avatar, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {  decodedToken, getLocal } from '../../../Context/auth';

function ChatList({ refresh }) {

    const [chatlist, setChatList] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      getChatList();
    }, []);

    const token = decodedToken('userJwt')
  
    const getChatList = () => {
      axios.get(`http://localhost:8000/booking/bookings-list/${token.id}/`)
        .then((response) => {
          setChatList(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };


   
    return (
        <div className='h-screen-90 w-2/6 m-3 mt-5 border border-gray-300 rounded-xl overflow-y-scroll px-2'>
        {chatlist.map((chat) => (
          <div
            key={chat.username} // Add a unique key for each chat item
            className="mx-0 my-3 flex items-center gap-4 p-2 shadow rounded-xl cursor-pointer transition-all duration-200"
           
          >
            <Link to={`/messaging/${chat.id}`}>
            <Avatar onClick={()=>navigate(`/messaging/${chat.username}`)}
              size="md"
              variant="circular"
              src={chat.user_profile ? apiUrl + chat.user_profile : defaultUserImageLink}
              alt={chat.username}
            />
            </Link>
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h6" color="blue-gray">
                  {chat.username}
                </Typography>
              </div>
              <p className='text-blue-gray text-xs'>Frontend Lead @ Google</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
export default ChatList