import React, {
    ChangeEvent,
    KeyboardEventHandler,
    useCallback, useEffect, useRef,
    useState,
} from "react";
import styled from "styled-components";
import { ReactComponent as Emoji } from "assets/Svgs/direct-emoji-icon.svg";
import { ReactComponent as ImageUpload } from "assets/Svgs/direct-image-upload.svg";
import { ReactComponent as Heart } from "assets/Svgs/heart.svg";
import Picker, { IEmojiData } from "emoji-picker-react";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { addChatMessageItem, addSubChatCount } from "app/store/ducks/direct/DirectSlice";
import { addTyping, lookUpChatRoom, reissueChatList } from "app/store/ducks/direct/DirectThunk";

interface ChatBarType {
}

interface ChatBarContainerType {
    sendButtonClicked: boolean;
}

const ChatBarContainer = styled.div<ChatBarContainerType>`
  position: absolute;
  bottom: 0;
  padding: 20px;
  width: 100%;
  background-color: white;
  z-index: 1;

  .emoji-picker-react {
    width: 50% !important;
    height: 400px;
    @media (max-width: 970px) {
      width: 100% !important;
    }
  }

  .input-container {
    border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
    border-radius: 22px;
    min-height: 44px;
    padding-left: 11px;
    padding-right: 8px;
    display: flex;
    align-items: center;


    svg {
      margin: 8px;
      cursor: pointer;
    }

    textarea {
      resize: none;
      border: none;
      flex: 1;
      padding: 0 9px;
      overflow: hidden;
      height: 18px;
      background-color: white;

      &:focus {
        outline: none;
      }
    }

    button {
      margin-right: 8px;
      color: rgba(var(--d69, 0, 149, 246), 1);
      opacity: ${props => props.sendButtonClicked ? "0.8" : "1.0"};
    }
  }
`;


const ChatBar = ({}: ChatBarType) => {
    const [message, setMessage] = useState<string>("");

    const username = useAppSelector(state => state.auth.username);
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(state => state.auth.userInfo);
    const selectedRoom = useAppSelector(state => state.direct.selectedRoom);
    const chatListPage = useAppSelector(state => state.direct.chatListPage);

    const client = useRef<StompJs.Client>();


    // 내가 채팅 메시지를 타이핑하고 있을 때, 상대방에게 "입력 중" 표시를 표현하기 위함
    useEffect(() => {
        client?.current?.publish({
            destination: "/pub/messages/indicate", body: JSON.stringify({
                "senderId": userInfo?.memberId,
                "roomId": selectedRoom?.chatRoomId,
            }),
        });
    }, [message, client]);

    useEffect(() => {
        const connect = () => {
            client.current = new StompJs.Client({
                //  brokerURL: "ws://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080/ws-connection", // 웹소켓 서버로 직접 접속
                webSocketFactory: () => new SockJS("http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080/ws-connection"), // proxy를 통한 접속
                debug: function(str) {
                    // console.log(str);
                },
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                onConnect: () => {
                    client?.current?.subscribe(`/sub/${username}`, async ({ body }) => {
                        const newMessage = JSON.parse(body);
                        if (newMessage.action === "MESSAGE_ACK") {
                            // 내가 채팅 메시지를 타이핑하고 있을 때, 상대방에게 "입력 중" 표시를 표현하기 위함
                            dispatch(addTyping(newMessage.data.roomId));
                        } else {
                            // API를 호출해서가 아닌 웹소켓을통해서 받은 메세지의 개수! 페이징 호출할때 다시 계산해서 보내줘야함
                            dispatch(addSubChatCount());
                            // 새롭게 온 메세지 보여주는 dispatch
                            dispatch(addChatMessageItem(newMessage));
                            // unseenCount 를 줄여주는 dispatch
                            await dispatch(lookUpChatRoom({ roomId: newMessage.data.roomId }));
                            // 받을떄마다 unreadFlag 및 마지막 메세지 갱신을 위해서 왼쪽에 채팅방목록 다시 받아오기
                            // 페이지는 + 안해준다
                            await dispatch(reissueChatList(chatListPage));
                        }

                    });
                },
                onStompError: (frame) => {
                    console.error(frame);
                },
            });

            client?.current?.activate();
        };
        const disconnect = () => {
            client?.current?.deactivate();
        };
        connect();
        return () => disconnect();
    }, [client]);

    const sendMessage = () => {

        // if (!stompClient.connected) {
        //     return;
        // }
        if (message.trim() === "") {
            return;
        }

        client?.current?.publish({
            destination: "/pub/messages", body: JSON.stringify({
                "content": message,
                "senderId": userInfo?.memberId,
                "messageType": "TEXT",
                "roomId": selectedRoom?.chatRoomId,
            }),
        });
        setMessage("");
    };


    // message to be trimed
    const [sendButtonClicked, setSendButtonClicked] = useState<boolean>(false);
    const [image, setImage] = useState<File>();
    const [showPicker, setShowPicker] = useState(false);


    const onEmojiClick = (event: React.MouseEvent, emojiObject: IEmojiData) => {
        setMessage(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    const messageChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    };

    const sendButtonMouseDownHandler = () => {
        setSendButtonClicked(true);
    };

    const sendButtonMouseUpHandler = () => {
        setSendButtonClicked(false);
    };

    const sendButtonClickHandler = () => {
        sendMessage();
    };

    const pressEnterHandler: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    };

    const imageUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    };


    return (
        <ChatBarContainer sendButtonClicked={sendButtonClicked}>

            {showPicker && <Picker
                pickerStyle={{ width: "100%" }}
                onEmojiClick={onEmojiClick} />}
            <div className="input-container">
                <Emoji onClick={() => setShowPicker(!showPicker)} />
                <textarea value={message} placeholder="메시지 입력..." className="chat-input" onChange={messageChangeHandler}
                          onKeyPress={pressEnterHandler} />
                {message.trim().length === 0 ?
                    <>
                        <label htmlFor={"img"}>
                            <ImageUpload />
                        </label>
                        <input
                            onChange={imageUploadHandler}
                            type="file"
                            id="img"
                            accept="image/*"
                            style={{ display: "none" }}
                        />
                        <Heart />
                    </>
                    : <button onClick={sendButtonClickHandler} onMouseDown={sendButtonMouseDownHandler}
                              onMouseUp={sendButtonMouseUpHandler}>
                        보내기
                    </button>

                }
            </div>
        </ChatBarContainer>
    );
};

export default ChatBar;