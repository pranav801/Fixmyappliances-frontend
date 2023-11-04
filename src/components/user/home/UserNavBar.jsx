
import React, { useState, useEffect, useRef } from 'react';
import {
  Navbar,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import UserProfileIcon from './UserProfileIcon';
import { Link } from 'react-router-dom';
import axios from 'axios';

function UserNavBar() {
  const inputRef = useRef()
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    axios.get(`http://localhost:8000/service/search/?q=${query}`)
    .then((response) => {
        console.log(inputRef.current.value);
        setResults(response.data)
        console.log(response);      
      })

      .catch((error) => console.error(error));

  };

  // useEffect(() => {
  //   handleSearch()
  // }, []); 

  return (
    <div className='z-50  w-full'>
      <Navbar className="mx-auto rounded-none max-w-screen-3xl px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
          <Link to={'/'}>
            <Typography  variant="h4" className="mr-4 ml-2 cursor-pointer py-1.5">
              FixMyAppliances
            </Typography>
          </Link>
          <div className="ml-auto flex gap-1 md:mr-4">
          </div>
          {/* <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              label="Type here..."
              className="pr-20"
              inputRef={inputRef}
            />
            <Button size="sm" className="!absolute right-1 top-1 rounded" onClick={handleSearch}>
              Search
            </Button>  
          </div> */}
          {/* {
                  query ?
                    <div className="absolute max-h-96 overflow-y-scroll mt-12 rounded-10 w-96 bg-white p-4 mx-2 shadow-2xl transition-all duration-500" >
                      <div className="flex w-full flex-col" >

                        {
                          searchresults.map((user) => {
                            return (
                              <div key={user.username} onClick={() => { navigate('/'), navigate(`/${user.username}`) }} className="flex items-center gap-4 my-1 rounded-10 p-2 hover:bg-indigo-50 cursor-pointer duration-300">
                                <Avatar size="sm" style={{ borderRadius: '50%' }} src={user.profile?.image ? mediaApiUrl + user.profile?.image : defaultUserImageLink} alt="avatar" />
                                <div>
                                  <p className="font-semibold text-sm" >{user.fullname}</p>
                                  <p className="text-xs text-gray-600" >{user.profile?.batch}</p>
                                </div>
                              </div>
                            )
                          })
                        }
                        {searchresults.length < 1 ?
                          <h1>No Result found</h1>
                          :
                          ''
                        }
                      </div>
                    </div>
                    :
                    ''
                } */}

          <div className="relative flex w-full gap-2 md:w-max ps-3">
            <UserProfileIcon />
          </div>
        </div>
      </Navbar>
      <div className="container mx-auto mt-8 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">


        </div>
      </div>
    </div>
  );
}
export default UserNavBar;