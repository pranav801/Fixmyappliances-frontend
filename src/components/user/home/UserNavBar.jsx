import React from 'react'
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import UserProfileIcon from './UserProfileIcon';
import { Link } from 'react-router-dom';



function UserNavBar() {

  return (
    <div className=''>
      <Navbar className="mx-auto max-w-screen-3xl px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
          <Link to={'/'}><Typography
            as="a"

            variant="h4"
            className="mr-4 ml-2 cursor-pointer py-1.5"
          >
            FixMyAppliances
          </Typography></Link>

          <div className="ml-auto flex gap-1 md:mr-4">

          </div>
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              label="Type here..."
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <Button size="sm" className="!absolute right-1 top-1 rounded">
              Search
            </Button>
          </div>
          <div className="relative flex w-full gap-2 md:w-max ps-3" >
            <UserProfileIcon />
          </div>
        </div>
      </Navbar>
    </div>
  )
}

export default UserNavBar