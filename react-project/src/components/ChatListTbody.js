import { Button } from "react-bootstrap";
import FormatDate from "../service/FormatDate";
import { useNavigate } from "react-router-dom";

function ChatListTbody({ data, status }) {
  const navigate = useNavigate();

  const handleOnclick = (roomId) => {
    navigate(`/chat/list/${roomId}`);
  };

  if (status === "loading") {
    return (
      <tr>
        <td colSpan={5}>loading...</td>
      </tr>
    );
  }
  if (status === "error") {
    return (
      <tr>
        <td colSpan={5}>error occured!</td>
      </tr>
    );
  }
  return (
    <>
      {data.map((item) => {
        return (
          <tr key={item.ChatRoom.id}>
            <td className='col-1'>{item.ChatRoom.id}</td>
            <td onClick={() => handleOnclick(item.ChatRoom.id)}>{item.ChatRoom.title}</td>
            <td>
              <FormatDate dateString={item.ChatRoom.createdAt} />
            </td>
            <td>
              <Button className='btn-sm'>Delete</Button>
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default ChatListTbody;
