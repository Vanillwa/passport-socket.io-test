import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getMessage } from "../../service/api";
import { useAuthContext } from "../../context/AuthContext";
import { useLayoutEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { io } from "socket.io-client";
import styles from "../../css/chat/ChatRoom.module.css";

function ChatRoom() {
  const url = process.env.REACT_APP_SOCKET_URL;
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;
  const [chat, setChat] = useState([]);
  const socket = io(url, { withCredentials: true });

  const { data, status } = useQuery(["getMessage", roomId], () => getMessage(roomId), {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("로딩 완료", data);
      socket.emit("ask-join", data.roomInfo.id);
      setChat(data.messageList);
    },
  });

  const sendMessage = (e) => {
    e.preventDefault();
    let message = e.target.message.value;
    if (message === "") return;
    let body = {
      roomId: data.roomInfo.id,
      content: message,
    };
    socket.emit("send-message", body);
    e.target.message.value = "";
  };

  socket.on("send-message", (data) => {
    console.log(data);
    setChat((prev) => [data, ...prev]);
  });

  useLayoutEffect(() => {
    if (!isLoggedIn) {
      alert("로그인 후 사용하실 수 있는 기능입니다.");
      navigate("/auth/login");
    }
  }, [isLoggedIn]);

  if (status === "loading") {
    return <div>loading...</div>;
  }
  if (status === "error") {
    return <div>error</div>;
  }
  return (
    <section className={styles.section}>
      <h4 className='pt-3 pb-3'>{data.roomInfo.title}</h4>
      <div className={styles.chatForm}>
        {chat.map((message) => {
          if (userInfo.userId == message.userId) {
            return (
              <div key={message.id} className={`${styles.message} ${styles.mine}`}>
                <div className={styles.messageInner}>{message.content}</div>
              </div>
            );
          } else {
            return (
              <div key={message.id} className={`${styles.message}`}>
                <div className={styles.messageInner}>
                  {message.User.nickname} | {message.content}
                </div>
              </div>
            );
          }
        })}
      </div>
      <form onSubmit={sendMessage} className={styles.inputForm}>
        <input name='message' />
        <Button variant='secondary btn-sm' type='submit'>
          전송
        </Button>
      </form>
    </section>
  );
}

export default ChatRoom;
