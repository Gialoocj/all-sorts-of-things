import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatBot.module.scss";
import classNames from "classnames/bind";

import { SendIcon } from "../../components/icons/icons";
import { useDispatch } from "react-redux";

import { sendMessage } from "../../apiService/chatService";

const cx = classNames.bind(styles);
const ChatBot = () => {
  const dispatch = useDispatch();

  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([
    {
      role: "model",
      text: "Hi, how can I help you?",
    },
  ]);

  const [message, setMessage] = useState("");

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newConversation = [...conversation, { role: "user", text: message }];

    setConversation(newConversation);
    setLoading(true);
    setMessage("");
    inputRef.current.value = "";

    dispatch(sendMessage(message)).then((result) => {
      setLoading(false);
      setConversation([
        ...newConversation,
        {
          role: "model",
          text: result.payload.message,
        },
      ]);
    });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("chat-bot-container")}>
        <div className={cx("header")}>
          <div className={cx("chat-image-wrapper")}>
            <img
              src="https://i.pinimg.com/736x/9a/11/33/9a1133d4af3b637e1c6c8ff251785f27.jpg"
              alt="chat bot"
              className={cx("chat-image")}
            />
          </div>
          <div className={cx("state-group")}>
            <span className={cx("chat-name")}>Gemini</span>
            <span className={cx("chat-state")}>Online</span>
          </div>
        </div>

        <div className={cx("chat-frame")}>
          {conversation.map((message, index) => (
            <div key={index}>
              {message.role === "model" ? (
                <div className={cx("message-wrapper-model")}>
                  <div className={cx("image-chat-wrapper")}>
                    <img
                      src="https://i.pinimg.com/736x/9a/11/33/9a1133d4af3b637e1c6c8ff251785f27.jpg"
                      alt="ảnh"
                      className={cx("thumbnails")}
                    />
                  </div>
                  <div className={cx("model")}>{message.text}</div>
                </div>
              ) : (
                <div className={cx("message-wrapper-user")}>
                  <div className={cx("user")}>{message.text}</div>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className={cx("loader-chat-wrapper")}>
              <div className={cx("image-chat-wrapper")}>
                <img
                  src="https://i.pinimg.com/736x/9a/11/33/9a1133d4af3b637e1c6c8ff251785f27.jpg"
                  alt="ảnh"
                  className={cx("thumbnails")}
                />
              </div>
              <div className={cx("loader-wrapper")}>
                <div className={cx("loader")}></div>
              </div>
            </div>
          )}
        </div>

        <div className={cx("input-chat")}>
          <input
            ref={inputRef}
            type="text"
            className={cx("message")}
            placeholder="Type message..."
            onChange={handleMessage}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button className={cx("send")} onClick={handleSendMessage}>
            <SendIcon className={cx("icon")} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
