import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AppContext} from "../App";
import "../styles/Messaging.css"
import "../styles/material-css.css"

interface MessagingProps {
    messagesVisible: boolean
}

interface MessagingMessage {
    sender: string
    message: string
}

const Messaging = (props: MessagingProps) => {

    const context = useContext(AppContext);

    const [currentMessage, setCurrentMessage] = useState("");

    const [messages, setMessages] = useState<Array<MessagingMessage>>([]);

    let {roomID} = useParams();

    useEffect(() => {

        // newMessage event
        context.socket.on("newMessage", (data:MessagingMessage) => {
            messages.push(data);
            setMessages([...messages])
        });

    }, []);

    // send message
    const handleSendMessage = () => {
        context.socket.emit("sendMessage", {sender: context.currentPlayer, message: currentMessage, roomID: roomID});
    };

    return (
        <div className={props.messagesVisible ? "messaging" : "messaging messaging-hidden"}>
            <div className={"messaging-messages"}>
                {messages.length ?
                    messages.map((messageData) => {
                        return (
                            <div>
                                <span>{messageData.sender}: </span>
                                <span>{messageData.message}</span>
                            </div>
                        )
                    }) :
                    <span>no messages</span>
                }
            </div>
            <div className={"messaging-form"}>
                <label className="matter-textfield-outlined matter-success">
                    <input required placeholder=" " value={currentMessage} onChange={(e) => {setCurrentMessage(e.target.value)}}/>
                    <span>Message:</span>
                </label>
                <button style={{marginTop: "5px"}} className={"matter-button-outlined matter-success"} onClick={() => {handleSendMessage(); setCurrentMessage("")}}>Send</button>
            </div>
        </div>
    )
};

export default Messaging;
