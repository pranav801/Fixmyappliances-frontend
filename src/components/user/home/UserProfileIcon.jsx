import React, { useEffect, useState } from 'react'
import {
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    ChevronDownIcon,
    InboxArrowDownIcon,
    PowerIcon,
    ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { decodedToken } from '../../../Context/auth';
import axios from 'axios';
import { BaseUrl } from '../../../constants/constants';


function UserProfileIcon() {
    const profileMenuItems = [
        {
            label: "My Profile",
            icon: UserCircleIcon,
            action: '/userprofile'
        },

        {
            label: "Inbox",
            icon: InboxArrowDownIcon,
            action: '/messages'
        },
        {
            label: "Your orders",
            icon: ShoppingBagIcon,
            action: '/bookings',


        },
        {
            label: "Sign Out",
            icon: PowerIcon,
            action: 'signout'

        },
    ];
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [action, setAction] = useState();
    const closeMenu = () => setIsMenuOpen(false);
    const [profile, setProfile] = useState([])

    const navigate = useNavigate()
    
    useEffect(() => {
        const token = decodedToken(('userJwt'))
        axios.get(`${BaseUrl}/api/user-profile-detail/${token?.id}/`)
            .then((response) => {
                setProfile(response.data);
            })
            .catch((error) => {
                console.error('Error fetching profile:', error);
            });
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem('userJwt');
        toast.success('Succesfully Logged Out', { position: toast.POSITION.TOP_CENTER })
        navigate('/')

    }

    return (
        <div>
            <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                <MenuHandler>
                    <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                    >
                        {profile?.profile_image ?
                            <Avatar
                                variant="circular"
                                size="sm"
                                alt="profile"
                                className="border border-gray-900 p-0.5"
                                src={profile?.profile_image}
                            />
                            :

                            <Avatar
                                variant="circular"
                                size="sm"
                                alt="tania andrew"
                                className="border border-gray-900 p-0.5"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            />
                        }
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                                }`}
                        />
                    </Button>
                </MenuHandler>
                <MenuList className="p-1">
                    {profileMenuItems.map(({ label, icon, action }, key) => {
                        const isLastItem = key === profileMenuItems.length - 1;
                        return (
                            <MenuItem
                                key={label}
                                onClick={action === 'signout' ? handleLogOut : () => navigate(action)}
                                className={`flex items-center gap-2 rounded ${isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                                    }`}
                            >
                                {React.createElement(icon, {
                                    className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                    strokeWidth: 2,
                                })}
                                <Typography
                                    as="span"
                                    variant="small"
                                    className="font-normal"
                                    color={isLastItem ? "red" : "inherit"}
                                >
                                    {label}
                                </Typography>
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Menu>
        </div>
    )
}

export default UserProfileIcon