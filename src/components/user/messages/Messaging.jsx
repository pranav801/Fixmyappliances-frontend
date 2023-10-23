import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useRef } from 'react';
import {  decodedToken } from '../../../Context/auth';



const Chat = () => {
    const { BookingId } = useParams();
    const [recipientdetails, setRecipientDetails] = useState({})
    const [senderdetails, setSenderDetails] = useState({});
    const [senderid, setSenderId] = useState(null);
    const [recipientid, setRecipientId] = useState(null)
    const [clientstate, setClientState] = useState('');
    const [messages, setMessages] = useState([]);
    const token = decodedToken('userJwt')



    const messageRef = useRef()

    const navigate = useNavigate()

    const setEmployProfileDetails = async () => {
        axios.get(`http://localhost:8000/api/userlist/${BookingId}/`)
        .then((response) => {
            if (response.status == 200) {userlist
                setRecipientDetails(response.data)
            }
        })
    }

    const setSenderProfile = async () => {
        axios.get(`http://localhost:8000/api/userlist/${token.id}/`)
        .then((response) => {
            if (response.status == 200) {
                setRecipientDetails(response.data)
            }
        })
    }

    useEffect(() => {
        setUserProfileDetails()
        setSenderProfile()

    }, [])

    const setUpChat = () => {
        axios.get(`${BASE_URL}/message/user-previous-chats/${senderid}/`).then((response) => {
            if (response.status == 200) {
                setMessages(response.data)
            }
        })

        const client = new W3CWebSocket(`ws://localhost:8000/ws/chat/${senderid}/`);
       
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
                        sender_username: dataFromServer.senderUsername,
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
        setSenderId(user_id)
        setRecipientId(Id)
    }, [])

    useEffect(() => {
        if (senderid != null && recipientid != null) {
            setUpChat()
        }
    }, [senderid, recipientid, Id])



    const onButtonClicked = () => {
        if (messageRef.current.value.trim() == "") {
            return
        }
        clientstate.send(
            JSON.stringify({
                message: messageRef.current.value,
                senderUsername: senderdetails.username,
                receiverUsername: recipientdetails.username,
            })
        );
        messageRef.current.value = ''
    };


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="bg-white py-4 px-8 shadow-md flex items-center">
                <img
                    src={recipientdetails?.pic}
                    alt="Recipient's Avatar"
                    className="w-10 h-10 rounded-full mr-4"
                />
                <h2 className="text-xl">{recipientdetails?.username}</h2>
            </div>

            <div className="flex-grow p-4 overflow-auto">
                <div className="mb-2">
                    {console.log('flajflafla', messages)}
                    {

                        messages.map((message) => {
                            console.log('recepedent,sender', recipientdetails, senderdetails);

                            if (message.sender_username == recipientdetails.username) {

                                return (
                                    <Link to='/user-proifle/:usernam'>
                                        <div className="flex items-start justify-start mb-4">

                                            <div className="mr-2">
                                                <img
                                                    src={BASE_URL + recipientdetails?.pic}
                                                    alt="Sender's Avatar"
                                                    className="w-8 h-8 rounded-full"
                                                />
                                            </div>
                                            <div className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                                                <p className="text-sm font-medium">{recipientdetails?.username}</p>
                                                {message.message}
                                            </div>

                                        </div>
                                    </Link>
                                )
                            }
                            else {
                                return (
                                    <div className="flex items-end justify-end mb-4">

                                        <div className="ml-2">
                                            <img
                                                src={senderdetails?.pic}
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
        </div>

    );
};

export default Chat;