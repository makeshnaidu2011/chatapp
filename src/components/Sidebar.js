import React, { useState, useEffect } from 'react'
import "./Sidebar.css"
import db from "../firebase"
import { Avatar, IconButton } from "@material-ui/core"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import { SearchOutlined } from "@material-ui/icons"
import SidebarChat from "./SidebarChat"
import { useStateValue } from "../StateProvider"

function Sidebar() {
    const [{ user }, dispatch] = useStateValue();
    const [rooms, setrooms] = useState([])
    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => {
            setrooms(snapshot.docs.map(doc =>
                ({
                    id: doc.id,
                    data: doc.data(),

                })))
        })
        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or Start a new chat" type="text"></input>
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map(room => (<SidebarChat key={room.id} name={room.data.name} id={room.id} />))}
            </div>
        </div>
    )
}

export default Sidebar
