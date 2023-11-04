import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useRef } from 'react';
import { decodedToken } from '../../../Context/auth';
import { BaseUrl, defaultUserImageLink } from '../../../constants/constants';



const Chat = ({ setSelectedChat, selectedchat, chatFlag, setChatFlag }) => {
    const [employeedetails, setemployeeDetails] = useState({})
    const [senderdetails, setSenderDetails] = useState({});
    const [senderid, setSenderId] = useState(null);
    const [employeeid, setemployeeId] = useState(null)
    const [clientstate, setClientState] = useState('');
    const [messages, setMessages] = useState([]);

    const messageRef = useRef()
    const setEmployeeProfileDetails = async () => {
        axios.get(`${BaseUrl}/booking/user-with-employee-by-booking/${selectedchat}/`)
            .then((response) => {
                if (response.status == 200) {
                    setemployeeId(response.data.id)
                    setemployeeDetails(response.data)
                }
            })
    }


    const setSenderProfile = async () => {
        const token = decodedToken('userJwt')
        axios.get(`${BaseUrl}/api/user-profile-detail/${token.id}/`)
            .then((response) => {
                if (response.status == 200) {
                    setSenderDetails(response.data)
                }
            })
    }

    useEffect(()=>{
        console.log('klkl');
    })

    useEffect(() => {
        const token = decodedToken('userJwt')
        setSenderId(token.id)
        setEmployeeProfileDetails()
        setSenderProfile()
    }, [])

    const setUpChat = () => {
        axios.get(`${BaseUrl}/api/user-previous-chats/${selectedchat}/`).then((response) => {
            if (response.status == 200) {
                setMessages(response.data)
            }
        })
        axios.get(`${BaseUrl}/api/set-chat-flag/${selectedchat}/`).then((response) => {
            setChatFlag(response.data)
        }).catch((err) => {
            console.log(err, '  (failed to set chat-flag)');
        })
        const client = new W3CWebSocket(`ws://localhost:8000/chat/${selectedchat}/`);

        setClientState(client)
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            if (dataFromServer) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        message: dataFromServer.message,
                        sender: dataFromServer.sender,
                    },
                ]);
            }
        };

        client.onclose = () => {
            console.log('Websocket disconnected');
        }

        return () => {
            client.close();
        };
    }

    useEffect(() => {
        if (senderid != null && employeeid != null) {
            setUpChat()
        }

    }, [senderid, employeeid, selectedchat])



    const onButtonClicked = () => {
        if (messageRef.current.value.trim() == "") {
            return
        }
        clientstate.send(
            JSON.stringify({
                message: messageRef.current.value,
                sender: 'user',
                user: senderid,
                employee: employeeid,
            })
        );
        messageRef.current.value = ''
    };


    return (
        <>
            <div className="w-full bg-gray-100 flex flex-col">
                {!selectedchat ?
                    <div className='h-full flex justify-center items-center font-bold' ><h1>Select a message to send</h1></div>
                    // : selectedchat && chatFlag == undefined ?
                    //     <div className='h-full flex justify-center items-center font-bold' ><h1>There is no such chat</h1></div>
                    //     : selectedchat && chatFlag == false ?
                    //         <div className='h-full flex justify-center items-center font-bold' ><h1>You can start once employee free!!</h1></div>
                    :
                    <>
                        <div className="bg-white py-4 px-8 shadow-md flex items-center">
                            <img

                                src={employeedetails?.pic ? BaseUrl + employeedetails?.pic : defaultUserImageLink}
                                alt="employee's Avatar"
                                className="w-10 h-10 rounded-full mr-4"
                            />
                            <h2 className="text-xl">{employeedetails?.username}</h2>
                        </div>

                        <div
                            className="flex h-[45rem] flex-col space-y-4 p-3 overflow-y-auto scrolling-touch"

                        // className="flex-grow p-4 overflow-auto"
                        >
                            <div className="mb-2">
                                {

                                    messages.map((message) => {
                                        // console.log('recepedent,sender', employeedetails, senderdetails);

                                        if (message.sender == 'employee') {

                                            return (
                                                <div key={message.id} className="flex items-start justify-start mb-4">

                                                    <div className="mr-2">
                                                        <img
                                                            src={employeedetails?.pic ? BaseUrl + employeedetails?.pic : defaultUserImageLink}
                                                            alt="Sender's Avatar"
                                                            className="w-8 h-8 rounded-full"
                                                        />
                                                    </div>
                                                    <div className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                                                        <p className="text-sm font-medium">{employeedetails?.username}</p>
                                                        {message.message}
                                                    </div>

                                                </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <div key={message.id} className="flex items-end justify-end mb-4">

                                                    <div className="ml-2">
                                                        <img
                                                            src={senderdetails?.pic ? senderdetails.pic : defaultUserImageLink}
                                                            alt="Receiver's Avatar"
                                                            className="w-8 h-8 rounded-full"
                                                        />
                                                    </div>
                                                    <div className="bg-gray-300 py-2 px-4 rounded-lg">
                                                        <p className="text-sm font-medium">{senderdetails?.username}</p>
                                                        {message.message}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }

                            </div>
                        </div>

                        <div className="bg-white p-4">
                            <div className="flex">
                                <input
                                    ref={messageRef}
                                    type="text"
                                    placeholder="Type your message..."
                                    className="flex-grow border rounded-lg px-4 py-2 focus:outline-none"
                                />
                                <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                                    onClick={(e) => onButtonClicked()}
                                    type="button"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </>

                }
            </div>

        </>

    );
};

export default Chat;