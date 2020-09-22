import React, { useEffect, useState } from 'react'
import "./Chat.css"
import db from "../firebase"
import firebase from "firebase"
import { useParams } from "react-router-dom"
import {
    Avatar, IconButton
} from "@material-ui/core"
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { SearchOutlined, MoreVert, AttachFile } from '@material-ui/icons'

import { useStateValue } from "../StateProvider"

function Chat() {
    const [messages, setMessages] = useState([]);
    const { roomId } = useParams();
    const [input, setinput] = useState("")
    const [seed, setSeed] = useState("")
    const [roomName, setRoomName] = useState("")
    const [{ user }, dispatch] = useStateValue()
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])
    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('message').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setinput("")
    }
    useEffect(() => {
        if (roomId) {
            db.collection("rooms").doc(roomId).onSnapshot((snapshot) => {
                setRoomName(snapshot.data().name)
            })
            db.collection('rooms').doc(roomId).collection("message").orderBy("timestamp", "asc").onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())))
        }
    }, [roomId])

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at {" "}{new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton><SearchOutlined /></IconButton>
                    <IconButton><AttachFile /></IconButton>
                    <IconButton><MoreVert /></IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                        <span className="chat__name">
                            {message.name}
                        </span>
                        {message.message}
                        <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toLocaleDateString()}</span>
                    </p>
                ))}

            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form >
                    <input type="text" onChange={e => setinput(e.target.value)} name="input" value={input} placeholder="Type a message" ></input>
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
