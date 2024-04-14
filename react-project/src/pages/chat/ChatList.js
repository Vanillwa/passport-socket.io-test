import { useQuery } from "react-query";
import { getChatList } from "../../service/api";
import ChatListTbody from "../../components/ChatListTbody";
import { Table } from "react-bootstrap";
import styles from "../../css/chat/ChatList.module.css";
import { useLayoutEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ChatList() {
  const navigate = useNavigate();
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn } = memoUserInfo;

  const { data, status } = useQuery(["getChatList"], () => getChatList(), {
    retry: 0,
    refetchOnWindowFocus: false,
  });

  useLayoutEffect(() => {
    if (!isLoggedIn) {
      alert("로그인 후 사용하실 수 있는 기능입니다.");
      navigate("/auth/login");
    }
  }, [isLoggedIn]);

  return (
    <section>
      <h3 className='pt-3 pb-3 ps-2'>User List</h3>
      <Table hover variant='dark' className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>채팅방</th>
            <th>생성일</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          <ChatListTbody data={data} status={status} />
        </tbody>
      </Table>
    </section>
  );
}

export default ChatList;
