import React, { useEffect, useState } from 'react'
import "./SidebarChat.css"
import db from "../firebase"
import { Avatar } from "@material-ui/core"
import { Link } from "react-router-dom"

function SidebarChat({ addNewChat, id, name }) {
    const [seed, setSeed] = useState("")
    const [messages, setMessages] = useState("")
    function createChat() {
        const roomName = prompt("Please enter a room name for chat")
        if (roomName) {
            db.collection('rooms').add({
                name: roomName
            })
        }
    }
    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('message').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            })
        }
    }
        , [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>

    ) : (
            <div onClick={createChat} className="sidebarChat">
                <h2>Add new Chat</h2>
            </div>
        )
}

export default SidebarChat
